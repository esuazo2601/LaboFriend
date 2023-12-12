import os
os.environ["ENVIRONMENT"] = "test"
from src.database.dbconfig import supabase
from src.database.models import Trabaja
import pytest
from fastapi.exceptions import HTTPException
from src.core.methods import (
    add_trabajando,
    get_trabajando,
    get_trabajando_email,
    delete_trabajando_id,
)

@pytest.mark.asyncio
async def test_get_productos():
    result = await get_trabajando()

    salida_esperada =[
        {'id': 21, 'email_usuario': 'rialgou@gmail.com', 'id_investigacion': 32},
        {'id': 22, 'email_usuario': 'gustavoXdPro@udequiano.com', 'id_investigacion': 34},
        {'id': 23, 'email_usuario': 'rialgou@gmail.com', 'id_investigacion': 36},
        {'id': 24, 'email_usuario': 'gustavoXdPro@udequiano.com', 'id_investigacion': 38},
        {'id': 25, 'email_usuario': 'rialgou@gmail.com', 'id_investigacion': 40}
                      ]
    assert result == salida_esperada

@pytest.mark.asyncio
async def test_add_and_delete_trabajando_with_valid_data():
    trabaja = Trabaja(email_usuario='gustavoXdPro@udequiano.com', id_investigacion=31)
    result_add_trabaja = await add_trabajando(trabaja)
    last_row = result_add_trabaja.data[-1]
    last_row_id = last_row['id']
    result_delete_trabajando = await delete_trabajando_id(last_row_id)
    print(result_delete_trabajando )
    assert last_row['email_usuario'] == 'gustavoXdPro@udequiano.com'
    assert last_row['id_investigacion'] == 31



@pytest.mark.asyncio
async def test_delete_trabajando_with_no_valid_id():
    id = 1
    result = await delete_trabajando_id(id)
    assert result == {'message': 'No se encontró la relacion Trabaja de id: 1'}


@pytest.mark.asyncio
async def test_get_producto_email_with_valid_data():
    email = 'gustavoXdPro@udequiano.com'
    result = await get_trabajando_email(email)
    salida_esperada = [
        {'id_investigacion': 34},
        {'id_investigacion': 38}
                       ]
    assert result == salida_esperada


@pytest.mark.asyncio
async def test_get_producto_email_with_no_valid_data():
    email = 'emailfalso123@gmail.com'
    result = await get_trabajando_email(email)
    salida_esperada = {'message':f'el usuario emailfalso123@gmail.com no tiene investigaciones'}
    assert result == salida_esperada