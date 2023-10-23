from ..database.dbconfig import supabase
from ..database.models import *

################################### BLOQUES METHODS ################################### 
async def get_blocks():
    response = supabase.table('Bloque').select("*").execute()
    print(response)
    return response.data

async def get_block(bloque_id:int):
    response = supabase.table('Bloque').select('*').eq('id',bloque_id).execute()
    print(response)
    return response

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
        return {'message':f'Se elimino el bloque con id: {bloque_id}'},response
    else:
        return {'message':'No existe el bloque con esta id'}

################################### SALAS METHODS ################################### 

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

async def delete_room(sala_nombre:str):
    response = supabase.table('Sala').select('*').eq('nombre', sala_nombre).execute()
    if response.data:
        supabase.table('Sala').delete().eq('nombre', sala_nombre).execute()
        return {'message':f'Sala con nombre: {sala_nombre} fue borrada'}
    else:
        return {'message':'No se encuentra la sala con esta id'} 