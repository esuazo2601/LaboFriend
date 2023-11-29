import os
from dotenv import load_dotenv
from supabase import create_client, Client

# Ruta relativa al archivo .env en la carpeta "database"
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
# Carga las variables de entorno desde el archivo .env
load_dotenv(dotenv_path)

# Obtener el entorno actual (por defecto, establecerlo en "development" si no está definido)
environment = os.environ.get("ENVIRONMENT", "development")

url:str = os.environ.get("SUPABASE_URL")
key:str = os.environ.get("SUPABASE_KEY")



# Ajustar la configuración según el entorno
if environment == "test":
    url = os.environ.get("TEST_SUPABASE_URL")
    key = os.environ.get("TEST_SUPABASE_KEY")
else:
    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_KEY")


# Crear cliente de Supabase
supabase: Client = create_client(url, key)