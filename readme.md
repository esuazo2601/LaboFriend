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


## Instrucciones de Deploy

# Frontend:
    El despliegue fue realizado en Vercel, las instrucciones son las siguientes:
    
1. Crearse una cuenta en vercel
2. Incluir el repositorio (idealmente hacer un fork)
3. Cambiar la carpeta raíz a "frontend"
4. Comandos de instalación: 
```
npm install
```
5. Comando de build:
```
npm run build
```
6. Entrar al link que proporciona Vercel para ver la aplicación desplegada

# Backend:

* El despliegue fue realizado en render.com, se debe desplegar como Web Service
1. Seleccionar la opcion de docker e incluir el siguiente repo: 
```
did02601/labo_friend_backend:0.0.7
```
2. Se deben incluir las variables de entorno .env (son secretos)
3. El docker contendrá las instrucciones para arrancar el proyecto, por lo que no hace falta configurar nada.

# Ejemplos desplegados:
* Frontend:
```
https://labo-friend.vercel.app/
```
* Backend:
```
https://labo-friend-backend.onrender.com/
```