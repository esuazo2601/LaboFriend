from ...database.models import *
from ...core.methods import *
from fastapi import APIRouter
from fastapi import HTTPException
router = APIRouter(tags=["bloques"])

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