import os
from dotenv import load_dotenv
from supabase import create_client, Client

# Ruta relativa al archivo .env en la carpeta "database"
dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
# Carga las variables de entorno desde el archivo .env
load_dotenv(dotenv_path)

# Obtener el entorno actual (por defecto, establecerlo en "development" si no está definido)
environment = os.environ.get("ENVIRONMENT", "development")

# Ajustar la configuración según el entorno
if environment == "test":
    url: str = os.environ.get("SUPABASE_TEST_URL")
    key: str = os.environ.get("SUPABASE_TEST_KEY")
else:
    url: str = os.environ.get("SUPABASE_URL")
    key: str = os.environ.get("SUPABASE_KEY")

print(url)
print(key)


# Crear cliente de Supabase
supabase: Client = create_client(url, key)
