import { client } from './user_api.js';

export async function getEquipo() {
    const response = await client.get("equipo")
    .then(response => response.data.data)
    .catch(error => console.log("Error en la petición a la api: ",error))
    return response
}

export async function postEquipo(nombre,descripcion,fecha_mantencion) {
    let data = {
        "nombre":nombre,
        "descripcion":descripcion,
        "fecha_mantencion":fecha_mantencion
    };

    const response = await client.post("equipo",data)
    .then(response => response.data.data)
    .catch(error => console.log("Error en la petición a la api: ",error))
    return response
}

export async function getEquipoByName(nombre) {

    const response = await client.get("equipo_name/" + nombre)
    .then(response => response.data.data)
    .catch(error => console.log("Error en la petición a la api: ",error))
    return response
}

export async function getEquipoByID(id) {

    const response = await client.get("equipo_id/" + id)
    .then(response => response.data.data)
    .catch(error => console.log("Error en la petición a la api: ",error))
    return response
}
//console.log(await getProductoByName("alcojol"))

export async function deleteEquipo(id) {
    const response = await client.delete("equipo/" + id)
    .then(response => response.data.data)
    .catch(error => console.log("Error en la petición a la api: ",error))
    return response
}
