import axios from 'axios';
const urlBackend = "http://localhost:3000";

const crear_platillo = async (objeto) => {
    const url = 'api/platillo';
    const respuesta = await axios.post(`${urlBackend}/${url}`, objeto, { withCredentials: true });
    return respuesta.data;
}

const obtener_platillos = async (params = {}) => {
    const url = 'api/platillo/';
    const queryParams = new URLSearchParams(params);
    console.log(queryParams)
    const queryString = queryParams.toString();
    const response = await axios.get(`${urlBackend}/${url}${queryString ? `?${queryString}` : ''}`);
    return response.data;
  };
  

const editar_platillo = async (id, objeto) => {
    const url = 'api/platillo';
    const respuesta = await axios.put(`${urlBackend}/${url}?id=${id}`, objeto, { withCredentials: true });
    return respuesta.data;
}

const eliminar_platillo = async (id) => {
    const url = 'api/platillo';
    const respuesta = await axios.delete(`${urlBackend}/${url}?id=${id}`);
    return respuesta.data;
}

export {
    crear_platillo,
    obtener_platillos,
    editar_platillo,
    eliminar_platillo
}
