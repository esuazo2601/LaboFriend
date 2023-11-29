from ..database.dbconfig import supabase
from ..database.models import *
from fastapi import HTTPException
from datetime import datetime,timedelta

################################### BLOQUES METHODS ################################### 
#Metodo para consultar todas las entradas de la tabla bloques
async def get_blocks():
    try:
        response = supabase.table('Bloque').select("*").execute()
        print(response)
        return response.data
    except Exception:
        raise HTTPException(status_code=400, detail="database blocks error" )


#Metodo para consultar un bloque dado su id
async def get_block(bloque_id:int):
    try:
        response = supabase.table('Bloque').select('*').eq('id',bloque_id).execute()
        print(response)
        return response
    except Exception as e:
        raise HTTPException(status_code=400, detail="database block error" )

#Metodo para crear un bloque
async def newblock(bloque: Bloque):
    try:
        print(bloque.model_dump())  # Asegúrate de que los datos se imprimen correctamente
        response = supabase.table('Bloque').insert({
            "hora_inicio":bloque.hora_inicio,
            "hora_fin":bloque.hora_fin    
            }).execute()
        return response
    except Exception as e:
        raise HTTPException(status_code=400, detail="database newblock error")


#Metodo para borrar bloque
async def delete_block(bloque_id:int):
    try:
        data = supabase.table('Bloque').select('*').eq('id',bloque_id).execute()
        print(data)
        if data.data:
            response = supabase.table('Bloque').delete().eq("id",bloque_id).execute()
            return {'message':f'Se elimino el bloque con id: {bloque_id}'}, response
        else:
            return {'message':'No existe el bloque con esta id'}, None
    except Exception as e:
        raise HTTPException(status_code=400, detail="database deleteblock error")

################################### SALAS METHODS ################################### 

async def new_room(sala: Sala):
    try:
        print(sala.model_dump())
        response = supabase.table('Sala').insert({
            "capacidad":sala.capacidad,
            "nombre":sala.nombre
        }).execute()
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

async def get_rooms():
    try:
        response = supabase.table('Sala').select('*').execute()
        print(response)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

async def delete_room(sala_nombre:str):
    try:
        response = supabase.table('Sala').select('*').eq('nombre', sala_nombre).execute()
        if response.data:
            supabase.table('Sala').delete().eq('nombre', sala_nombre).execute()
            return {'message':f'Sala con nombre: {sala_nombre} fue borrada'}
        else:
            raise HTTPException(status_code=404, detail='No se encuentra la sala con este nombre')
    except Exception as e:
        raise HTTPException(status_code=500, detail='No se encuentra la sala con este nombre')
    
################################### MICROORGANISMOS METHODS ################################### 

async def add_microorg(microorganismo:Microorganismo):
    response = supabase.table('Microorganismo').insert({
        "nombre_cientifico":microorganismo.nombre_cientifico,
        "nombre_comun":microorganismo.nombre_comun,
        "procedencia":microorganismo.procedencia,
        "detalles":microorganismo.detalles
    }).execute()
    return response

async def get_all_microorg():
    response = supabase.table('Microorganismo').select("*").execute()
    return response

async def delete_microorg(id:int):
    response = supabase.table('Microorganismo').delete().eq('id',id).execute()
    if response.data :
        return response
    else:
        return {'message':f'No se encontró microorganismo de id: {id}'}
    

#Obtener un microorganismo en base a su nombre comun
async def get_microorg_cm(nombre_comun:str):
    response = supabase.table('Microorganismo').select('*').eq('nombre_comun',nombre_comun).execute()
    return response

#Obtener un microorganismo en base a su nombre cientifico
async def get_microorg_cin(nombre_cientifico:str):
    response = supabase.table('Microorganismo').select('*').eq('nombre_cientifico',nombre_cientifico).execute()
    return response

# Actualizar un microorganismo
async def update_microorg(id:int,nuevo:ActualizarMicroorganismo):

    if nuevo.procedencia and nuevo.detalles: #Si se entregan nueva procedencia y detalles
        response = supabase.table('Microorganismo').update({"detalles":nuevo.detalles, "procedencia":nuevo.procedencia}).eq('id',id).execute()
        return response
    elif nuevo.detalles: #Si solo se entra detalles
        response = supabase.table('Microorganismo').update({"detalles":nuevo.detalles}).eq('id',id).execute()
        return response
    elif nuevo.procedencia: #Si solo se entra la procedencia nueva
        response = supabase.table('Microorganismo').update({"procedencia":nuevo.procedencia}).eq('id',id).execute()
        return response
    else:
        raise HTTPException(status_code=406,detail="No se especifica que se cambia")

