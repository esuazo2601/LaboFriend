from ..database.dbconfig import supabase
from ..database.models import *
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import datetime,timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext

SECRET_KEY = "eacf7694189567a33798229f2abc522d7164ed6727d72740bae7d87228a8c8f5"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1
CREDENTIAL_EXCEPTION = HTTPException(status_code=401,detail="Credenciales invalidas",headers={"WWW-Authenticate":"Bearer"})
crypt = CryptContext(schemes=["bcrypt"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

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

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        token_decode = jwt.decode(token, key=SECRET_KEY,algorithms=[ALGORITHM])
        email = token_decode.get("sub")
        if email == None:
            raise CREDENTIAL_EXCEPTION
    except JWTError:
        raise CREDENTIAL_EXCEPTION
    user = get_user(email)
    if not user:
        raise CREDENTIAL_EXCEPTION
    return user


def create_token(data: dict, time_expire: datetime|None = None):
    data_copy = data.copy()

    if time_expire is None:
        expires = datetime.utcnow() + timedelta(minutes=15)
    else:
        expires = datetime.utcnow() + time_expire

    data_copy.update({"exp": expires})

    token_jwt = jwt.encode(data_copy, key=SECRET_KEY, algorithm=ALGORITHM)
    return token_jwt

async def create_user(user: UsuarioDB):
    if(user_exist(user).data): 
        raise HTTPException(status_code=208,detail="Usuario ya creado")    
    hash_password:UsuarioDB = get_password_hash(user.password)
    response = supabase.table('Usuario').insert({
        "email":user.email,
        "nombre":user.nombre,
        "password":hash_password
    }).execute()
    return response
    
async def auth_user(user: UsuarioDB):
    if(not user_exist(user.email).data): 
        raise CREDENTIAL_EXCEPTION 
    get_password_dict = supabase.table('Usuario').select("password").eq('email',user.email).execute()
    get_password = get_password_dict.data[0]['password']
    if not verify_password(user.password, get_password):
        raise CREDENTIAL_EXCEPTION
    return user

def admin_exist(email: str):
    return supabase.table('Administrador').select("*").eq('email',email).execute()

def assist_exist(email: str):
    return supabase.table('Ayudante').select("*").eq('email',email).execute()

def student_exist(email: str):
    return supabase.table('Estudiante').select("*").eq('email',email).execute()

async def make_admin(user:Usuario):
    if(not user_exist(user.email).data): 
        raise HTTPException(status_code=404,detail="Usuario no encontrado")
    if(admin_exist(user.email).data):
        raise HTTPException(status_code=208,detail="Ya cuenta con permisos de administrador") 
    result = supabase.table('Administrador').insert({
        "email":user.email
    }).execute()
    return result
    

async def make_assist(user:Usuario):
    if(not user_exist(user.email).data): 
        raise HTTPException(status_code=404,detail="Usuario no encontrado")
    if(assist_exist(user.email).data):
        raise HTTPException(status_code=208,detail="Ya cuenta con permisos de ayudante") 
    result = supabase.table('Ayudante').insert({
        "email":user.email
    }).execute()
    return result

async def make_student(user:Usuario):
    if(not user_exist(user.email).data): 
        raise HTTPException(status_code=404,detail="Usuario no encontrado")
    if(student_exist(user.email).data):
        raise HTTPException(status_code=208,detail="Ya cuenta con permisos de estudiante") 
    result = supabase.table('Estudiante').insert({
        "email":user.email
    }).execute()
    return result

    
