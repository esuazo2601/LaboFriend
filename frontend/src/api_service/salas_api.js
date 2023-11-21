import { client } from './userApi.js';

export async function getSalas() {
    const response = await client.get("salas")
    .then(response => response.data.data)
    .catch(error => console.log("Error en la petición a la api: ",error))
    return response
}

console.log(await getSalas())