################################### INVESTIGACION METHODS ################################### 

async def add_investigacion(investigacion:Investigacion):
    response = supabase.table('Investigacion').insert({
        "titulo":investigacion.titulo,
        "descripcion":investigacion.descripcion,
        "fecha":investigacion.fecha
        
    }).execute()
    return response

async def get_all_investigaciones():
    response = supabase.table('Investigacion').select('*').execute()
    return response 

async def get_investigacion_id(id_inv:int):
    response = supabase.table('Investigacion').select('*').eq('id',id_inv).execute()
    return response

async def get_investigacion_nm(name_inv:str):
    response = supabase.table('Investigacion').select('*').eq('titulo',name_inv).execute()
    return response

#consulta todas las investigaciones dada una fecha
async def get_investigacion_date(fecha: str):
    # Convierte la fecha proporcionada en un objeto datetime
    fecha_obj = datetime.strptime(fecha, '%Y-%m-%d')

    # Calcula la fecha de inicio (medianoche) y fecha de finalización (un minuto antes de la medianoche del día siguiente)
    fecha_inicio = fecha_obj.replace(hour=0, minute=0, second=0, microsecond=0)
    fecha_fin = fecha_inicio + timedelta(days=1)

    # Consulta la base de datos utilizando operadores de filtro personalizados
    response = supabase.table('Investigacion').select('*').filter(
        'fecha', 'gte', fecha_inicio.strftime('%Y-%m-%d %H:%M:%S')
    ).filter(
        'fecha', 'lt', fecha_fin.strftime('%Y-%m-%d %H:%M:%S')
    ).execute()
    
    return response

async def delete_inv(id:int):
    response = supabase.table('Investigacion').delete().eq('id',id).execute()
    if response:
        return response
    else:
        return {'message':f'No se encontró la investigación de id: {id}'}

async def update_inv(id:int,nuevo:ActualizarInvestigacion):
    if nuevo.titulo:
        response = supabase.table('Investigacion').update({"titulo":nuevo.titulo}).eq('id',id).execute()
        return response
    if nuevo.descripcion:
        response = supabase.table('Investigacion').update({"descripcion":nuevo.descripcion}).eq('id',id).execute()
        return response
    if nuevo.fecha:
        response = supabase.table('Investigacion').update({"fecha":nuevo.fecha}).eq('id',id).execute()
        return response
    else:
        raise HTTPException(status_code=406,detail="No se especifica que se cambia")

################################### PRODUCTO METHODS ################################### 

async def upsert_producto(producto: Producto):
    # Verificar si el producto ya existe en la base de datos
    existing_product = supabase.table('Producto').select('id').eq('nombre', producto.nombre).execute()
    if existing_product.data:
        response = supabase.table('Producto').upsert({
            "id": existing_product.data[0]['id'],
            "nombre":producto.nombre,
            "cantidad_total":producto.cantidad_total,
            "tipo":producto.tipo
            }).execute()
        return response
    else: 
        response = supabase.table('Producto').insert({
            "nombre":producto.nombre,
            "cantidad_total":producto.cantidad_total,
            "tipo":producto.tipo
        }).execute()
        return response

async def get_producto_nm(name_prod:str):
    response = supabase.table('Producto').select('*').eq('nombre',name_prod).execute()
    return response

async def get_productos():
    response = supabase.table('Producto').select('*').execute()
    return response

async def get_producto_id(id_prod:str):
    response = supabase.table('Producto').select('*').eq('id',id_prod).execute()
    return response

async def update_producto(id:int,nuevo:ActualizarProducto):
    response = supabase.table('Producto').select('*').eq('id',id).execute()
    if response:
        query = supabase.table('Producto').update({"cantidad_total":nuevo.cantidad_total}).eq('id',id).execute()
        return query
    else:
        raise HTTPException(status_code=406,detail="No se encuentra el producto")

async def delete_product(id:int):
    query = supabase.table('Producto').select('*').eq('id',id).execute()
    if query.data:
        response = supabase.table('Producto').delete().eq('id',id).execute()
        return response
    else:
        return {'message':f'No se encontró el producto de id: {id}'}

################################### TRABAJANDO METHODS ################################### 
# Añade entrada a la tabla trabaja
async def add_trabajando(trabaja:Trabaja):
    query = supabase.table('Investigacion').select('*').eq('id',trabaja.id_investigacion).execute()
    if query.data:
        response = supabase.table('Trabaja').insert({
        "email_usuario":trabaja.email_usuario,
        "id_investigacion":trabaja.id_investigacion
    }).execute()
        return response
    else:
        return {'message':f'No se encontro investigacion con id: {trabaja.id_investigacion}'}

