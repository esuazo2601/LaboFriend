from ..database.dbconfig import supabase
from ..database.models import *
from fastapi import HTTPException
from datetime import datetime,timedelta

async def upsert_producto(producto: Producto, session):
    # Verificar si el producto ya existe en la base de datos
    existing_product = supabase.table('Producto').select('id').eq('nombre', producto.nombre).execute()
    if existing_product.data:
        response = supabase.table('Producto').upsert({
            "id": existing_product.data[0]['id'],
            "nombre":producto.nombre,
            "cantidad_total":producto.cantidad_total,
            "tipo":producto.tipo
            }).execute()
        return response
    else: 
        response = supabase.table('Producto').insert({
            "nombre":producto.nombre,
            "cantidad_total":producto.cantidad_total,
            "tipo":producto.tipo
        }).execute()
        return response

async def get_producto_nm(name_prod:str, session):
    response = supabase.table('Producto').select('*').eq('nombre',name_prod).execute()
    return response

async def get_producto_id(id_prod:str, session):
    response = supabase.table('Producto').select('*').eq('id',id_prod).execute()
    return response

async def update_producto(id:int,nuevo:ActualizarProducto, session):
    response = supabase.table('Producto').select('*').eq('id',id).execute()
    if response:
        query = supabase.table('Producto').update({"cantidad_total":nuevo.cantidad_total}).eq('id',id).execute()
        return query
    else:
        raise HTTPException(status_code=406,detail="No se encuentra el producto")

async def delete_product(id:int, session):
    query = supabase.table('Producto').select('*').eq('id',id).execute()
    if query.data:
        response = supabase.table('Producto').delete().eq('id',id).execute()
        return response
    else:
        return {'message':f'No se encontró el producto de id: {id}'}