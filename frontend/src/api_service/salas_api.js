import { client } from './user_api.js';

export async function getSalas() {
    const response = await client.get("salas")
    .then(response => response.data.data)
    .catch(error => console.log("Error en la petición a la api: ",error))
    return response
}

//console.log(await getSalas())

export async function getSala(id) {
    const response = await client.get("sala/"+id)
    .then(response => response.data.data[0])
    .catch(error => console.log("Error en la petición a la api: ",error))
    return response
}