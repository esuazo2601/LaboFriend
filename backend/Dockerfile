# Usa una imagen base de Python
FROM python:3.11

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el código al contenedor
COPY requirements.txt .

# Instala las dependencias, incluyendo uvicorn
RUN pip install --no-cache-dir -r requirements.txt
# Expone el puerto en el que la aplicación se ejecutará

COPY . .

EXPOSE 8000
# Comando para ejecutar la aplicación
CMD ["uvicorn", "src.api.app:app", "--host", "0.0.0.0", "--port", "8000"]
