import axios from 'axios';
const urlBackend = "http://localhost:3000";

const crear_orden = async (fecha, clienteId, platillosArr) => {
    const url = 'api/orden';
    const respuesta = await axios.post(`${urlBackend}/${url}`, {fecha, clienteId, platillosArr}, { withCredentials: true });
    return respuesta.data;
}

const obtener_ordenes = async (params = {}) => {
    const url = 'api/orden/';
    const queryParams = new URLSearchParams(params);
    const queryString = queryParams.toString();
    const response = await axios.get(`${urlBackend}/${url}${queryString ? `?${queryString}` : ''}`);
    return response.data;
  };
  

const editar_orden = async (id, fecha) => {
    const url = 'api/orden';
    const respuesta = await axios.put(`${urlBackend}/${url}?id=${id}`, {fecha}, { withCredentials: true });
    return respuesta.data;
}

const eliminar_orden = async (id) => {
    const url = 'api/orden';
    const respuesta = await axios.delete(`${urlBackend}/${url}?id=${id}`);
    return respuesta.data;
}

export {
    crear_orden,
    obtener_ordenes,
    editar_orden,
    eliminar_orden
}
