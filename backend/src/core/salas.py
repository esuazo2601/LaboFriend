from ..database.dbconfig import supabase
from ..database.models import *
from fastapi import HTTPException
from datetime import datetime,timedelta

async def new_room(sala: Sala, session):
    print(sala.model_dump())
    response = supabase.table('Sala').insert({
        "capacidad":sala.capacidad,
        "nombre":sala.nombre
    }).execute()
    return response

async def get_rooms(session):
    response = supabase.table('Sala').select('*').execute()
    print(response)
    return response

async def delete_room(sala_nombre:str, session):
    response = supabase.table('Sala').select('*').eq('nombre', sala_nombre).execute()
    if response.data:
        supabase.table('Sala').delete().eq('nombre', sala_nombre).execute()
        return {'message':f'Sala con nombre: {sala_nombre} fue borrada'}
    else:
        return {'message':'No se encuentra la sala con esta id'} 