import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

const Context = createContext(null);

const obtenerTipo = () => {
  const path = window.location.pathname;
  return path.includes("/cliente") ? "cliente" : "administrador";
};

const ContextProvider = ({ children }) => {
  const [tipo, setTipo] = useState(() => obtenerTipo());
  const [auth, setAuth] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const tipoActual = obtenerTipo();
    if (tipoActual !== tipo) {
      setTipo(tipoActual);
    }
  }, [tipo]);

  useEffect(() => {
    const jwt = Cookies.get('acceso_token');
    if(!jwt) {
      navigate(`/${tipo}/iniciar-sesion`);
      return;
    }
    const token = jwt_decode(jwt);
    setAuth(token);

    if(token && tipo !== token.rol) {
      navigate(`/${token.rol}`);
      return;
    }
  }, []);

  return <Context.Provider value={{ tipo, setTipo, auth }}>{children}</Context.Provider>;
};

export { Context };
export default ContextProvider;
