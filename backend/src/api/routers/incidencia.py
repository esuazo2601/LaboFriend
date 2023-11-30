from ...database.models import *
from ...core.methods import *
from fastapi import APIRouter
from fastapi import HTTPException

router = APIRouter(tags=["incidencia"])


@router.post("/incidencia")
async def addIncidencia(incidencia: Incidencia):
    result = await add_incidencia(incidencia)
    return result


@router.get("/incidencias")
async def getIncidencias():
    result = await get_incidencias()
    return result


@router.get("/incidencias_inv/{id_inv}")
async def getIncidenciasInv(id_inv):
    result = await get_incidencias_inv(id_inv)
    return result


@router.get("/incidencia/{id}")
async def getIncidencia(id):
    result = await get_incidencia(id)
    return result


@router.delete("/incidencia/{id}")
async def deleteIncidencia(id):
    result = await delete_incidencia(id)
    return result
