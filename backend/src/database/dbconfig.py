import os
from dotenv import load_dotenv
from supabase import create_client, Client

#URL y key para conectar a la base de datos
url:str = os.getenv("SUPABASE_URL")
key:str = os.getenv("SUPABASE_KEY")

supabase : Client = create_client(url, key)