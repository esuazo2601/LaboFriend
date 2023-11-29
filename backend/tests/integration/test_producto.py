import os
os.environ["ENVIRONMENT"] = "test"
from src.database.dbconfig import supabase
from src.database.models import Producto, ActualizarProducto
import pytest
from fastapi.exceptions import HTTPException
from src.core.methods import (
    upsert_producto,
    get_producto_nm,
    get_producto_id,
    get_productos,
    update_producto,
    delete_product
)

@pytest.mark.asyncio
async def test_get_productos():
    result = await get_productos()

    salida_esperada =[
        {'id': 56, 'nombre': 'Fenolftaleína', 'cantidad_total': 15, 'tipo': 'gramos'},
        {'id': 43, 'nombre': 'Placas de Petri', 'cantidad_total': 10, 'tipo': 'unidades'},
        {'id': 44, 'nombre': 'Etanol', 'cantidad_total': 25, 'tipo': 'litros'},
        {'id': 45, 'nombre': 'Guantes', 'cantidad_total': 20, 'tipo': 'pares'},
        {'id': 46, 'nombre': 'Pipetas', 'cantidad_total': 15, 'tipo': 'unidades'},
        {'id': 47, 'nombre': 'Tubos de Microcentrífuga', 'cantidad_total': 20, 'tipo': 'unidades'},
        {'id': 48, 'nombre': 'Papel de Filtro', 'cantidad_total': 30, 'tipo': 'hojas'},
        {'id': 49, 'nombre': 'Jeringas Desechables', 'cantidad_total': 8, 'tipo': 'unidades'},
        {'id': 50, 'nombre': 'Tubos de Cultivo', 'cantidad_total': 15, 'tipo': 'unidades'},
        {'id': 51, 'nombre': 'Vasos de precipitado', 'cantidad_total': 8, 'tipo': 'unidades'},
        {'id': 52, 'nombre': 'Ácido sulfúrico', 'cantidad_total': 15, 'tipo': 'litros'},
        {'id': 53, 'nombre': 'Láminas de vidrio', 'cantidad_total': 5, 'tipo': 'unidades'},
        {'id': 54, 'nombre': 'Matraces Erlenmeyer', 'cantidad_total': 20, 'tipo': 'unidades'},
        {'id': 55, 'nombre': 'Alcohol', 'cantidad_total': 34, 'tipo': 'litros'},
                      ]
    assert result.data == salida_esperada

@pytest.mark.asyncio
async def test_add_and_delete_producto_with_valid_data():
    producto = Producto(nombre = 'producto de test', cantidad_total= 10, tipo= 'unidades')
    result_add_producto = await upsert_producto(producto)
    last_row = result_add_producto.data[-1]
    last_row_id = last_row['id']
    result_delete_producto = await delete_product(last_row_id)

    assert last_row['nombre'] == 'producto de test'
    assert last_row['cantidad_total'] == 10


@pytest.mark.asyncio
async def test_delete_producto_with_no_valid_id():
    id = 1

    result = await delete_product(id)
    assert result == {'message': 'No se encontró el producto de id: 1'}

@pytest.mark.asyncio
async def test_get_producto_id_with_valid_data():
    id = 43
    result = await get_producto_id(id)

    salida_esperada = [{'id': 43, 'nombre': 'Placas de Petri', 'cantidad_total': 10, 'tipo': 'unidades'},]
    assert result.data == salida_esperada

@pytest.mark.asyncio
async def test_get_producto_nm_with_valid_data():
    nombre = 'Placas de Petri'
    result = await get_producto_nm(nombre)

    salida_esperada = [{'id': 43, 'nombre': 'Placas de Petri', 'cantidad_total': 10, 'tipo': 'unidades'},]
    assert result.data == salida_esperada

@pytest.mark.asyncio
async def test_update_producto_with_valid_data():
    nuevo = ActualizarProducto(cantidad_total = 15)
    id = 56
    result = await update_producto(id, nuevo)
    last_row = result.data[-1]

    salida_esperada = [{'id': 56, 'nombre': 'Fenolftaleína', 'cantidad_total': 15, 'tipo': 'gramos'}]
    assert result.data == salida_esperada

@pytest.mark.asyncio
async def test_update_producto_with_no_valid_id():
    nuevo = ActualizarProducto(cantidad_total = 15)
    id = 1
    with pytest.raises(HTTPException) as exc:
        result = result = await update_producto(id,nuevo)


    assert exc.value.detail == "No se encuentra el producto"
    assert exc.value.status_code == 406