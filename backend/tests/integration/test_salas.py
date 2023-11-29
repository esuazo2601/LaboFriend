import os
os.environ["ENVIRONMENT"] = "test"
from src.database.dbconfig import supabase
from src.database.models import Sala
import pytest
from fastapi.exceptions import HTTPException
from src.core.methods import (
    new_room,
    get_rooms,
    delete_room
)

@pytest.mark.asyncio
async def test_get_rooms():
    result = await get_rooms()

    salida_esperada = [{'id': 4, 'capacidad': 1, 'nombre': 'Sala 1'}]
    assert result.data == salida_esperada

@pytest.mark.asyncio
async def test_new_and_delete_sala_with_valid_data():
    sala = Sala(capacidad=50 ,nombre="sala_test")
    result_new_room = await new_room(sala)
    last_row = result_new_room.data[-1]
    last_row_name = last_row['nombre']
    result_delete_block = await delete_room(last_row_name)


    assert last_row['capacidad'] == 50
    assert last_row['nombre'] == 'sala_test'
    assert result_delete_block == {'message': 'Sala con nombre: sala_test fue borrada'}

@pytest.mark.asyncio
async def test_delete_room_with_no_valid_id():
    sala_nombre = "a"

    with pytest.raises(HTTPException) as exc:
        result = await delete_room(sala_nombre)
    assert exc.value.detail == 'No se encuentra la sala con este nombre'
    assert exc.value.status_code == 500