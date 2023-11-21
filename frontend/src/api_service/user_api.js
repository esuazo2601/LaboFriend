import axios from 'axios';

export const client = axios.create ({
    baseURL: "http://127.0.0.1:8000",

});

const header = {
    'Content-Type':'application/x-www-form-urlencoded'
}

export async function login(email, password){
    try {
        const user = {
            "username": email,
            "password": password
        };

        const response = await client.post("/token", new URLSearchParams(user).toString(), header);
        client.defaults.headers.common['Authorization'] = 'Bearer '+ response.data["access_token"]
        //AUTH_TOKEN = 'Bearer '+ response.data["access_token"]
        return response
    } catch (error) {
        console.error("Error en la petición a la API: ", error);
        throw error; // Lanza la excepción para que puedas manejarla en el lugar donde llamas a la función
    }
}

// await login("richixdpro@gmail.com","juanitouwu");
// console.log(client.defaults)

export async function getUser(){
    const response = await client.get("/usuario/datos")
    .then(response => response.data)
    .catch(error => console.error("Error en la petición a la API: ", error))
    return response
}

// console.log(await getUser())

export async function decodedToken(token){
    const data = await client.get("/datos_token/"+token)
    .then(data  => data)
    .catch(error => console.error("Error en la petición a la API: ", error))
    return data
}