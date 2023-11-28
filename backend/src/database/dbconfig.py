import os
from dotenv import load_dotenv
from supabase import create_client, Client

# Ruta relativa al archivo .env en la carpeta "database"
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
# Carga las variables de entorno desde el archivo .env
load_dotenv(dotenv_path)

#URL y key para conectar a la base de datos
url:str = os.environ.get("SUPABASE_URL")
key:str = os.environ.get("SUPABASE_KEY")

supabase : Client = create_client(url, key)