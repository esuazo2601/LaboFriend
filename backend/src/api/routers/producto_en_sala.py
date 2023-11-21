from ...database.models import *
from ...core.methods import *
from fastapi import APIRouter
from fastapi import HTTPException
router = APIRouter(tags=["Producto_en_sala"])

@router.post("/producto_en_sala")
async def addProdEnSala (prod_en_sala:Producto_en_sala):
    result = await add_prod_en_sala(prod_en_sala)
    return result

@router.get("/producto_en_sala")
async def getProdEnSala ():
    result = await get_prod_en_sala()
    return result

@router.get("/producto_en_sala")
async def getProdById (id_producto:int):
    result = await get_prod_by_id(id_producto)
    return result

@router.put("/producto_en_sala/{id_producto}/{id_sala}")
async def updateProdEnSala (id_producto:int, id_sala:int, actualizado:ActualizarProd_en_sala):
    result = await update_prod_en_sala(id_producto,id_sala,actualizado)
    return result