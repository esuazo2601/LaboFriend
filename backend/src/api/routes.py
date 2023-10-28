from ..database.models import *
from ..core.methods import *
from fastapi import APIRouter
from fastapi import HTTPException
router = APIRouter()

################################### BLOQUES ROUTES ################################### 
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

################################### SALAS ROUTES ################################### 

@router.post("/salas", status_code=201)
async def newRoom(sala:Sala):
    result = await new_room(sala)
    return result

@router.get("/salas")
async def getRoom():
    result = await get_rooms()
    return result

@router.delete("/salas/{sala_nombre}")
async def deleteRoom(sala_nombre:str):
    result = await delete_room(sala_nombre)
    return result

################################### MICROORGANISMO ROUTES ################################### 
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
    return result

@router.delete("/microorganismo/{id_microorg}", status_code=202)
async def deleteMicroorg(id_microorg:int):
    result = await delete_microorg(id_microorg)
    return result

@router.put("/microorganismo_update/{id}", status_code=202)
async def updateMicroorg(id:int,nuevo:ActualizarMicroorganismo ):
    result = await update_microorg(id,nuevo)
    return result
################################### INVESTIGACIÓN ROUTES ################################### 

@router.post("/investigacion", status_code=201)
async def addInvestigacion(investigacion:Investigacion):
    result = await add_investigacion(investigacion)
    return result

@router.get("/investigacion_id/{id_inv}", status_code=302)
async def getInvestigacionId(id_inv:int):
    result = await get_investigacion_id(id_inv)
    if len(result.data)==0:
        raise HTTPException(status_code=404,detail="No se encontro la investigacion")
    return result

@router.get("/investigacion_name/{name_inv}", status_code=302)
async def getInvestigacionNm(name_inv:str):
    result = await get_investigacion_nm(name_inv)
    if len(result.data)==0:
        raise HTTPException(status_code=404,detail="No se encontro la investigacion")
    return result

@router.get("/investigacion_date/{date_inv}", status_code=302)
async def getInvestigacionDate(date_inv:str):
    result = await get_investigacion_date(date_inv)
    if len(result.data)==0:
        raise HTTPException(status_code=404,detail="No se encontro la investigacion")
    return result

@router.delete("/investigacion/{id_inv}", status_code=202)
async def deleteInvestigacion(id_inv:int):
    result = await delete_inv(id_inv)
    return result

@router.put("/investigacion_update/{id}", status_code=202)
async def updateInv(id:int,nuevo:ActualizarInvestigacion):
    result = await update_inv(id,nuevo)
    return result

################################### PRODUCTO ROUTES ################################### 

@router.post("/producto", status_code=201)
async def addProducto(producto:Producto):
    result = await upsert_producto(producto)
    return result

@router.get("/producto_name/{nombre_producto}", status_code=302)
async def getProductoNm(nombre_producto:str):
    result = await get_producto_nm(nombre_producto)
    if len(result.data)==0:
        raise HTTPException(status_code=404,detail="No se encontro el producto")
    return result

@router.get("/producto_id/{id_prod}", status_code=302)
async def getProductoId(id_prod:int):
    result = await get_producto_id(id_prod)
    if len(result.data)==0:
        raise HTTPException(status_code=404,detail= "No se encontro el producto")
    return result

@router.put("/producto_update/{id}", status_code=202)
async def updateProducto(id:int,nuevo:ActualizarProducto ):
    result = await update_producto(id,nuevo)
    return result 

@router.delete("/producto/{id_producto}", status_code=202)
async def deleteProduct(id_producto:int):
    result = await delete_product(id_producto)
    return result

