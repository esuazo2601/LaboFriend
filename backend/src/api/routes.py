from ..database.models import *
from ..core.methods import *
from fastapi import Request, APIRouter
router = APIRouter()

@router.get("/bloques")
async def getBlocks():
    result = await get_blocks()
    return result

@router.get("/bloques/{bloque_id}")
async def getBlock(bloque_id:int):
    result = await get_block(bloque_id)
    return result

@router.post("/bloques", status_code=201)
async def newBlock(bloque:Bloque):
    result = await newblock(bloque)
    return result

@router.delete ("/bloques/{bloque_id}")
async def deleteBlock(bloque_id:int):
    result = await delete_block(bloque_id)
    return result

@router.post("/salas", status_code=201)
async def newRoom(sala:Sala):
    result = await new_room(sala)
    return result

@router.get("/salas")
async def getRoom():
    result = await get_rooms()
    return result

@router.delete("/salas/{sala_id}")
async def deleteRoom(sala_id:int):
    result = await delete_room(sala_id)
    return result

@router.post("/microorganismo", status_code=201)
async def addMicroorg(microorganismo:Microorganismo):
    result = await add_microorg(microorganismo)
    return result

@router.post("/microorganismo", status_code=201)
async def addMicroorg(microorganismo:Microorganismo):
    result = await add_microorg(microorganismo)
    return result

@router.get("/microorganismo/{nombre_cientifico}", status_code=302)
async def getMicroorgCin(nombre_cientifico:str):
    result = await get_microorg_cin(nombre_cientifico)
    if len(result.data)==0:
        raise HTTPException(status_code=404,detail="No se encontro el microorganismo")
    return result

@router.get("/microorganismo/{nombre_comun}", status_code=302)
async def getMicroorgCm(nombre_comun:str):
    result = await get_microorg_cm(nombre_comun)
    if len(result.data)==0:
        raise HTTPException(status_code=404,detail="No se encontro el microorganismo")


@router.delete("/microorganismo/{id_microorg}", status_code=202)
async def deleteMicroorg(id_microorg:int):
    result = await delete_microorg(id_microorg)
    return result

@router.put("/microorganismo_update/{id}", status_code=202)
async def updateMicroorg(id:int,nuevo:ActualizarMicroorganismo ):
    result = await update_microorg(id,nuevo)
    return result