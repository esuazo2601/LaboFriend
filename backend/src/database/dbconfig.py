import os
from dotenv import load_dotenv
from supabase import create_client, Client

# Ruta relativa al archivo .env en la carpeta "database"
dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
# Carga las variables de entorno desde el archivo .env
load_dotenv(dotenv_path)

# Obtener el entorno actual (por defecto, establecerlo en "development" si no está definido)
url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")

# Crear cliente de Supabase
supabase: Client = create_client(url, key)
