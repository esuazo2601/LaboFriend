import axios from "axios";

const client = axios.create({
    baseURL: "http://127.0.0.1:8000" 
});

/*funciones de administrador*/

//post

export async function checkAvailability(id_sala,fecha) {
    const query = {
        "id_sala":id_sala,
        "fecha":fecha
    }
    const response = await client.post("check_availability",query)
    .then(response => response.data)
    .catch(error => console.log("Error en la petición a la api: ",error))
    return response
}
// const currentDate = new Date();
// const formattedDate = currentDate.toISOString().split('T')[0];
// console.log(await checkAvailability(1,"2024-10-11"));
export async function postAgenda(email_estudiante,id_sala,id_bloque,fecha) {
    const query = {
        "email_estudiante":email_estudiante,
        "id_sala":id_sala,
        "id_bloque":id_bloque,
        "fecha":fecha
    }
    const response = await client.post("agenda",query)
    .then(response => response.data)
    .catch(error => console.log("Error en la petición a la api: ",error))
    return response
}
//const currentDate = new Date();
//const formattedDate = currentDate.toISOString().split('T')[0];
//console.log(await postAgenda("richixdpro@gmail.com",1,2,formattedDate))

export async function putAgenda(id,email_estudiante=null,id_sala=null,id_bloque=null,fecha=null) {
    const query = {}
    if(email_estudiante)query.email_estudiante=email_estudiante
    if(id_sala)query.id_sala=id_sala
    if(id_bloque)query.id_bloque=id_bloque
    if(fecha)query.fecha=fecha
    const response = await client.put("agenda/"+id,query)
    .then(response => response.data)
    .catch(error => console.log("Error en la petición a la api: ",error))
    return response
}
// const currentDate = new Date();
// const formattedDate = currentDate.toISOString().split('T')[0];
// console.log(await putAgenda(4,"richixdpro@gmail.com",1,3,formattedDate))

export async function deleteAgenda(id) {
    const response = await client.delete("agenda/"+id)
    .then(response => response.data)
    .catch(error => console.log("Error en la petición a la api: ",error))
    return response
}

console.log(await deleteAgenda(3));