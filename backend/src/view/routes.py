from fastapi import Request, APIRouter
from datetime import time
from pydantic import BaseModel
#from controller.labs import get_hours
import os
from dotenv import load_dotenv
from supabase import create_client,Client
load_dotenv()
url:str = os.environ.get("SUPABASE_URL")
key:str = os.environ.get("SUPABASE_KEY")
supabase : Client = create_client(url, key)

router = APIRouter()


class Bloque(BaseModel):
    id:int
    hora_inicio: str
    hora_final: str

class Producto(BaseModel):
    nombre: str
    cantidad_total: int
    tipo: str


@router.get("/Bloques")
async def get_blocks():
    print("Ho0la")
    response = supabase.table('Bloque').select("*").execute()
    print(response)
    return response

@router.get("/Producto")
async def get_products():
    print("Hola")
    response = supabase.table('Producto').select("*").execute()
    return response

@router.post("/Bloque")
async def add_block():
    response = supabase.table('Bloque').insert({"id":11,"hora_inicio":"19:00:00","hora_fin":"20:00:00"}).execute()
    assert len(response.data)>0

@router.post("/nuevo_producto")
async def newblock(producto: Producto):
    print(producto.model_dump())  # Asegúrate de que los datos se imprimen correctamente
    response = supabase.table('Producto').insert(producto).execute()
    return response

@router.post("/nuevo_bloque")
async def newblock(bloque: Bloque):
    print(bloque.model_dump())  # Asegúrate de que los datos se imprimen correctamente
    response = supabase.table('Bloque').insert({
        "id":bloque.id,
        "hora_inicio":bloque.hora_inicio,
        "hora_final":bloque.hora_final    
        }).execute()
    return response


""" @router.get("/hours/{labid}")
def hours(
    request: Request,
    labid: str,
    sid: str
):
    return get_hours(
        labid=labid,
        sid = sid,
    ) 
    """