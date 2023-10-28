from ...database.models import *
from ...core.methods import *
from fastapi import APIRouter
from fastapi import HTTPException
router = APIRouter()

@router.post("/investigacion", status_code=201)
async def addInvestigacion(investigacion:Investigacion):
    result = await add_investigacion(investigacion)
    return result

@router.get("/investigacion_id/{id_inv}", status_code=302)
async def getInvestigacionId(id_inv:int):
    result = await get_investigacion_id(id_inv)
    if len(result.data)==0:
        raise HTTPException(status_code=404,detail="No se encontro la investigacion")
    return result

@router.get("/investigacion_name/{name_inv}", status_code=302)
async def getInvestigacionNm(name_inv:str):
    result = await get_investigacion_nm(name_inv)
    if len(result.data)==0:
        raise HTTPException(status_code=404,detail="No se encontro la investigacion")
    return result

@router.get("/investigacion_date/{date_inv}", status_code=302)
async def getInvestigacionDate(date_inv:str):
    result = await get_investigacion_date(date_inv)
    if len(result.data)==0:
        raise HTTPException(status_code=404,detail="No se encontro la investigacion")
    return result

@router.delete("/investigacion/{id_inv}", status_code=202)
async def deleteInvestigacion(id_inv:int):
    result = await delete_inv(id_inv)
    return result

@router.put("/investigacion_update/{id}", status_code=202)
async def updateInv(id:int,nuevo:ActualizarInvestigacion):
    result = await update_inv(id,nuevo)
    return result
