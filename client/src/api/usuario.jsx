import axios from 'axios';
const urlBackend = "http://localhost:3000";

const obtener_clientes = async (params = {}) => {
    const url = 'cliente';
    const queryParams = new URLSearchParams(params);
    const queryString = queryParams.toString();
    const response = await axios.get(`${urlBackend}/${url}${queryString ? `?${queryString}` : ''}`);
    return response.data;
};

const iniciar_sesion = async (objeto, tipo) => {
    const url = 'iniciar-sesion';
    const respuesta = await axios.post(`${urlBackend}/${tipo}/${url}`, objeto, { withCredentials: true });
    return respuesta.data;
}

const registrarse = async (objeto, tipo) => {
    const url = 'registrarse';
    const respuesta = await axios.post(`${urlBackend}/${tipo}/${url}`, objeto,  { withCredentials: true });
    console.log(respuesta)
    return respuesta;
}

const confirmar_cuenta = async (token) => {
    const url = 'confirmar-cuenta';
    try {
        const respuesta = await axios.get(`${urlBackend}/cliente/${url}/${token}`);
        return {tipo: 'exito', respuesta: respuesta.data.msg};
    } catch (error) {
        return {tipo: 'error', respuesta: error.response.data.msg};
    }
}

const olvide_contrasena = async (objeto, tipo) => {
    const url = 'olvide-contrasena';
    const respuesta = await axios.post(`${urlBackend}/${tipo}/${url}`, objeto,  { withCredentials: true });
    return respuesta.data;
}

const restablecer_contrasena = async (objeto, tipo, token) => {
    const url = 'olvide-contrasena';
    const respuesta = await axios.post(`${urlBackend}/${tipo}/${url}/${token}`, objeto,  { withCredentials: true });
    return respuesta.data;
}

const perfil = async (tipo, jwt) => {
    const configuration = {
        headers: {
          "Content-Type": "application/json", //indicamos que es de tipo JSON
          Authorization: `Bearer ${jwt}` //usamos bearer token
        }
      }
    const url = 'perfil';
    const respuesta = await axios.get('http://localhost:3000/administrador/perfil', configuration);
    return respuesta.data;
}

const editar_perfil = async (tipo ,token, usuario) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const url = 'perfil/editar';
    const respuesta = await axios.post(`${urlBackend}/${tipo}/${url}`, usuario, config, { withCredentials: true });
    return respuesta.data;
}

const eliminar_perfil = async (tipo ,token, usuario) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const url = 'perfil/eliminar';
    const respuesta = await axios.post(`${urlBackend}/${tipo}/${url}`, usuario, config, { withCredentials: true });
    return respuesta.data;
}

const cerrar_sesion = async (tipo, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const url = 'cerrar-sesion';
    const respuesta = await axios.get(`${urlBackend}/${tipo}/${url}`, config,  { withCredentials: true });
    return respuesta.data;
}


export {
    iniciar_sesion,
    registrarse,
    confirmar_cuenta,
    olvide_contrasena,
    restablecer_contrasena,
    perfil,
    editar_perfil,
    eliminar_perfil,
    cerrar_sesion,
    obtener_clientes
}