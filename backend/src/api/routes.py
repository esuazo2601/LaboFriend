import sys
import os
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.join(current_dir,"..", "database"))
sys.path.append(os.path.join(current_dir, "..", "core"))

from ..database.models import *
from ..core.methods import *
from fastapi import Request, APIRouter
router = APIRouter()

@router.get("/bloques")
def getBlocks():
    return get_blocks()

@router.get("/bloques/{bloque_id}")
def getBlock(bloque_id:int):
    return get_block(bloque_id)

@router.post("/bloques")
def newBlock(bloque:Bloque):
    return newblock(bloque)

@router.delete ("/bloques/{bloque_id}")
def deleteBlock(bloque_id:int):
    delete_block(bloque_id)

