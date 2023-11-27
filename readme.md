# Repo de LabControl proyecto informático 2023 
## Integrantes:

# Backend
* Richard González
* Esteban Suazo
* Martín Molina

# Frontend
* Elizabeth Bravo 
* Gustavo Gonzalez
* Marcelo Peña
* Romina Zurita 

# Instrucciones de ejecución backend:
1. Crear un entorno virtual e instalar el gestor de dependencias Poetry:
```
pip install virtualenv
python -m venv venv
cd venv
./Scripts/activate
pip install poetry
```
2. Ubicarse en la carpeta /backend y ejecutar:
```
poetry install
``` 
y posteriormente:
```
uvicorn src.api.app:app --reload
```
# Instrucciones de ejecución frontend:
1. Tener instalado node y npm
2. Moverse a la carpeta /frontend
3. Ejecutar npm install
4. Ejecutar npm start con el proyecto de backend previamente en ejecución
