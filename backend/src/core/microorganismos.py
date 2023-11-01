from ..database.dbconfig import supabase
from ..database.models import *
from fastapi import HTTPException
from datetime import datetime,timedelta

async def add_microorg(microorganismo:Microorganismo, session):
    response = supabase.table('Microorganismo').insert({
        "nombre_cientifico":microorganismo.nombre_cientifico,
        "nombre_comun":microorganismo.nombre_comun,
        "procedencia":microorganismo.procedencia,
        "detalles":microorganismo.detalles
    }).execute()
    return response

async def delete_microorg(id:int, session):
    response = supabase.table('Microorganismo').delete().eq('id',id).execute()
    if response:
        return response
    else:
        return {'message':f'No se encontró microorganismo de id: {id}'}
    

async def get_microorg_cm(nombre_comun:str, session):
    response = supabase.table('Microorganismo').select('*').eq('nombre_comun',nombre_comun).execute()
    return response

async def get_microorg_cin(nombre_cientifico:str, session):
    response = supabase.table('Microorganismo').select('*').eq('nombre_cientifico',nombre_cientifico).execute()
    return response

async def update_microorg(id:int,nuevo:ActualizarMicroorganismo, session):
    if nuevo.procedencia and nuevo.detalles:
        response = supabase.table('Microorganismo').update({"detalles":nuevo.detalles, "procedencia":nuevo.procedencia}).eq('id',id).execute()
        return response
    elif nuevo.detalles:
        response = supabase.table('Microorganismo').update({"detalles":nuevo.detalles}).eq('id',id).execute()
        return response
    elif nuevo.procedencia:
        response = supabase.table('Microorganismo').update({"procedencia":nuevo.procedencia}).eq('id',id).execute()
        return response
    else:
        raise HTTPException(status_code=406,detail="No se especifica que se cambia")