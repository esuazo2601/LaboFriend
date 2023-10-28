from ...database.models import *
from ...core.userValidation import *
from fastapi import APIRouter
from fastapi import HTTPException
router = APIRouter(tags=["usuarios"])

@router.post("/usuario",status_code=201,response_description="Usuario creado con éxito")
async def createUser(user: UsuarioDB):
    result = await create_user(user)
    return result