#Retorna toda la tabla de trabaja
async def get_trabajando():
    query = supabase.table('Trabaja').select('*').execute()
    return query.data

#Retorna las investigaciones en las que esta trabajando el usuario con el email dado
async def get_trabajando_email(email:str):
    query = supabase.table('Trabaja').select('id_investigacion').eq('email_usuario',email).execute()
    print(query.data)
    if query.data:
        return query.data
    else:
        return {'message':f'el usuario {email} no tiene investigaciones'}

async def delete_trabajando_id(id:int):
    query = supabase.table('Trabaja').delete().eq('id_investigacion',id).execute()
    return query

################################### AGENDA METHODS ###################################

#retorna los bloques disponibles en la sala seleccionada en la fecha seleccionada
async def check_availability(check_agenda:CheckAgenda):
    #Se pregunta por los bloques disponibles en funcion de la sala y su capacidad
    block_query = supabase.table('Agenda').select('id_bloque').match({'id_sala':check_agenda.id_sala,'fecha':check_agenda.fecha}).execute()
    sala_query = supabase.table('Sala').select('capacidad').eq('id',check_agenda.id_sala).execute()
    
    capacidad_sala = sala_query.data[0]['capacidad']
    bloques = block_query.data
    
    # se quitan bloques en funcion de los que esten ocupados (los recuperados de la query de bloques)
    available_list = [1,2,3,4,5,6,7,8,9,10]
    block_dict = {}
    for bloque in bloques:
        id_bloque = bloque['id_bloque']
        if id_bloque in block_dict:
            block_dict[id_bloque] += 1
        else:
            block_dict[id_bloque] = 1

    #Si la cantidad de personas que agendan es mayor a la capacidad de la sala, se quita el bloque de disponible
    print('CAPACIDAD SALA: ',capacidad_sala)
    for key,value in block_dict.items():
        if value >= capacidad_sala:
            available_list.remove(key)

    return {'available_blocks': available_list} 

async def new_agendamiento(agendamiento:Agenda):
    #Solo se puede agendar si no tiene otro agendamiento previo en la misma sala en el mismo bloque en la misma sala
    user_reservation = supabase.table('Agenda').select('id_bloque').match({'id_sala':agendamiento.id_sala, 'fecha':agendamiento.fecha, 'email_estudiante':agendamiento.email_estudiante}).execute()
    if not user_reservation.data:
        response = supabase.table('Agenda').insert({
            "email_estudiante":agendamiento.email_estudiante,
            "id_sala":agendamiento.id_sala,
            "id_bloque":agendamiento.id_bloque,
            "fecha":agendamiento.fecha
        }).execute()
        return response
    raise HTTPException(status_code=409, detail='Bloque ya reservado') 

async def delete_agendamiento(id:int):
    response = supabase.table('Agenda').delete().eq('id',id).execute()
    return response

async def update_agendamiento(id:int,new_agendamiento:ActualizarAgenda):
    response = supabase.table('Agenda').update({
        "email_estudiante":new_agendamiento.email_estudiante,
        "id_sala":new_agendamiento.id_sala,
        "id_bloque":new_agendamiento.id_bloque,
        "fecha":new_agendamiento.fecha
        }).eq('id',id).execute()
    return response

################################### PRODUCTO_EN_SALA METHODS (NO USADOS EN MVP) ################################### 
async def get_prod_by_id(id_producto:int):
    response = supabase.table('Producto_en_sala').select('*').eq('id_producto', id_producto).execute()
    return response

async def check_stock(id_producto:int, cantidad:int):
    id_prod = id_producto
    cant_agregada = cantidad

    query_1 = supabase.table('Producto_en_sala').select('cantidad').eq("id_producto", id_prod).execute()
    query_2 = await get_producto_id(id_prod)
    print(query_2)
    cant_total = query_2.data[0]["cantidad_total"]

    cantidad_en_salas = 0
    for cantidades in query_1.data:
        cantidad_en_salas += cantidades['cantidad']

    if cantidad_en_salas + cant_agregada > cant_total:
        raise HTTPException(400,detail='Se excede el maximo de producto')
    else: 
        return True

