import os
os.environ["ENVIRONMENT"] = "test"
from src.database.dbconfig import supabase
from src.database.models import Equipo
import pytest
from fastapi.exceptions import HTTPException
from src.core.methods import (
    upsert_equipo,
    get_equipo_nm,
    get_equipo_id,
    get_equipos,
    delete_equipo
)

@pytest.mark.asyncio
async def test_get_equipos():
    result = await get_equipos()

    salida_esperada =[
        {'id': 103, 'nombre': 'Congelador', 'fecha_mantencion': '2023-11-16', 'descripcion': 'Ideal para cultivo de microorganismos', 'id_sala': 4},
        {'id': 104, 'nombre': 'Campana', 'fecha_mantencion': '2023-11-27', 'descripcion': 'Es para el vacio', 'id_sala': 4},
        {'id': 105, 'nombre': 'Campana de Flujo Laminar', 'fecha_mantencion': '2023-01-10', 'descripcion': 'Garantiza un entorno libre de partículas para trabajos microbiológicos.', 'id_sala': 4},
        {'id': 106, 'nombre': 'Mechero Bunsen', 'fecha_mantencion': '2023-02-15', 'descripcion': 'Utilizado para proporcionar una llama controlada en experimentos de laboratorio.', 'id_sala': 4},
        {'id': 107, 'nombre': 'Microscopio de Fluorescencia', 'fecha_mantencion': '2023-03-20', 'descripcion': 'Permite la observación de muestras a nivel microscópico mediante fluorescencia.', 'id_sala': 4},
        {'id': 108, 'nombre': 'Centrífuga de Alta Velocidad', 'fecha_mantencion': '2023-04-25', 'descripcion': 'Utilizada para separar componentes celulares o de laboratorio a través de la centrifugación.', 'id_sala': 4},
        {'id': 109, 'nombre': 'PCR Termociclador', 'fecha_mantencion': '2023-05-30', 'descripcion': 'Instrumento para realizar la reacción en cadena de la polimerasa (PCR).', 'id_sala': 4},
        {'id': 110, 'nombre': 'Incubadora de Cultivo Celular', 'fecha_mantencion': '2023-06-05', 'descripcion': 'Proporciona condiciones controladas para el crecimiento de células y microorganismos.', 'id_sala': 4},
        {'id': 111, 'nombre': 'Espectrofotómetro UV-Vis', 'fecha_mantencion': '2023-07-10', 'descripcion': 'Se utiliza para medir la absorbancia y transmitancia de sustancias en función de la longitud de onda.', 'id_sala': 4},
        {'id': 112, 'nombre': 'Agitador Magnético con Calefacción', 'fecha_mantencion': '2023-08-15', 'descripcion': 'Mezcla y calienta soluciones mediante agitación magnética.', 'id_sala': 4},
        {'id': 113, 'nombre': 'Electroforesis de Gel', 'fecha_mantencion': '2023-09-20', 'descripcion': 'Se utiliza para separar y analizar moléculas de ADN, ARN y proteínas.', 'id_sala': 4},
        {'id': 114, 'nombre': 'Liofilizador', 'fecha_mantencion': '2023-10-25', 'descripcion': 'Equipo para la deshidratación de muestras mediante congelación y sublimación.', 'id_sala': 4},
        {'id': 115, 'nombre': 'Microscopio Electrónico de Transmisión', 'fecha_mantencion': '2023-11-30', 'descripcion': 'Ofrece una alta resolución para la observación detallada de estructuras celulares y moleculares.', 'id_sala': 4}
                      ]
    assert result.data == salida_esperada

@pytest.mark.asyncio
async def test_add_and_delete_equipo_with_valid_data():
    equipo = Equipo(nombre = 'equipotest1', fecha_mantencion='2023-11-28', descripcion= 'testeooo', id_sala= 4)
    result_add_equipo = await upsert_equipo(equipo)
    last_row = result_add_equipo.data[-1]
    last_row_id = last_row['id']
    result_delete_equipo = await delete_equipo(last_row_id)
    assert last_row['nombre'] == 'equipotest1'
    assert last_row['descripcion'] == 'testeooo'


@pytest.mark.asyncio
async def test_delete_equipo_with_no_valid_id():
    id = 1
    result = await delete_equipo(id)
    assert result == {'message': 'No se encontró el producto de id: 1'}


@pytest.mark.asyncio
async def test_get_equipo_id():
    id = 103
    result = await get_equipo_id(id)
    salida_esperada = [{'id': 103, 'nombre': 'Congelador', 'fecha_mantencion': '2023-11-16', 'descripcion': 'Ideal para cultivo de microorganismos', 'id_sala': 4},]
    assert result.data == salida_esperada

@pytest.mark.asyncio
async def test_get_equipo_nm():
    nombre = 'Congelador'
    result = await get_equipo_nm(nombre)
    salida_esperada = [{'id': 103, 'nombre': 'Congelador', 'fecha_mantencion': '2023-11-16', 'descripcion': 'Ideal para cultivo de microorganismos', 'id_sala': 4},]
    assert result.data == salida_esperada
