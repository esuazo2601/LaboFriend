import os
os.environ["ENVIRONMENT"] = "test"
from src.database.dbconfig import supabase
from src.database.models import Microorganismo, ActualizarMicroorganismo
import pytest
from fastapi.exceptions import HTTPException
from src.core.methods import (
    add_microorg,
    get_all_microorg,
    delete_microorg,
    get_microorg_cm,
    get_microorg_cin,
    update_microorg
)

@pytest.mark.asyncio
async def test_get_all_microorg():
    result = await get_all_microorg()
    salida_esperada = [
        {'id': 40, 'nombre_cientifico': 'Aspergillus niger', 'nombre_comun': 'Aspergillus niger', 'procedencia': 'testing', 'detalles': 'detalles de test'}, 
        {'id': 31, 'nombre_cientifico': 'Agrobacterium tumefaciens', 'nombre_comun': 'Agrobacteria', 'procedencia': 'Suelo', 'detalles': 'Utilizado para transferencia de genes en ingeniería genética vegetal.'},
        {'id': 32, 'nombre_cientifico': 'Rhizobium leguminosarum', 'nombre_comun': 'Rhizobium', 'procedencia': 'Raíces de leguminosas', 'detalles': 'Forma simbiosis con las raíces de plantas leguminosas y fija nitrógeno.'},
        {'id': 33, 'nombre_cientifico': 'Pseudomonas fluorescens', 'nombre_comun': 'Pseudomonas', 'procedencia': 'Suelo', 'detalles': 'Actúa como antagonista contra patógenos de plantas.'},
        {'id': 34, 'nombre_cientifico': 'Saccharomyces cerevisiae', 'nombre_comun': 'Levadura de panadería', 'procedencia': 'Ambiente natural', 'detalles': 'Se utiliza en biotecnología para la producción de etanol y levaduras.'},
        {'id': 35, 'nombre_cientifico': 'Trichoderma harzianum', 'nombre_comun': 'Trichoderma', 'procedencia': 'Suelo', 'detalles': 'Hongo utilizado como agente de control biológico contra patógenos de plantas.'},
        {'id': 36, 'nombre_cientifico': 'Azospirillum brasilense', 'nombre_comun': 'Azospirillum', 'procedencia': 'Raíces de plantas', 'detalles': 'Bacteria que promueve el crecimiento de las plantas.'},
        {'id': 37, 'nombre_cientifico': 'Bacillus thuringiensis', 'nombre_comun': 'Bacillus thuringiensis', 'procedencia': 'Suelo', 'detalles': 'Produce toxinas que son usadas en bioinsecticidas.'},
        {'id': 38, 'nombre_cientifico': 'Mycobacterium vaccae', 'nombre_comun': 'Mycobacterium', 'procedencia': 'Suelo', 'detalles': 'Puede tener efectos beneficiosos en la salud de las plantas y animales.'},
        {'id': 39, 'nombre_cientifico': 'Escherichia coli', 'nombre_comun': 'E. coli', 'procedencia': 'Intestinos de mamíferos', 'detalles': 'Ampliamente utilizado en la investigación biotecnológica y producción de proteínas recombinantes.'},        
        ]
    assert result.data == salida_esperada

@pytest.mark.asyncio
async def test_new_and_delete_microorg_with_valid_data():
    microorganismo = Microorganismo(nombre_cientifico= "testeus_primerus" , nombre_comun= "test1", procedencia= "un test", detalles="pequeño test de ejemplo muy bonito")
    result_add_microorg = await add_microorg(microorganismo)
    last_row = result_add_microorg.data[-1]
    last_row_id = last_row['id']
    result_delete_block = await delete_microorg(last_row_id)
    last_last_row = result_delete_block.data[-1]


    assert last_row['nombre_cientifico'] == 'testeus_primerus'
    assert last_last_row['nombre_cientifico'] == 'testeus_primerus'


@pytest.mark.asyncio
async def test_delete_microorg_with_no_valid_id():
    id = 1

    result = await delete_microorg(id)
    assert result == {'message': 'No se encontró microorganismo de id: 1'}


@pytest.mark.asyncio
async def test_get_microorg_cm_with_valid_cm():
    nombre_comun = 'Agrobacteria'
    result = await get_microorg_cm(nombre_comun)
    salida_esperada = [
        {'id': 31, 'nombre_cientifico': 'Agrobacterium tumefaciens', 'nombre_comun': 'Agrobacteria', 'procedencia': 'Suelo', 'detalles': 'Utilizado para transferencia de genes en ingeniería genética vegetal.'},
        ]
    assert result.data == salida_esperada

@pytest.mark.asyncio
async def test_get_microorg_cin_with_valid_cin():
    nombre_cientifico = 'Agrobacterium tumefaciens'
    result = await get_microorg_cin(nombre_cientifico)
    salida_esperada = [
        {'id': 31, 'nombre_cientifico': 'Agrobacterium tumefaciens', 'nombre_comun': 'Agrobacteria', 'procedencia': 'Suelo', 'detalles': 'Utilizado para transferencia de genes en ingeniería genética vegetal.'},
        ]
    assert result.data == salida_esperada

@pytest.mark.asyncio
async def test_get_microorg_cm_with_no_valid_cm():
    nombre_comun = 'test1'
    result = await get_microorg_cm(nombre_comun)
    salida_esperada = []
    assert result.data == salida_esperada

@pytest.mark.asyncio
async def test_get_microorg_cin_with_no_valid_cin():
    nombre_cientifico = 'testeus_primerus'
    result = await get_microorg_cin(nombre_cientifico)
    salida_esperada = []
    assert result.data == salida_esperada

@pytest.mark.asyncio
async def test_update_microorg_with_valid_data():
    nuevo = ActualizarMicroorganismo(procedencia= "testing", detalles= "detalles de test")
    salida_esperada = [{'id': 40, 'nombre_cientifico': 'Aspergillus niger', 'nombre_comun': 'Aspergillus niger', 'procedencia': 'testing', 'detalles': 'detalles de test'}] 
    result = await update_microorg(id = 40, nuevo = nuevo )
    assert result.data == salida_esperada


@pytest.mark.asyncio
async def test_update_microorg_with_no_data():
    nuevo = ActualizarMicroorganismo()
    with pytest.raises(HTTPException) as exc:
        result = await update_microorg(id = 40, nuevo = nuevo)
    assert exc.value.detail == 'No se especifica que se cambia'
    assert exc.value.status_code == 406