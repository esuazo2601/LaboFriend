import os
os.environ["ENVIRONMENT"] = "test"
from src.database.dbconfig import supabase
import pytest
from fastapi.exceptions import HTTPException
from src.core.methods import (
    get_users,
    get_user_by_email,
    get_user_scopes,
)

@pytest.mark.asyncio
async def test_get_users():
    result = await get_users()
    salida_esperada =[
        {'email': 'rialgou@gmail.com', 'nombre': 'Richard'},
        {'email': 'gustavoXdPro@udequiano.com', 'nombre': 'Gustavo'},
        {'email': 'richixdpro@gmail.com', 'nombre': 'Richard'}
                      ]
    assert result.data == salida_esperada


@pytest.mark.asyncio
async def test_get_user_by_email():
    email = 'rialgou@gmail.com'
    result = await get_user_by_email(email)
    salida_esperada = [{'email': 'rialgou@gmail.com', 'nombre': 'Richard'}]
    assert result.data == salida_esperada

@pytest.mark.asyncio
async def test_get_user_by_email_with_no_valid_data():
    email = 'emailfalso@gmail.com'
    result = await get_user_by_email(email)
    salida_esperada = {'message': 'No existe usuario con este email'}
    assert result == salida_esperada

@pytest.mark.asyncio
async def test_get_user_scopes():
    email = 'rialgou@gmail.com'
    result = await get_user_scopes(email)
    salida_esperada = ['Estudiante']
    assert result == salida_esperada