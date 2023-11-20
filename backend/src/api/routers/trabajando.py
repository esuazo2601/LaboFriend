from ...database.models import *
from ...core.methods import *
from fastapi import APIRouter
from fastapi import HTTPException
router = APIRouter(tags=["Trabajando"])

@router.post("/trabajando")
async def addTrabajando (trabaja:Trabaja):
    result = await add_trabajando(trabaja)
    return result

@router.get("/trabajando")
async def getTrabajando ():
    result = await get_trabajando()
    return result

#Retorna las id's de investigacion en las que trabaja el usuario con el email proporcionado
@router.get("/trabajando_email/{email}")
async def getTrabajandoEmail (email:str):
    result = await get_trabajando_email (email)
    return result

@router.delete("/trabajando/{id}")
async def deleteTrabajandoId(id:int):
    result = await delete_trabajando_id(id)
    return result