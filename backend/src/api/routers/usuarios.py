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
    user = await auth_user(UsuarioDB(email=form_data.username,password=form_data.password))
    token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token_jwt = create_token({"sub":user.email}, token_expires)
    return{
        "access_token": access_token_jwt,
        "token_type":"bearer"
    }

@router.get("/usuario/datos", response_model=Usuario)
async def getCurrentUser(user: Usuario = Depends(get_current_user)):
    return user

@router.post("/usuario/admin",response_description="Permisos de administrador")
async def makeAdmin(user:Usuario):
    result = await make_admin(user)
    return result

@router.post("/usuario/ayudante",response_description="Permisos de ayudante")
async def makeAssist(user:Usuario):
    result = await make_assist(user)
    return result

@router.post("/usuario/estudiante",response_description="Permisos de estudiante")
async def makeStudent(user:Usuario):
    result = await make_student(user)
    return result