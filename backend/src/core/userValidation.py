from pydantic import ValidationError
from ..database.dbconfig import supabase
from ..database.models import *
from fastapi import Depends, HTTPException, status, Security
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm, SecurityScopes
from datetime import datetime,timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext

SECRET_KEY = "eacf7694189567a33798229f2abc522d7164ed6727d72740bae7d87228a8c8f5"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 360
CREDENTIAL_EXCEPTION = HTTPException(status_code=401,detail="Credenciales invalidas",headers={"WWW-Authenticate":"Bearer"})
crypt = CryptContext(schemes=["bcrypt"])

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="token", 
    scopes={'admin':'lectura y escritura de todo',
            'assist':'lectura y escritura parcial del contenido',
            'student':'lectura y escritura de su contenido'}
    )

def user_exist(email: str):
    return supabase.table('Usuario').select("*").eq('email',email).execute()

def get_user(email: str):
    user = supabase.table('Usuario').select("*").eq('email',email).execute()
    if not user:
        raise HTTPException(status_code=401,detail="Usuario invalido")
    return Usuario(email=user.data[0]["email"],nombre=user.data[0]["nombre"])

def verify_password(plain_password: str, hashed_password: str):
    return crypt.verify(plain_password, hashed_password)

def get_password_hash(password):
    return crypt.hash(password)

#Validación de alcance de usuario
def auth_scope_value(security_scopes: SecurityScopes):
    if security_scopes.scopes:
        authenticate_value = f'Bearer scope="{security_scopes.scope_str}"'
    else:
        authenticate_value = "Bearer"
        raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": authenticate_value},
    )
    return authenticate_value

def auth_check_permission(security_scopes: SecurityScopes, token_data: TokenData, authenticate_value:str):
    for scope in security_scopes.scopes:
        if scope not in token_data.scopes:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Not enough permissions",
                headers={"WWW-Authenticate": authenticate_value},
            ) 
    return

def decode_token(token:str):
    try:
        token_decode = jwt.decode(token, key=SECRET_KEY,algorithms=[ALGORITHM])
        email: str = token_decode.get("sub")
        if email == None:
            raise CREDENTIAL_EXCEPTION
        token_scopes = token_decode.get("scopes", [])
        token_name = token_decode.get("user")
        token_data = TokenData(nombre=token_name,scopes=token_scopes, email=email)
    except (JWTError,ValidationError):
        print("o por aqui?")
        raise CREDENTIAL_EXCEPTION
    return token_data
#Validación de usuario

async def get_current_user(security_scopes: SecurityScopes, token: str = Depends(oauth2_scheme)):
    authenticate_value = auth_scope_value(security_scopes)
    token_data = decode_token(token)
    user = get_user(token_data.email)
    if not user:
        raise CREDENTIAL_EXCEPTION
    auth_check_permission(security_scopes,token_data,authenticate_value)
    return user

async def get_current_active_user(current_user:Usuario = Security(get_current_user, scopes=['admin'])):
    return current_user


#auth y token de usuario

def create_token(data: dict, time_expire: datetime|None = None):
    data_copy = data.copy()

    if time_expire is None:
        expires = datetime.utcnow() + timedelta(minutes=15)
    else:
        expires = datetime.utcnow() + time_expire

    data_copy.update({"exp": expires})

    token_jwt = jwt.encode(data_copy, key=SECRET_KEY, algorithm=ALGORITHM)
    return token_jwt

async def get_token(form_data: OAuth2PasswordRequestForm):
    user = await auth_user(UsuarioDB(email=form_data.username,password=form_data.password))
    token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    scopes = []
    if admin_exist(form_data.username).data:
        print("pase por aqui ")
        scopes.append("admin")
    if assist_exist(form_data.username).data:
        scopes.append("assist")
    if student_exist(form_data.username).data:
        scopes.append("student")
    access_token_jwt = create_token({"user":user.nombre,"sub":user.email, "scopes":scopes}, token_expires)
    return{
        "access_token": access_token_jwt,
        "token_type":"bearer"
    }

