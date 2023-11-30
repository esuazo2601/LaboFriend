from typing import Optional
from pydantic import BaseModel, EmailStr


# A continuación se definen los modelos utilizados para las query a la base de datos
class Bloque(BaseModel):
    id: Optional[int] = None
    hora_inicio: str
    hora_fin: str


class Producto(BaseModel):
    id: Optional[int] = None
    nombre: str
    cantidad_total: int
    tipo: str


class ActualizarProducto(BaseModel):
    cantidad_total: int


class Agenda(BaseModel):
    id: Optional[int] = None
    email_estudiante: EmailStr
    id_sala: int
    id_bloque: int
    fecha: str


class ActualizarAgenda(BaseModel):
    email_estudiante: Optional[EmailStr] = None
    id_sala: Optional[int] = None
    id_bloque: Optional[int] = None
    fecha: Optional[str] = None


class CheckAgenda(BaseModel):
    id_sala: int
    fecha: str


class Equipo(BaseModel):
    id: Optional[int] = None
    fecha_mantencion: str
    nombre: str
    id_sala: Optional[int] = None
    descripcion: str


class Incidencia(BaseModel):
    id: Optional[int] = None
    observacion: str
    fecha: Optional[str] = None
    id_investigacion: int


class Inv_microorganismo(BaseModel):
    id_investigacion: int
    id_microorganismo: int


class Investigacion(BaseModel):
    id: Optional[int] = None
    titulo: str
    descripcion: str
    fecha: str


class ActualizarInvestigacion(BaseModel):
    titulo: Optional[str] = None
    descripcion: Optional[str] = None
    fecha: Optional[str] = None


class Microorganismo(BaseModel):
    id: Optional[int] = None
    nombre_cientifico: str
    nombre_comun: str
    procedencia: str
    detalles: str


class ActualizarMicroorganismo(BaseModel):
    procedencia: Optional[str] = None
    detalles: Optional[str] = None


class Producto_en_sala(BaseModel):
    id_producto: int
    cantidad: int
    id_sala: int
    lugar: str


class ActualizarProd_en_sala(BaseModel):
    cantidad: Optional[int] = None
    lugar: Optional[str] = None


class Sala(BaseModel):
    id: Optional[int] = None
    capacidad: int
    nombre: str


class Trabaja(BaseModel):
    email_usuario: EmailStr
    id_investigacion: int


class Usuario(BaseModel):
    email: EmailStr
    nombre: Optional[str] = None


class UsuarioDB(Usuario):
    password: str


class TokenData(BaseModel):
    nombre: Optional[str] = None
    email: Optional[EmailStr] = None
    scopes: Optional[list[str]] = []
