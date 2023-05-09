import axios from 'axios';
const urlBackend = "http://localhost:3000";

const obtener_ordenes_detalle = async (params = {}) => {
    const url = 'api/orden_detalle';
    const queryParams = new URLSearchParams(params);
    const queryString = queryParams.toString();
    
    try {
      const response = await axios.get(`${urlBackend}/${url}${queryString ? `?${queryString}` : ''}`);
      return response.data;
    } catch (error) {
      console.log(error)
    }
  };

export {
    obtener_ordenes_detalle,
}
