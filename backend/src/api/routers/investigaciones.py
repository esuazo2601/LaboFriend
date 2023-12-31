from ...database.models import *
from ...core.methods import *
from fastapi import APIRouter
from fastapi import HTTPException

router = APIRouter(tags=["Investigaciones"])


@router.post("/investigacion")
async def addInvestigacion(investigacion: Investigacion):
    result = await add_investigacion(investigacion)
    return result


@router.get("/investigaciones")
async def getAllInvestigaciones():
    result = await get_all_investigaciones()
    return result


@router.get("/investigacion_id/{id_inv}")
async def getInvestigacionId(id_inv: int):
    result = await get_investigacion_id(id_inv)
    if len(result.data) == 0:
        raise HTTPException(status_code=404, detail="No se encontro la investigacion")
    return result


@router.get("/investigacion_name/{name_inv}")
async def getInvestigacionNm(name_inv: str):
    result = await get_investigacion_nm(name_inv)
    if len(result.data) == 0:
        raise HTTPException(status_code=404, detail="No se encontro la investigacion")
    return result


@router.get("/investigacion_date/{date_inv}")
async def getInvestigacionDate(date_inv: str):
    result = await get_investigacion_date(date_inv)
    if len(result.data) == 0:
        raise HTTPException(status_code=404, detail="No se encontro la investigacion")
    return result


@router.delete("/investigacion/{id_inv}")
async def deleteInvestigacion(id_inv: int):
    result = await delete_inv(id_inv)
    return result


@router.put("/investigacion_update/{id}")
async def updateInv(id: int, nuevo: ActualizarInvestigacion):
    result = await update_inv(id, nuevo)
    return result
