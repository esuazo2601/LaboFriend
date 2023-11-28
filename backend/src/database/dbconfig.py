import os
from dotenv import load_dotenv
from supabase import create_client, Client

# Ruta relativa al archivo .env en la carpeta "database"
#dotenv_path = os.getenv("SUPABASE_URL")
# Carga las variables de entorno desde el archivo .env
#load_dotenv(dotenv_path)

url:str = os.getenv("SUPABASE_URL")
key:str = os.getenv("SUPABASE_KEY")

supabase : Client = create_client(url, key)