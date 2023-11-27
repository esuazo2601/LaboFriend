from ...database.models import *
from ...core.methods import *
from fastapi import APIRouter
from fastapi import HTTPException
router = APIRouter(tags=["equipo"])

@router.post("/equipo")
async def addEquipo(equipo:Equipo):
    result = await upsert_equipo(equipo)
    return result

@router.get("/equipo")
async def getEquipos():
    result = await get_equipos()
    return result

@router.get("/equipo_name/{nombre_equipo}")
async def getEquipoNm(nombre_equipo:str):
    result = await get_equipo_nm(nombre_equipo)
    if len(result.data)==0:
        raise HTTPException(status_code=404,detail="No se encontro el equipo")
    return result

@router.get("/equipo_id/{id_equip}")
async def getEquipoId(id_equip:int):
    result = await get_equipo_id(id_equip)
    if len(result.data)==0:
        raise HTTPException(status_code=404,detail= "No se encontro el equipo")
    return result

@router.delete("/equipo/{id_equipo}")
async def deleteEquipo(id_equipo:int):
    result = await delete_equipo(id_equipo)
    return result