async def auth_user(user: UsuarioDB):
    if(not user_exist(user.email).data): 
        raise CREDENTIAL_EXCEPTION 
    get_password_dict = supabase.table('Usuario').select("password").eq('email',user.email).execute()
    get_password = get_password_dict.data[0]['password']
    if not verify_password(user.password, get_password):
        raise CREDENTIAL_EXCEPTION
    name = supabase.table('Usuario').select("nombre").eq('email',user.email).execute()
    user.nombre = name.data[0]['nombre']
    return user


#Comprobaciones, creación y privilegios de usuario

async def create_user(user: UsuarioDB):
    if(user_exist(user).data): 
        raise HTTPException(status_code=208,detail="Usuario ya creado")    
    hash_password:UsuarioDB = get_password_hash(user.password)
    response = supabase.table('Usuario').insert({
        "email":user.email,
        "nombre":user.nombre,
        "password":hash_password
    }).execute()
    if(response.data):
        supabase.table('Estudiante').insert({
        "email":user.email
        }).execute()
    return response

def admin_exist(email: str):
    return supabase.table('Administrador').select("*").eq('email',email).execute()

def assist_exist(email: str):
    return supabase.table('Ayudante').select("*").eq('email',email).execute()

def student_exist(email: str):
    return supabase.table('Estudiante').select("*").eq('email',email).execute()

async def make_admin(user:Usuario, security_scopes: SecurityScopes, token:str = Depends(oauth2_scheme)):
    authenticate_value = auth_scope_value(security_scopes)
    token_data = decode_token(token)
    auth_check_permission(security_scopes,token_data,authenticate_value)
    if(not user_exist(user.email).data): 
        raise HTTPException(status_code=404,detail="Usuario no encontrado")
    if(admin_exist(user.email).data):
        raise HTTPException(status_code=208,detail="Ya cuenta con permisos de administrador")
    result = supabase.table('Administrador').insert({
        "email":user.email
    }).execute()
    if result.data:
        return HTTPException(
            status_code=201, detail="Privilegios concedidos con éxito",headers="bearer"
        )
    raise HTTPException(status_code=401, detail="Error al conceder privilegios")


async def make_assist(user:Usuario, security_scopes: SecurityScopes,token:str = Depends(oauth2_scheme)):
    
    authenticate_value = auth_scope_value(security_scopes)
    token_data = decode_token(token)
    auth_check_permission(security_scopes,token_data,authenticate_value)
    if(not user_exist(user.email).data): 
        raise HTTPException(status_code=404,detail="Usuario no encontrado")
    if(assist_exist(user.email).data):
        raise HTTPException(status_code=208,detail="Ya cuenta con permisos de ayudante")
    result = supabase.table('Ayudante').insert({
        "email":user.email
    }).execute()
    if result.data:
        return HTTPException(
            status_code=201, detail="Privilegios concedidos con éxito",headers="bearer"
        )
    raise HTTPException(status_code=401, detail="Error al conceder privilegios")

async def make_student(user:Usuario, security_scopes:SecurityScopes, token:str = Depends(oauth2_scheme)):
    authenticate_value = auth_scope_value(security_scopes)
    token_data = decode_token(token)
    auth_check_permission(security_scopes,token_data,authenticate_value) 
    if(not user_exist(user.email).data): 
        raise HTTPException(status_code=404,detail="Usuario no encontrado")
    if(student_exist(user.email).data):
        raise HTTPException(status_code=208,detail="Ya cuenta con permisos de estudiante") 
    result = supabase.table('Estudiante').insert({
        "email":user.email
    }).execute()
    if result.data:
        return HTTPException(
            status_code=201, detail="Privilegios concedidos con éxito",headers="bearer"
        )
    
    raise HTTPException(status_code=401, detail="Error al conceder privilegios")

async def decode_token_frontend(token:str):
    try:
        token_decode = jwt.decode(token, key=SECRET_KEY,algorithms=[ALGORITHM])
        email: str = token_decode.get("sub")
        if email == None:
            raise CREDENTIAL_EXCEPTION
        token_scopes = token_decode.get("scopes", [])
        token_name = token_decode.get("user")
        token_data = TokenData(nombre=token_name,scopes=token_scopes, email=email)
    except (JWTError,ValidationError):
        print("o por aqui?")
        raise CREDENTIAL_EXCEPTION
    return token_data
