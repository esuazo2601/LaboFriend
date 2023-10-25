from ..database.dbconfig import supabase
from ..database.models import *
from fastapi import HTTPException

#BLOCK METHODS
async def get_blocks():
    response = supabase.table('Bloque').select("*").execute()
    print(response)
    return response.data

async def get_block(bloque_id:int):
    response,count = supabase.table('Bloque').select('*').eq('id',bloque_id).execute()
    print(response)
    return response,count

async def newblock(bloque: Bloque):
    print(bloque.model_dump())  # Asegúrate de que los datos se imprimen correctamente
    response = supabase.table('Bloque').insert({
        "hora_inicio":bloque.hora_inicio,
        "hora_fin":bloque.hora_fin    
        }).execute()
    return response

async def delete_block(bloque_id:int):
    data = supabase.table('Bloque').select('*').eq('id',bloque_id).execute()
    print (data)
    if data.data:
        response = supabase.table('Bloque').delete().eq("id",bloque_id).execute()
        return {'message':f'Se elimino el bloque con id: {11}'},response
    else:
        return {'message':'No existe el bloque con esta id'}

async def new_room(sala: Sala):
    print(sala.model_dump())
    response = supabase.table('Sala').insert({
        "capacidad":sala.capacidad,
        "nombre":sala.nombre
    }).execute()
    return response

async def get_rooms():
    response = supabase.table('Sala').select('*').execute()
    print(response)
    return response

async def delete_room(sala_id:int):
    response = supabase.table('Sala').select('*').eq('id', sala_id).execute()
    if response.data:
        supabase.table('Sala').delete().eq('id',sala_id).execute()
        return {f'message':'Sala con id: {sala_id} fue borrada'}
    else:
        return {'message':'No se encuentra la sala con esta id'}
    
async def add_microorg(microorganismo:Microorganismo):
    response = supabase.table('Microorganismo').insert({
        "nombre_cientifico":microorganismo.nombre_cientifico,
        "nombre_comun":microorganismo.nombre_comun,
        "procedencia":microorganismo.procedencia,
        "detalles":microorganismo.detalles
    }).execute()
    return response

async def add_microorg(microorganismo:Microorganismo):
    response = supabase.table('Microorganismo').insert({
        "nombre_cientifico":microorganismo.nombre_cientifico,
        "nombre_comun":microorganismo.nombre_comun,
        "procedencia":microorganismo.procedencia,
        "detalles":microorganismo.detalles
    }).execute()
    return response

async def delete_microorg(id:int):
    response = supabase.table('Microorganismo').delete().eq('id',id).execute()
    if response:
        return response
    else:
        return {'message':f'No se encontró microorganismo de id: {id}'}


async def get_microorg_cm(nombre_comun:str):
    response = supabase.table('Microorganismo').select('').eq('nombre_comun',nombre_comun).execute()
    return response

async def get_microorg_cin(nombre_cientifico:str):
    response = supabase.table('Microorganismo').select('').eq('nombre_cientifico',nombre_cientifico).execute()
    return response

async def update_microorg(id:int,nuevo:ActualizarMicroorganismo):
    print(f"id {id} , detalles {nuevo.detalles}, procedencia {nuevo.procedencia}")
    if nuevo.procedencia and nuevo.detalles:
        response = supabase.table('Microorganismo').update({"detalles":nuevo.detalles, "procedencia":nuevo.procedencia}).eq('id',id).execute()
        return response
    elif nuevo.detalles:
        print("Entre aqui al else de detalles")
        response = supabase.table('Microorganismo').update({"detalles":nuevo.detalles}).eq('id',id).execute()
        return response
    elif nuevo.procedencia:
        response = supabase.table('Microorganismo').update({"procedencia":nuevo.procedencia}).eq('id',id).execute()
        return response
    else:
        print("Entre aqui al execption")
        raise HTTPException(status_code=406,detail="No se especifica que se cambia")