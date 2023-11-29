import os
os.environ["ENVIRONMENT"] = "test"
from src.database.dbconfig import supabase
from src.database.models import CheckAgenda, Agenda
import pytest
from fastapi.exceptions import HTTPException
from src.core.methods import (
    get_agendamiento,
    check_availability,
    new_agendamiento,
    delete_agendamiento,
)

@pytest.mark.asyncio
async def test_get_agendamiento():
    email = 'gustavoXdPro@udequiano.com'
    result = await get_agendamiento(email)
    salida_esperada =[
        {'id': 5, 'fecha': '2023-11-28', 'email_estudiante': 'gustavoXdPro@udequiano.com', 'id_sala': 4, 'id_bloque': 64}
                      ]
    assert result.data == salida_esperada

@pytest.mark.asyncio
async def test_add_and_delete_agendamiento_with_valid_data():
    agendamiento = Agenda(email_estudiante='rialgou@gmail.com', id_sala=4, id_bloque=61, fecha= '2023-11-28')
    result_add_agendamiento = await new_agendamiento(agendamiento)
    last_row = result_add_agendamiento.data[-1]
    last_row_id = last_row['id']
    result_delete_agendamiento = await delete_agendamiento(last_row_id)
    assert last_row['email_estudiante'] == 'rialgou@gmail.com'
    assert last_row['id_sala'] == 4



@pytest.mark.asyncio
async def test_delete_agendamiento_with_no_valid_id():
    id = 1
    result = await delete_agendamiento(id)
    assert result == {'message': 'No se encontró agendamiento con id: 1'}


@pytest.mark.asyncio #test con problemas, revisar bien ya que depende de available_list y esos id son variables.
async def atest_check_availability():
    agenda = CheckAgenda(id_sala = 4, fecha = '2023-11-28')
    result = await check_availability(agenda)
    salida_esperada = {'available_blocks': [61, 62, 63, 65, 66, 67, 68, 69, 70]}
    assert result == salida_esperada


