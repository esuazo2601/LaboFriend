import os
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from prometheus_fastapi_instrumentator import Instrumentator
from routes import router

app = FastAPI()
instrumentator = Instrumentator().instrument(app)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.on_event("startup")
async def _startup():
    instrumentator.expose(app)
