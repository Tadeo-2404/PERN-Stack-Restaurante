import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { perfil } from "../api/usuario";
import { obtener_platillos } from "../api/platillo";

const Context = createContext(null);

const obtenerTipo = () => {
  const path = window.location.pathname;
  return path.includes("/cliente") ? "cliente" : "administrador";
};


const ContextProvider = ({ children }) => {
  const [tipo, setTipo] = useState(() => obtenerTipo());
  const [usuario, setUsuario] = useState({});
  const [platillos, SetPlatillos] = useState([]);
  const navigate = useNavigate();

  const obtenerPlatillos = async (params) => {
    const platillos = await obtener_platillos(params);
    SetPlatillos(platillos);
  }

  useEffect(() => {
    const tipoActual = obtenerTipo();
    if (tipoActual !== tipo) {
      navigate(`/${tipo}/inicio`);
    }
  }, [tipo]);
  
  useEffect(() => {
    const obtenerCookie = async () => {
      const jwt = Cookies.get("acceso_token");
      if(!jwt) {
        navigate(`/${tipo}/iniciar-sesion`);
        console.log('no')
        return;
      }
      const token = jwt_decode(jwt);
      if(token && tipo !== token.rol) {
        console.log("adios")
        setTipo(token.rol); 
        navigate(`/${token.rol}`);
        return;
      }

      const usuario = await perfil(tipo, jwt);
      setUsuario({id: usuario.id, nombre: usuario.nombre, correo: usuario.correo, telefono: usuario.telefono, rol: token.rol});
    }
    obtenerCookie();
  }, []);

  useEffect(() => {
    obtenerPlatillos();
  }, [platillos]);
  
  return <Context.Provider value={{ tipo, setTipo, usuario, platillos, SetPlatillos, obtenerPlatillos }}>{children}</Context.Provider>;
};

export { Context };
export default ContextProvider;
