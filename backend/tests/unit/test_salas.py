import pytest
#from backend.src.core.methods import Sala, new_room, get_rooms, delete_room, HTTPException
from unittest.mock import MagicMock, patch
from src.core.methods import Sala, new_room, get_rooms, delete_room, HTTPException

@pytest.fixture
def mock_supabase_table():
    with patch('backend.src.database.dbconfig.supabase.table') as mock_table:
        yield mock_table

def test_new_room(mock_supabase_table):
    # Configura el comportamiento esperado del mock
    mock_response = MagicMock()
    mock_supabase_table.return_value.insert.return_value.execute.return_value = mock_response

    # Crea un objeto Sala de prueba
    sala = Sala(capacidad=50, nombre='Sala A')

    # Llama al método y verifica los resultados
    result = new_room(sala)
    assert result == mock_response

def test_get_rooms(mock_supabase_table):
    # Configura el comportamiento esperado del mock
    mock_response = MagicMock()
    mock_supabase_table.return_value.select.return_value.execute.return_value = mock_response

    # Llama al método y verifica los resultados
    result = get_rooms()
    assert result == mock_response

def test_delete_room(mock_supabase_table):
    # Configura el comportamiento esperado del mock
    mock_select_response = MagicMock()
    mock_select_response.data = [{'nombre': 'Sala A', 'capacidad': 50}]
    mock_supabase_table.return_value.select.return_value.eq.return_value.execute.return_value = mock_select_response

    mock_delete_response = MagicMock()
    mock_supabase_table.return_value.delete.return_value.eq.return_value.execute.return_value = mock_delete_response

    # Llama al método y verifica los resultados
    result = delete_room('Sala A')
    assert result == {'message': 'Sala con nombre: Sala A fue borrada'}

def test_delete_room_not_found(mock_supabase_table):
    # Configura el comportamiento esperado del mock
    mock_response = MagicMock()
    mock_response.data = []  # Sala no encontrada
    mock_supabase_table.return_value.select.return_value.eq.return_value.execute.return_value = mock_response

    # Llama al método y verifica que se lanza la excepción esperada
    with pytest.raises(HTTPException) as context:
        delete_room('Sala B')

    assert context.value.status_code == 404
    assert str(context.value.detail) == 'No se encuentra la sala con este nombre'

def test_new_room_exception(mock_supabase_table):
    # Configura el comportamiento esperado del mock para lanzar una excepción
    mock_supabase_table.return_value.insert.return_value.execute.side_effect = Exception("Test exception")

    # Crea un objeto Sala de prueba
    sala = Sala(capacidad=50, nombre='Sala A')

    # Llama al método y verifica que se lanza la excepción esperada
    with pytest.raises(HTTPException) as context:
        new_room(sala)

    assert context.value.status_code == 500
    assert str(context.value.detail) == 'Test exception'