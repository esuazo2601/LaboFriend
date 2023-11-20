from ...database.models import *
from ...core.methods import *
from fastapi import APIRouter
from fastapi import HTTPException
router = APIRouter(tags=["agenda"])

@router.post("/agenda")
async def newAgendamiento(agendamiento:Agenda):
    result = await new_agendamiento(agendamiento)
    return result

@router.delete("/agenda/{id}")
async def deleteAgendamiento(id:int):
    result = await delete_agendamiento(id)
    return result

@router.put("/agenda/{id}")
async def updateAgendamiento(id:int,new_agendamiento:ActualizarAgenda):
    result = await update_agendamiento(id,new_agendamiento)
    return result

@router.get('/check_availability')
async def checkAvailability(check_agenda:CheckAgenda):
    result = await check_availability(check_agenda)
    return result