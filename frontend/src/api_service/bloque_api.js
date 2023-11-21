import axios from "axios";

const client = axios.create({
    baseURL: "http://127.0.0.1:8000" 
});

/*funciones de administrador*/

//get

export async function getBloques() {
    const response = await client.get("bloques")
    .then(response => response.data)
    .catch(error => console.log("Error en la petición a la api: ",error))
    return response
}

//console.log(await getBloques());

export async function getBloque(id) {
    const response = await client.get("bloque/"+id)
    .then(response => response.data.data)
    .catch(error => console.log("Error en la petición a la api: ",error))
    return response
}

//console.log(await getBloque(1))