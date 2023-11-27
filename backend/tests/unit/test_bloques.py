import pytest
from unittest.mock import MagicMock, patch
from src.core.methods import get_blocks, get_block, newblock, delete_block
from src.database.models import Bloque

@pytest.fixture
def mock_table():
    with patch('src.database.dbconfig.supabase.table') as mock:
        yield mock

def test_get_blocks_with_mock_table(mock_table):
    # Configura el comportamiento esperado del mock
    mock_response = MagicMock()
    mock_response.data = [{'id': 1, 'hora_inicio': '09:00', 'hora_fin': '10:00'}]
    mock_table.return_value.select.return_value.execute.return_value = mock_response

    result = get_blocks()
    print(result)
    
    mock_table.return_value.select.assert_called_with(columns=['id', 'hora_inicio', 'hora_fin'])

    assert result == mock_response.data

def atest_get_block(mock_table):
    # Configura el comportamiento esperado del mock
    mock_response = MagicMock()
    mock_table.return_value.select.return_value.eq.return_value.execute.return_value = mock_response

    # Llama al método y verifica los resultados
    result = get_block(1)
    # Asegura que el método select fue llamado con los argumentos esperados
    mock_table.return_value.select.assert_called_with(...)
    mock_table.return_value.select.return_value.eq.assert_called_with('id', 1)

    # Asegura que el resultado de la función es el esperado
    assert result == mock_response

def atest_newblock(mock_table):
    # Configura el comportamiento esperado del mock
    mock_response = MagicMock()
    mock_table.return_value.insert.return_value.execute.return_value = mock_response

    # Crea un objeto Bloque de prueba
    bloque = Bloque(hora_inicio='09:00', hora_fin='10:00')

    # Llama al método y verifica los resultados
    result = newblock(bloque)
    
    # Asegura que el método insert fue llamado con los argumentos esperados
    mock_table.return_value.insert.assert_called_with(...)

    # Asegura que el resultado de la función es el esperado
    assert result == mock_response

def atest_delete_block(mock_table):
    # Configura el comportamiento esperado del mock
    mock_select_response = MagicMock()
    mock_select_response.data = [{'id': 1, 'hora_inicio': '09:00', 'hora_fin': '10:00'}]
    mock_table.return_value.select.return_value.eq.return_value.execute.return_value = mock_select_response

    mock_delete_response = MagicMock()
    mock_table.return_value.delete.return_value.eq.return_value.execute.return_value = mock_delete_response

    # Llama al método y verifica los resultados
    result = delete_block(1)
    
    # Asegura que el método select fue llamado con los argumentos esperados
    mock_table.return_value.select.assert_called_with(...)
    mock_table.return_value.select.return_value.eq.assert_called_with('id', 1)

    # Asegura que el método delete fue llamado con los argumentos esperados
    mock_table.return_value.delete.assert_called_with(...)
    mock_table.return_value.delete.return_value.eq.assert_called_with('id', 1)

    # Asegura que el resultado de la función es el esperado
    assert result == {'message': 'Se elimino el bloque con id: 1'}, mock_delete_response