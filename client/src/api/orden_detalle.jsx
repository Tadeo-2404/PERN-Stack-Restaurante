import axios from 'axios';
const urlBackend = "http://localhost:3000";

const obtener_ordenes_detalle = async (params = {}) => {
    const url = 'api/orden_detalle';
    const queryParams = new URLSearchParams(params);
    const queryString = queryParams.toString();
    const response = await axios.get(`${urlBackend}/${url}${queryString ? `?${queryString}` : ''}`);
    return response.data;
  };

export {
    obtener_ordenes_detalle,
}
