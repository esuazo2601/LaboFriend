import os
os.environ["ENVIRONMENT"] = "test"
from src.database.dbconfig import supabase
from src.database.models import Investigacion
import pytest
from fastapi.exceptions import HTTPException
from src.core.methods import (
    add_investigacion,
    get_all_investigaciones,
    get_investigacion_id,
    get_investigacion_nm,
    get_investigacion_date,
    delete_inv,
)

@pytest.mark.asyncio
async def test_get_all_investigaciones():
    result = await get_all_investigaciones()

    salida_esperada = [
        {'id': 31, 'titulo': 'Estudio de expresión génica en plantas de tomate', 'descripcion': 'Investigación sobre los mecanismos moleculares que regulan la expresión génica durante el desarrollo de las plantas de tomate.', 'fecha': '2023-01-15T00:00:00'},
        {'id': 32, 'titulo': 'Análisis de resistencia a plagas en cultivos de maíz', 'descripcion': 'Investigación para identificar genes responsables de la resistencia a plagas en variedades de maíz y su aplicación en la agricultura sostenible.', 'fecha': '2023-02-20T00:00:00'},
        {'id': 33, 'titulo': 'Desarrollo de vacunas vegetales contra enfermedades fúngicas', 'descripcion': 'Investigación enfocada en el diseño y evaluación de vacunas vegetales para prevenir enfermedades fúngicas en cultivos de hortalizas.', 'fecha': '2023-03-25T00:00:00'},
        {'id': 34, 'titulo': 'Efecto de microorganismos en la promoción de crecimiento en arroz', 'descripcion': 'Investigación para comprender cómo ciertos microorganismos benefician el crecimiento de las plantas de arroz y su aplicación en la agricultura.', 'fecha': '2023-04-30T00:00:00'},
        {'id': 35, 'titulo': 'Optimización de la producción de enzimas celulolíticas', 'descripcion': 'Investigación para mejorar la producción de enzimas celulolíticas mediante técnicas de ingeniería genética para su aplicación en la industria bioenergética.', 'fecha': '2023-05-05T00:00:00'},
        {'id': 36, 'titulo': 'Estudio de la interacción planta-microorganismo en simbiosis', 'descripcion': 'Investigación centrada en la comprensión de las interacciones entre plantas y microorganismos simbióticos, con implicaciones en la salud de las plantas.', 'fecha': '2023-06-10T00:00:00'},
        {'id': 37, 'titulo': 'Desarrollo de cultivos hidropónicos de alta eficiencia', 'descripcion': 'Investigación sobre la optimización de sistemas de cultivo hidropónico para mejorar la eficiencia en el uso de recursos y la producción de alimentos.', 'fecha': '2023-07-15T00:00:00'},
        {'id': 38, 'titulo': 'Evaluación de impacto ambiental de técnicas biotecnológicas', 'descripcion': 'Investigación que analiza los efectos ambientales de diversas técnicas biotecnológicas utilizadas en la agricultura moderna.', 'fecha': '2023-08-20T00:00:00'},
        {'id': 39, 'titulo': 'Identificación de genes de resistencia a sequía en trigo', 'descripcion': 'Investigación para identificar y caracterizar genes de resistencia a la sequía en variedades de trigo con el objetivo de mejorar la tolerancia al estrés hídrico.', 'fecha': '2023-09-25T00:00:00'},
        {'id': 40, 'titulo': 'Desarrollo de cultivos transgénicos resistentes a herbicidas', 'descripcion': 'Investigación para diseñar cultivos transgénicos capaces de resistir herbicidas comunes, con el fin de facilitar la gestión de malezas en la agricultura.', 'fecha': '2023-10-30T00:00:00'}
                       ]
    assert result.data == salida_esperada

@pytest.mark.asyncio
async def test_add_and_delete_investigacion_with_valid_data():
    investigacion = Investigacion(titulo="testeo1", descripcion="primera investigacion de test", fecha="2023-09-25T00:00:00")
    result_add_investigacion = await add_investigacion(investigacion)
    last_row = result_add_investigacion.data[-1]
    last_row_id = last_row['id']
    result_delete_block = await delete_inv(last_row_id)

    assert last_row['titulo'] == 'testeo1'
    assert last_row['descripcion'] == 'primera investigacion de test'


@pytest.mark.asyncio
async def test_delete_investigacion_with_no_valid_id():
    id = 1

    result = await delete_inv(id)
    assert result == {'message': 'No se encontró la investigación de id: 1'}

@pytest.mark.asyncio
async def test_get_investigacion_id_with_valid_data():
    id = 31
    result = await get_investigacion_id(id)

    salida_esperada = [{'id': 31, 'titulo': 'Estudio de expresión génica en plantas de tomate', 'descripcion': 'Investigación sobre los mecanismos moleculares que regulan la expresión génica durante el desarrollo de las plantas de tomate.', 'fecha': '2023-01-15T00:00:00'},]
    assert result.data == salida_esperada

@pytest.mark.asyncio
async def test_get_investigacion_nm_with_valid_data():
    titulo = 'Estudio de expresión génica en plantas de tomate'
    result = await get_investigacion_nm(titulo)

    salida_esperada = [{'id': 31, 'titulo': 'Estudio de expresión génica en plantas de tomate', 'descripcion': 'Investigación sobre los mecanismos moleculares que regulan la expresión génica durante el desarrollo de las plantas de tomate.', 'fecha': '2023-01-15T00:00:00'},]
    assert result.data == salida_esperada

@pytest.mark.asyncio
async def test_get_investigacion_date_with_valid_data():
    date = '2023-01-15'
    result = await get_investigacion_date(date)

    salida_esperada = [{'id': 31, 'titulo': 'Estudio de expresión génica en plantas de tomate', 'descripcion': 'Investigación sobre los mecanismos moleculares que regulan la expresión génica durante el desarrollo de las plantas de tomate.', 'fecha': '2023-01-15T00:00:00'},]
    assert result.data == salida_esperada

