import os
os.environ["ENVIRONMENT"] = "test"
from src.database.dbconfig import supabase
from src.database.models import Bloque 
import pytest
from fastapi.exceptions import HTTPException
from src.core.methods import (
    get_blocks,
    get_block,
    newblock,
    delete_block,

)



@pytest.mark.asyncio
async def test_get_blocks():
    result = await get_blocks()

    salida_esperada = [
        {'id': 61, 'hora_inicio': '08:15:00', 'hora_fin': '09:00:00'},
        {'id': 62, 'hora_inicio': '09:15:00', 'hora_fin': '10:00:00'},
        {'id': 63, 'hora_inicio': '10:15:00', 'hora_fin': '11:00:00'},
        {'id': 64, 'hora_inicio': '11:15:00', 'hora_fin': '12:00:00'},
        {'id': 65, 'hora_inicio': '12:15:00', 'hora_fin': '13:00:00'},
        {'id': 66, 'hora_inicio': '13:15:00', 'hora_fin': '14:00:00'}, 
        {'id': 67, 'hora_inicio': '14:15:00', 'hora_fin': '15:00:00'}, 
        {'id': 68, 'hora_inicio': '15:15:00', 'hora_fin': '16:00:00'}, 
        {'id': 69, 'hora_inicio': '16:15:00', 'hora_fin': '17:00:00'}, 
        {'id': 70, 'hora_inicio': '17:15:00', 'hora_fin': '18:00:00'}
        ]
    assert result == salida_esperada


@pytest.mark.asyncio
async def test_get_block_with_valid_id():
    bloque_id = "61"
    result = await get_block(bloque_id)

    salida_esperada = [
        {'id': 61, 'hora_inicio': '08:15:00', 'hora_fin': '09:00:00'}
        ]
    
    assert result.data == salida_esperada


@pytest.mark.asyncio
async def test_get_block_with_no_valid_id():
    bloque_id = "a"

    with pytest.raises(HTTPException) as exc:
        result = result = await get_block(bloque_id)
    assert exc.value.detail == "database block error"
    assert exc.value.status_code == 400

@pytest.mark.asyncio
async def test_new_and_delete_block_with_valid_data():
    bloque = Bloque(hora_inicio="18:00:00", hora_fin="18:45:00")
    result_new_block = await newblock(bloque)
    last_row = result_new_block.data[-1]
    last_row_id = last_row['id']
    mensaje, result_delete_block = await delete_block(last_row_id)
    last_last_row = result_delete_block.data[-1]

    assert last_row['hora_inicio'] == '18:00:00'
    assert last_row['hora_fin'] == '18:45:00'
    assert last_last_row['hora_inicio'] == '18:00:00'
    assert last_last_row['hora_fin'] == '18:45:00'

@pytest.mark.asyncio
async def test_delete_block_with_no_valid_id():
    bloque_id = "a"

    with pytest.raises(HTTPException) as exc:
        result = result = await delete_block(bloque_id)
    assert exc.value.detail == "database deleteblock error"
    assert exc.value.status_code == 400
