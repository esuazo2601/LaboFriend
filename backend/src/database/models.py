from typing import Optional
from pydantic import BaseModel

class Bloque(BaseModel):
    id: Optional[int] = None
    hora_inicio: str
    hora_fin: str

class Producto(BaseModel):
    id: Optional[int] = None
    nombre: str
    cantidad_total: int
    tipo: str

class Agenda(BaseModel):
    id: Optional[int] = None
    id_estudiante: int
    id_sala: int
    id_bloque: int
    fecha: str

class Equipo(BaseModel):
    id: Optional[int] = None
    fecha_mantencion: str
    nombre: str
    id_sala: int
    descripcion: str

class Incidencia(BaseModel):
    id: Optional[int] = None
    observacion: str
    fecha: str
    id_investigacion: int

class Inv_microorganismo(BaseModel):
    id_investigacion: int
    id_microorganismo: int

class Investigacion(BaseModel):
    id: Optional[int] = None
    descripcion: str
    titulo: str
    fecha: str

class Microorganismo(BaseModel):
    id: Optional[int] = None
    nombre_cientifico: str
    nombre_comun: str
    procedencia: str
    detalles: str

class ActualizarMicroorganismo(BaseModel):
    procedencia:Optional[str] = None
    detalles:Optional[str] = None

class Producto_en_sala(BaseModel):
    id_producto:int
    cantidad:int
    id_sala:int
    lugar:str

class Sala(BaseModel):
    id: Optional[int] = None
    capacidad: int
    nombre: str

class Trabaja(BaseModel):
    email_usuario:str
    id_investigacion: int

class Usuario(BaseModel):
    email: str
    id: int
    nombre: str
    password: str
