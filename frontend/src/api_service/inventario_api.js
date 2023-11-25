import { client } from './user_api.js';

export async function getProducto() {
    const response = await client.get("producto")
    .then(response => response.data.data)
    .catch(error => console.log("Error en la petición a la api: ",error))
    return response
}

export async function postProducto(nombre,cantidad_total,tipo) {
    let data = {
        "nombre":nombre,
        "cantidad_total":cantidad_total,
        "tipo":tipo
    };

    const response = await client.post("producto",data)
    .then(response => response.data.data)
    .catch(error => console.log("Error en la petición a la api: ",error))
    return response
}

export async function getProductoByName(nombre) {

    const response = await client.get("producto_name/" + nombre)
    .then(response => response.data.data)
    .catch(error => console.log("Error en la petición a la api: ",error))
    return response
}

export async function getProductoByID(id) {

    const response = await client.get("producto_id/" + id)
    .then(response => response.data.data)
    .catch(error => console.log("Error en la petición a la api: ",error))
    return response
}
//console.log(await getProductoByName("alcojol"))

export async function updateProducto(id, cantidad_total) {
    let data={
        "cantidad_total":cantidad_total
    }
    const response = await client.put("producto_update/" + id, data)
    .then(response => response.data.data)
    .catch(error => console.log("Error en la petición a la api: ",error))
    return response
}

export async function deleteProducto(id) {
    const response = await client.delete("producto/" + id)
    .then(response => response.data.data)
    .catch(error => console.log("Error en la petición a la api: ",error))
    return response
}
