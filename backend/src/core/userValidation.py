from ..database.dbconfig import supabase
from ..database.models import *
from fastapi import HTTPException
from datetime import datetime,timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext

SECRET_KEY = "eacf7694189567a33798229f2abc522d7164ed6727d72740bae7d87228a8c8f5"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

crypt = CryptContext(schemes=["bcrypt"])

def user_exist(user: UsuarioDB):
    return supabase.table('Usuario').select("*").eq('email',user.email).execute()

def verify_password(plain_password: str, hashed_password: str):
    return crypt.verify(plain_password, hashed_password)

def get_password_hash(password):
    return crypt.hash(password)

async def create_user(user: UsuarioDB):
    if(user_exist(user).data): 
        raise HTTPException(status_code=208,detail="Usuario ya creado")    
    hash_password:UsuarioDB = get_password_hash(user.password)
    res = supabase.auth.sign_up({
    "email": user.email,
    "password": hash_password
    })
    response = supabase.table('Usuario').insert({
        "email":user.email,
        "nombre":user.nombre,
        "password":hash_password
    }).execute()
    return response,res
    
