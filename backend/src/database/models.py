from pydantic import BaseModel
class Bloque(BaseModel):
    id:int
    hora_inicio: str
    hora_fin: str

class Producto(BaseModel):
    nombre: str
    cantidad_total: int
    tipo: str
