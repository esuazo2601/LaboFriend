import { client } from './user_api.js';
/*funciones de administrador*/

//get

export async function getInvestigaciones() {
    const response = await client.get("investigaciones")
    .then(response => response.data.data)
    .catch(error => console.log("Error en la petición a la api: ",error))
    return response
}

//console.log( await getInvestigaciones());
export async function getInvestigacionByName(name) {
    const response = await client.get("investigacion_name/"+name)
    .then(response => response.data.data)
    .catch(error => console.log("Error en la petición a la api: ",error))
    return response
}
//console.log(await getInvestigacionByName("Investigando un honguito lindo"))

export async function getInvestigacionById(id) {
    const response = await client.get("investigacion_id/"+id)
    .then(response => response.data.data)
    .catch(error => console.log("Error en la petición a la api: ",error))
    return response
}
//console.log(await getInvestigacionById(4))

export async function getInvestigacionByDate(date) {
    const response = await client.get("investigacion_date/"+date)
    .then(response => response.data.data)
    .catch(error => console.log("Error en la petición a la api: ",error))
    return response
}
//console.log(await getInvestigacionByDate("2023-01-22"))

//post

export async function postInvestigacion(titulo, descripcion, fecha) {
    const investigation = {
        "titulo":titulo,
        "descripcion":descripcion,
        "fecha":fecha
    }
    const response = await client.post("investigacion/",investigation)
    .then(response => response.data.data)
    .catch(error => console.log("Error en la petición a la api: ",error))
    return response
}
// let date = new Date()
// date.setMilliseconds(0)
// console.log(await postInvestigacion("Hongos amorfos","este hongo es muy amorfo", date))

//put
export async function updateInvestigacion(id,titulo = null, descripcion = null, fecha = null) {
    let investigation = {}
    if(titulo) investigation.titulo = titulo
    if(descripcion) investigation.descripcion = descripcion
    if(fecha) investigation.fecha = fecha
    const response = await client.put("investigacion_update/"+id,investigation)
    .then(response => response.data.data)
    .catch(error => console.log("Error en la petición a la api: ",error))
    return response
}
// let date = new Date()
// date.setMilliseconds(0)
// console.log(await updateInvestigacion(6,null,"al final si que cambia", date))
//delete
export async function deleteInvestigacion(id) {
    const response = await client.delete("investigacion/"+id)
    .then(response => response.data.data)
    .catch(error => console.log("Error en la petición a la api: ",error))
    return response
}

export async function getTrabajandoEmail(email) {
    const response = await client.get("trabajando_email/" + email)
    .then(response => response.data)
    .catch(error => console.log("Error en la petición a la api: ",error))
    return response
}

export async function postTrabajando(email, id_investigacion) {
    const trabajando_data = {
        "email_usuario": email,
        "id_investigacion":id_investigacion
    }

    const response = await client.post("trabajando/", trabajando_data)
    .then(response => response)
    .catch(error => console.log("Error en la petición a la api: ",error))
    return response
}


//console.log(await deleteInvestigacion(9))

export async function getIncidencias(id){
    const response = await client.get("incidencias_inv/"+id)
    .then(response => response.data.data)
    .catch(error => console.log("Error en la petición a la api: ",error))
    return response
}

export async function deleteIncidencia(id){
    const response = await client.delete("incidencia/"+id)
    .then(response => response)
    .catch(error => console.log("Error en la petición a la api: ",error))
    return response
}

export async function postIncidencia(titulo, descripcion,fecha,id){
    const incidencia_data ={
        "observacion":descripcion,
        "fecha":fecha,
        "id_investigacion":id,
        "titulo":titulo
    }
    const response = await client.post("incidencia/", incidencia_data)
    .then(response => response)
    .catch(error => console.log("Error en la petición a la api: ",error))
    return response
}