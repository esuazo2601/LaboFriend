import { client } from './user_api.js';

/*funciones de administrador*/

//get

export async function getMicroorgByCiName(nombre_cientifico) {
    const response = await client.get("microorganismo/"+nombre_cientifico)
    .then(response => response.data)
    .catch(error => console.log("Error en la petición a la api: ",error))
    return response
}
//console.log(await getMicroorgByCiName("eschericha colli2"));

export async function getMicroorgByName(nombre_comun) {
    const response = await client.get("microorganismo_nombre/"+nombre_comun)
    .then(response => response.data)
    .catch(error => console.log("Error en la petición a la api: ",error))
    return response
}

//console.log(await getMicroorgByName("la weaita esa"));


//post
export async function postMicroorganismo(nombre_cientifico, nombre_comun,procedencia,detalles) {
    const query = {
        "nombre_cientifico":nombre_cientifico,
        "nombre_comun":nombre_comun,
        "procedencia":procedencia,
        "detalles":detalles
    }
    const response = await client.post("microorganismo",query)
    .then(response => response.data.data)
    .catch(error => console.log("Error en la petición a la api: ",error))
    return response
}

//console.log(await postMicroorganismo("cientific name","cientifico","los cubos","si"));


//delete

export async function deleteMicroorganismo(id) {
    const response = await client.delete("microorganismo/"+id)
    .then(response => response.data.data)
    .catch(error => console.log("Error en la petición a la api: ",error))
    return response
}

//console.log(await deleteMicroorganismo(4))

//put

export async function updateMicroorganismo(id,procedencia=null,detalles=null) {
    const query = {};
    if(procedencia)query.procedencia=procedencia;
    if(detalles)query.detalles=detalles;
    const response = await client.put("microorganismo_update/"+id,query)
    .then(response => response.data.data)
    .catch(error => console.log("Error en la petición a la api: ",error))
    return response;
}

//console.log(await updateMicroorganismo(6,"Cambiaron las cosas","Cambio"));