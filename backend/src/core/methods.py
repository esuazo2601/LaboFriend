from ..database.dbconfig import supabase
from ..database.models import *

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
        "id":bloque.id,
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

