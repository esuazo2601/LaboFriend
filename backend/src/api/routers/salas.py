from ...database.models import *
from ...core.methods import *
from fastapi import APIRouter
from fastapi import HTTPException

router = APIRouter(tags=["salas"])


@router.post("/salas")
async def newRoom(sala: Sala):
    result = await new_room(sala)
    return result


@router.get("/salas")
async def getRoom():
    result = await get_rooms()
    return result


@router.delete("/salas/{sala_nombre}")
async def deleteRoom(sala_nombre: str):
    result = await delete_room(sala_nombre)
    return result


@router.get("/sala/{sala_id}")
async def getRoomId(sala_id: int):
    result = await get_room_id(sala_id)
    return result
