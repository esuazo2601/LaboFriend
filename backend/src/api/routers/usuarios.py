from ...database.models import *
from ...core.userValidation import *
from ...core.methods import get_users, get_user_by_email, get_user_scopes, delete_user
from fastapi import APIRouter
from fastapi import HTTPException
router = APIRouter(tags=["usuarios"])

@router.get("/users")
async def getUsers():
    result = await get_users()
    return result

@router.get ("/user/{email}")
async def getUserByEmail(email:EmailStr):
    result = await get_user_by_email(email=email)
    return result

@router.get ("/user_scopes/{email}")
async def getUserScopes(email:EmailStr):
    result = await get_user_scopes(email=email)
    return result

@router.delete("/user/{email}")
async def deleteUser(email:EmailStr):
    result = await delete_user(email)
    return result

@router.post("/usuario",response_description="Usuario creado con éxito")
async def createUser(user: UsuarioDB):
    result = await create_user(user)
    return result

@router.post("/token", response_description="Usuario logeado con éxito")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    token = await get_token(form_data)
    return token

@router.get("/datos_token/{token}",response_description="Datos del token extraidos con éxito")
async def decodeTokenFrontend(token: str):
    data = await decode_token_frontend(token)
    return data

@router.get("/usuario/datos",status_code=201, response_model=Usuario)
async def getCurrentUser(user: Usuario = Depends(get_current_active_user)):
    return user

@router.post("/usuario/admin",status_code=201,response_description="Permisos de administrador")
async def makeAdmin(user:Usuario = Security(make_admin,scopes=["admin"])):
    return user

@router.post("/usuario/ayudante",status_code=201,response_description="Permisos de ayudante")
async def makeAssist(user:Usuario = Security(make_assist,scopes=["admin"])):
    return user

@router.post("/usuario/estudiante",status_code=201,response_description="Permisos de estudiante")
async def makeStudent(user:Usuario = Security(make_student,scopes=["admin"])):
    return user

