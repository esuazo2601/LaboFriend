from ...database.models import *
from ...core.userValidation import *
from fastapi import APIRouter
from fastapi import HTTPException
router = APIRouter(tags=["usuarios"])

@router.post("/usuario",response_description="Usuario creado con éxito")
async def createUser(user: UsuarioDB):
    result = await create_user(user)
    return result

@router.post("/token", response_description="Usuario logeado con éxito")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    token = await get_token(form_data)
    return token

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
