import axios from 'axios';

export const client = axios.create ({
    baseURL: "https://labo-friend-backend.onrender.com/"

});

const header = {
    'Content-Type': 'application/x-www-form-urlencoded'
}

export async function login(email, password) {
    try {
        const user = {
            "username": email,
            "password": password
        };

        const response = await client.post("/token", new URLSearchParams(user).toString(), header);
        client.defaults.headers.common['Authorization'] = 'Bearer ' + response.data["access_token"]
        //AUTH_TOKEN = 'Bearer '+ response.data["access_token"]
        return response
    } catch (error) {
        console.error("Error en la petición a la API de login: ", error);
        throw error; // Lanza la excepción para que puedas manejarla en el lugar donde llamas a la función
    }
}

export async function register(email, nombre, password) {
    try {
        const user = {
            "email": email,
            "nombre": nombre,
            "password": password
        }
        const response = await client.post("/usuario", user);
        console.log(response)
        return response
    } catch (error) {
        console.error("Error en registro", error)
        throw error
    }
}

//const resp = await register("didox@didox.com","dido");
//console.log(resp)

export async function getCurrentUser() {
    const response = await client.get("/usuario/datos")
        .then(response => response.data)
        .catch(error => console.error("Error en la petición a la API: ", error))
    return response
}

// console.log(await getUser())

export async function decodedToken(token) {
    const data = await client.get("/datos_token/" + token)
        .then(data => data)
        .catch(error => console.error("Error en la petición a la API: ", error))
    return data
}

export async function getUsers() {
    const data = await client.get("/users")
        .then(data => data.data.data)
        .catch(error => console.error("Error en la petición a la API: ", error))
    return data
}

export async function getUserByEmail(email) {
    const data = await client.get("/user/" + email)
        .then(data => data.data.data)
        .catch(error => console.error("Error en la petición a la API: ", error))
    return data
}

export async function getUserScopes(email) {
    const data = await client.get("/user_scopes/" + email)
        .then(data => data.data)
        .catch(error => console.error("Error en la petición a la API: ", error))
    return data
}

export async function deleteUser(email) {
    const data = await client.delete("/user/" + email)
        .then(data => data.data)
        .catch(error => console.error("Error en la petición a la API: ", error))
    return data
}