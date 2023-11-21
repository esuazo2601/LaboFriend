import os
import sys

from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from fastapi.logger import logger
from prometheus_fastapi_instrumentator import Instrumentator
from .routers import bloques, investigaciones, microorganismos, productos, salas, usuarios, trabajando, agenda, incidencia, producto_en_sala
from pydantic_settings import BaseSettings

# class Settings(BaseSettings):
#     BASE_URL:str = "http://localhost:8000"
#     USE_NGROK:bool = os.environ.get("USE_NGROK", "False") == "True"#True


# settings = Settings()

# def init_webhooks(base_url):
#     # Update inbound traffic via APIs to use the public-facing ngrok URL
#     pass

# Initialize the FastAPI app for a simple web server
app = FastAPI()

# if settings.USE_NGROK:
#     # pyngrok should only ever be installed or initialized in a dev environment when this flag is set
#     from pyngrok import ngrok

#     # Get the dev server port (defaults to 8000 for Uvicorn, can be overridden with `--port`
#     # when starting the server
#     port = sys.argv[sys.argv.index("--port") + 1] if "--port" in sys.argv else "8000"

#     # Open a ngrok tunnel to the dev server
#     public_url = ngrok.connect(port).public_url
#     logger.info("ngrok tunnel \"{}\" -> \"http://127.0.0.1:{}\"".format(public_url, port))

#     # Update any base URLs or webhooks to use the public ngrok URL
#     settings.BASE_URL = public_url
#     init_webhooks(public_url)

# # ... Initialize routers and the rest of our app


app = FastAPI()
app.include_router(investigaciones.router)
app.include_router(bloques.router)
app.include_router(microorganismos.router)
app.include_router(productos.router)
app.include_router(salas.router)
app.include_router(usuarios.router)
app.include_router(trabajando.router)
app.include_router(agenda.router)
app.include_router(incidencia.router)
app.include_router(producto_en_sala.router)
instrumentator = Instrumentator().instrument(app)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def _startup():
    instrumentator.expose(app)
