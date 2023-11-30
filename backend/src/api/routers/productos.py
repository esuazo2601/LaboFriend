from ...database.models import *
from ...core.methods import *
from fastapi import APIRouter
from fastapi import HTTPException

router = APIRouter(tags=["productos"])


@router.post("/producto")
async def addProducto(producto: Producto):
    result = await upsert_producto(producto)
    return result


@router.get("/producto")
async def getProductos():
    result = await get_productos()
    return result


@router.get("/producto_name/{nombre_producto}")
async def getProductoNm(nombre_producto: str):
    result = await get_producto_nm(nombre_producto)
    if len(result.data) == 0:
        raise HTTPException(status_code=404, detail="No se encontro el producto")
    return result


@router.get("/producto_id/{id_prod}")
async def getProductoId(id_prod: int):
    result = await get_producto_id(id_prod)
    if len(result.data) == 0:
        raise HTTPException(status_code=404, detail="No se encontro el producto")
    return result


@router.put("/producto_update/{id}")
async def updateProducto(id: int, nuevo: ActualizarProducto):
    result = await update_producto(id, nuevo)
    return result


@router.delete("/producto/{id_producto}")
async def deleteProduct(id_producto: int):
    result = await delete_product(id_producto)
    return result
