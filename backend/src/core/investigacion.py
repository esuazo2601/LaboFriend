from ..database.dbconfig import supabase
from ..database.models import *
from fastapi import HTTPException
from datetime import datetime,timedelta


async def add_investigacion(investigacion:Investigacion, session):
    response = supabase.table('Investigacion').insert({
        "titulo":investigacion.titulo,
        "descripcion":investigacion.descripcion,
        "fecha":investigacion.fecha
        
    }).execute()
    return response

async def get_investigacion_id(id_inv:int, session):
    response = supabase.table('Investigacion').select('*').eq('id',id_inv).execute()
    return response

async def get_investigacion_nm(name_inv:str, session):
    response = supabase.table('Investigacion').select('*').eq('titulo',name_inv).execute()
    return response

async def get_investigacion_date(fecha: str, session):
    # Convierte la fecha proporcionada en un objeto datetime
    fecha_obj = datetime.strptime(fecha, '%Y-%m-%d')

    # Calcula la fecha de inicio (medianoche) y fecha de finalización (un minuto antes de la medianoche del día siguiente)
    fecha_inicio = fecha_obj.replace(hour=0, minute=0, second=0, microsecond=0)
    fecha_fin = fecha_inicio + timedelta(days=1)

    # Consulta la base de datos utilizando operadores de filtro personalizados
    response = supabase.table('Investigacion').select('*').filter(
        'fecha', 'gte', fecha_inicio.strftime('%Y-%m-%d %H:%M:%S')
    ).filter(
        'fecha', 'lt', fecha_fin.strftime('%Y-%m-%d %H:%M:%S')
    ).execute()
    
    return response

async def delete_inv(id:int, session):
    response = supabase.table('Investigacion').delete().eq('id',id).execute()
    if response:
        return response
    else:
        return {'message':f'No se encontró la investigación de id: {id}'}

async def update_inv(id:int,nuevo:ActualizarInvestigacion, session):
    if nuevo.titulo:
        response = supabase.table('Investigacion').update({"titulo":nuevo.titulo}).eq('id',id).execute()
        return response
    if nuevo.descripcion:
        response = supabase.table('Investigacion').update({"descripcion":nuevo.descripcion}).eq('id',id).execute()
        return response
    if nuevo.fecha:
        response = supabase.table('Investigacion').update({"fecha":nuevo.fecha}).eq('id',id).execute()
        return response
    else:
        raise HTTPException(status_code=406,detail="No se especifica que se cambia")