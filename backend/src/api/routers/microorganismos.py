from ...database.models import *
from ...core.methods import *
from fastapi import APIRouter
from fastapi import HTTPException
router = APIRouter(tags=["microorganismos"])

@router.post("/microorganismo")
async def addMicroorg(microorganismo:Microorganismo):
    result = await add_microorg(microorganismo)
    return result

@router.get("/microorganismo/{nombre_cientifico}")
async def getMicroorgCin(nombre_cientifico:str):
    result = await get_microorg_cin(nombre_cientifico)
    if len(result.data)==0:
        raise HTTPException(status_code=404,detail="No se encontro el microorganismo")
    return result

@router.get("/microorganismo/{nombre_comun}")
async def getMicroorgCm(nombre_comun:str):
    result = await get_microorg_cm(nombre_comun)
    if len(result.data)==0:
        raise HTTPException(status_code=404,detail="No se encontro el microorganismo")
    return result

@router.delete("/microorganismo/{id_microorg}")
async def deleteMicroorg(id_microorg:int):
    result = await delete_microorg(id_microorg)
    return result

@router.put("/microorganismo_update/{id}")
async def updateMicroorg(id:int,nuevo:ActualizarMicroorganismo ):
    result = await update_microorg(id,nuevo)
    return result