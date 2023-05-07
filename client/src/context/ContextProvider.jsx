import { createContext, useState, useEffect } from "react";

const Context = createContext(null);

const obtenerTipo = () => {
  const path = window.location.pathname;
  return path.includes("/cliente") ? "cliente" : "administrador";
};

const ContextProvider = ({ children }) => {
  const [tipo, setTipo] = useState(() => obtenerTipo());
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const tipoActual = obtenerTipo();
    if (tipoActual !== tipo) {
      setTipo(tipoActual);
    }
  }, [tipo]);

  return <Context.Provider value={{ tipo, setTipo, auth }}>{children}</Context.Provider>;
};

export { Context };
export default ContextProvider;
