from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from prometheus_fastapi_instrumentator import Instrumentator
from .routers import bloques, investigaciones, microorganismos, productos, salas, usuarios



app = FastAPI()
app.include_router(investigaciones.router)
app.include_router(bloques.router)
app.include_router(microorganismos.router)
app.include_router(productos.router)
app.include_router(salas.router)
app.include_router(usuarios.router)
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
