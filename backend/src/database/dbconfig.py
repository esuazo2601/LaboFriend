import os
from dotenv import load_dotenv
from supabase import create_client, Client
from fastapi import HTTPException
from contextlib import contextmanager

# Ruta relativa al archivo .env en la carpeta "database"
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
# Carga las variables de entorno desde el archivo .env
load_dotenv(dotenv_path)

url:str = os.environ.get("SUPABASE_URL")
key:str = os.environ.get("SUPABASE_KEY")

supabase : Client = create_client(url, key)

@contextmanager
async def session():
    session = supabase.create_session()
    try:
        yield session
    except:
        session.rollback()
        raise HTTPException(status_code=404, detail="database error")
    finally:
        session.close()