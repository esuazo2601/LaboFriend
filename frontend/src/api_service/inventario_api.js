import axios from 'axios';

const client = axios.create({
    baseURL: "http://127.0.0.1:8000" 
});

async function getProducto() {
    try {
        const response = await client.get("producto");
        console.log(response.data.data);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function getProductoByName(name) {
    try {
        const response = await client.get("producto_name/" + name);
        console.log(response.data.data);
    } catch (error) {
        console.error('Error:', error);
    }
}