async def add_prod_en_sala(prod_en_sala:Producto_en_sala):
    if await check_stock(prod_en_sala):
        response = supabase.table('Producto_en_sala').insert({
            "id_producto":prod_en_sala.id_producto,
            "cantidad":prod_en_sala.cantidad,
            "id_sala":prod_en_sala.id_sala,
            "lugar":prod_en_sala.lugar
        }).execute()
        return response 

async def get_prod_en_sala():
    response = supabase.table('Producto_en_sala').select('*').execute()
    return response

async def update_prod_en_sala(id_producto:int, id_sala:int, actualizado:ActualizarProd_en_sala):
    if actualizado.cantidad:
        if await check_stock(id_producto, actualizado.cantidad):
            response = supabase.table('Producto_en_sala').update({
                "cantidad":actualizado.cantidad,
                "lugar":actualizado.lugar
            }).match({'id_producto':id_producto,'id_sala':id_sala}).execute()
            return response
    else:
        response = supabase.table('Producto_en_sala').update({
                "cantidad":actualizado.cantidad,
                "lugar":actualizado.lugar
        }).match({'id_producto':id_producto,'id_sala':id_sala}).execute()
        return response
################################### INCIDENCIA METHODS ################################### 

async def add_incidencia(incidencia:Incidencia):
    date = datetime.now()
    formated_date = date.replace(microsecond=0)
    incidencia.fecha = str(formated_date)
    response = supabase.table('Incidencia').insert({
        "observacion":incidencia.observacion,
        "fecha":incidencia.fecha,
        "id_investigacion":incidencia.id_investigacion
    }).execute()
    return response

async def get_incidencias():
    response = supabase.table('Incidencia').select('*').execute()
    return response

async def get_incidencias_inv(id_inv:int):
    response = supabase.table('Incidencia').select('*').eq('id_investigacion',id_inv).execute()
    return response 

async def get_incidencia(id:int):
    response = supabase.table('Incidencia').select('*').eq('id',id).execute()
    return response

async def delete_incidencia(id:int):
    response = supabase.table('Incidencia').delete().eq('id',id).execute()
    return response

################################### EQUIPO METHODS ################################### 

async def upsert_equipo(equipo: Equipo):
    # Verificar si el producto ya existe en la base de datos
    existing_equipment = supabase.table('Equipo').select('id').eq('nombre', equipo.nombre).execute()
    if existing_equipment.data:
        response = supabase.table('Equipo').upsert({
            "id": existing_equipment.data[0]['id'],
            "nombre":equipo.nombre,
            "fecha_mantencion":equipo.fecha_mantencion,
            "descripcion":equipo.descripcion
            }).execute()
        return response
    else: 
        response = supabase.table('Equipo').insert({
            "nombre":equipo.nombre,
            "fecha_mantencion":equipo.fecha_mantencion,
            "descripcion":equipo.descripcion
        }).execute()
        return response

async def get_equipo_nm(name_equip:str):
    response = supabase.table('Equipo').select('*').eq('nombre',name_equip).execute()
    return response

async def get_equipos():
    response = supabase.table('Equipo').select('*').execute()
    return response

async def get_equipo_id(id_equip:str):
    response = supabase.table('Equipo').select('*').eq('id',id_equip).execute()
    return response

async def delete_equipo(id:int):
    query = supabase.table('Equipo').select('*').eq('id',id).execute()
    if query.data:
        response = supabase.table('Equipo').delete().eq('id',id).execute()
        return response
    else:
        return {'message':f'No se encontró el producto de id: {id}'}

################################### USER FETCH METHODS ################################### 

#Se consultan todos los users
async def get_users():
    query = supabase.table('Usuario').select('email', 'nombre').execute()
    return query

#Se busca un usuario basado en su email
async def get_user_by_email(email:EmailStr):
    query = supabase.table('Usuario').select('email','nombre').eq('email',email).execute()
    if query.data:
        return query
    else:
        return {'message':'No existe usuario con este email'}

#Se consultan los scopes asociados al usuario con el email dado
async def get_user_scopes(email:EmailStr):
    # Se pregunta si el usuario existe, si es asi, se verifica que exista en algunas de las tablas de los roles
    scopes = []
    admin = supabase.table('Administrador').select('email').eq('email',email).execute()
    if admin.data:
        scopes.append('Administrador')
    ayudante = supabase.table('Ayudante').select('email').eq('email',email).execute()
    if ayudante.data:
        scopes.append('Ayudante')
    estudiante = supabase.table('Estudiante').select('email').eq('email',email).execute()
    if estudiante.data:
        scopes.append('Estudiante')
    return scopes

async def delete_user(email:EmailStr):
    response = supabase.table('Usuario').delete().eq('email',email).execute()
    return response