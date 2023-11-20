import pytest
from unittest.mock import MagicMock, patch
from src.core.methods import Bloque, get_blocks, get_block, newblock, delete_block

@pytest.fixture
def mock_table():
    with patch('src.database.dbconfig.supabase.table') as mock:
        yield mock

def test_get_blocks(mock_table):
    # Configura el comportamiento esperado del mock
    mock_response = MagicMock()
    mock_response.data = [{'id': 1, 'hora_inicio': '09:00', 'hora_fin': '10:00'}]
    mock_table.return_value.select.return_value.execute.return_value = mock_response

    # Llama al método y verifica los resultados
    result = get_blocks()
    assert result == mock_response.data

def test_get_block(mock_table):
    # Configura el comportamiento esperado del mock
    mock_response = MagicMock()
    mock_table.return_value.select.return_value.eq.return_value.execute.return_value = mock_response

    # Llama al método y verifica los resultados
    result = get_block(1)
    assert result == mock_response

def test_newblock(mock_table):
    # Configura el comportamiento esperado del mock
    mock_response = MagicMock()
    mock_table.return_value.insert.return_value.execute.return_value = mock_response

    # Crea un objeto Bloque de prueba
    bloque = Bloque(hora_inicio='09:00', hora_fin='10:00')

    # Llama al método y verifica los resultados
    result = newblock(bloque)
    assert result == mock_response

def test_delete_block(mock_table):
    # Configura el comportamiento esperado del mock
    mock_select_response = MagicMock()
    mock_select_response.data = [{'id': 1, 'hora_inicio': '09:00', 'hora_fin': '10:00'}]
    mock_table.return_value.select.return_value.eq.return_value.execute.return_value = mock_select_response

    mock_delete_response = MagicMock()
    mock_table.return_value.delete.return_value.eq.return_value.execute.return_value = mock_delete_response

    # Llama al método y verifica los resultados
    result = delete_block(1)
    assert result == {'message': 'Se elimino el bloque con id: 1'}, mock_delete_response