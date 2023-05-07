import axios from 'axios';
const urlBackend = "http://localhost:3000";

const iniciar_sesion = async (objeto, tipo) => {
    const url = 'iniciar-sesion';
    const respuesta = await axios.post(`${urlBackend}/${tipo}/${url}`, objeto, { withCredentials: true });
    return respuesta.data;
}

const registrarse = async (objeto, tipo) => {
    const url = 'registrarse';
    const respuesta = await axios.post(`${urlBackend}/${tipo}/${url}`, objeto,  { withCredentials: true });
    return respuesta.data;
}

const confirmar_cuenta = async (token) => {
    const url = 'confirmar-cuenta';
    const respuesta = await axios.get(`${urlBackend}/cliente/${url}/${token}`);
    return respuesta.data;
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

const perfil = async (tipo, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const url = 'perfil';
    const respuesta = await axios.post(`${urlBackend}/${tipo}/${url}`, config,  { withCredentials: true });
    return respuesta.data;
}

const cerrar_sesion = async (tipo, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const url = 'cerrar-sesion';
    const respuesta = await axios.post(`${urlBackend}/${tipo}/${url}`, config,  { withCredentials: true });
    return respuesta.data;
}


export {
    iniciar_sesion,
    registrarse,
    confirmar_cuenta,
    olvide_contrasena,
    restablecer_contrasena,
    perfil,
    cerrar_sesion
}