from ...database.models import *
from ...core.methods import *
from fastapi import APIRouter
from fastapi import HTTPException
router = APIRouter(tags=["agenda"])

@router.post("/agenda", status_code=201)
async def newAgendamiento(agendamiento:Agenda):
    result = await new_agendamiento(agendamiento)
    return result

@router.delete("/agenda/{id}", status_code=200)
async def deleteAgendamiento(id:int):
    result = await delete_agendamiento(id)
    return result

@router.put("/agenda/{id}", status_code=201)
async def updateAgendamiento(id:int,new_agendamiento:ActualizarAgenda):
    result = await update_agendamiento(id,new_agendamiento)
    return result