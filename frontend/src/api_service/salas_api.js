import axios from "axios";

const client = axios.create({
    baseURL: "http://127.0.0.1:8000" 
});

export async function getSalas() {
    const response = await client.get("salas")
    .then(response => response.data.data)
    .catch(error => console.log("Error en la petición a la api: ",error))
    return response
}

console.log(await getSalas())

