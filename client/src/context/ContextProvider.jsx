import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { cerrar_sesion, editar_perfil, eliminar_perfil, perfil } from "../api/usuario";
import { obtener_platillos } from "../api/platillo";
import { obtener_ordenes } from "../api/orden";

const Context = createContext(null);

const obtenerTipo = () => {
  const path = window.location.pathname;
  return path.includes("/cliente") ? "cliente" : "administrador";
};


const ContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [tipo, setTipo] = useState(() => obtenerTipo());
  const [usuario, setUsuario] = useState({});
  const [platillos, SetPlatillos] = useState([]);
  const [ordenes, SetOrdenes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    //obtener los platillos
    const obtenerPlatillos = async (params) => {
      try {
        const platillos = await obtener_platillos(params);
        SetPlatillos(platillos);
      } catch (error) {
        console.log(error);
      }
    }

      //obtener las ordenes
      const obtenerOrdenes = async (params) => {
        try {
          const ordenes = await obtener_ordenes(params);
          SetOrdenes(ordenes);
        } catch (error) {
          console.log(error);
        }
      }

    //obtener cookie y asignar valor usuario
    const obtenerCookie = async () => {
      const jwt = Cookies.get("acceso_token");
      setToken(jwt);
      if(!jwt) {
        navigate(`/${tipo}/iniciar-sesion`);
        return;
      }

      const token = jwt_decode(jwt);
      if(token && tipo !== token.rol) {
        setTipo(token.rol); 
        navigate(`/${token.rol}`);
        return;
      }

      try {
        const usuario = await perfil(tipo, jwt);
        setUsuario({id: usuario.id, nombre: usuario.nombre, correo: usuario.correo, telefono: usuario.telefono, rol: token.rol});
      } catch (error) {
        console.log(error)
      }
    }
    obtenerPlatillos();
    obtenerOrdenes();
    obtenerCookie();
  }, []);
  
  const cerrarSesion = async () => {
    const jwt = Cookies.get("acceso_token");
    try {
      const cerrar = await cerrar_sesion(tipo, jwt);
      setUsuario({});
      SetPlatillos({});
      Cookies.remove('acceso_token');
      navigate(`/${tipo}/iniciar-sesion`);
      return cerrar;
    } catch (error) {
      console.log(error)
    }
  }

  const editarUsuario = async (user) => {
    try {
      const editado = await editar_perfil(tipo ,token, user);
      return editado;
    } catch (error) {
      console.log(error)
    }
  }

  const eliminarUsuario = async () => {
    try {
      const eliminado = await eliminar_perfil(tipo ,token, {id: usuario.id});
      setUsuario({});
      setToken({});
      Cookies.remove('acceso_token');
      navigate(`/${tipo}/iniciar-sesion`);
      return eliminado;
    } catch (error) {
      console.log(error)
    }
  }

  return <Context.Provider value={{ tipo, setTipo, usuario, platillos, SetPlatillos, cerrarSesion, editarUsuario, eliminarUsuario, ordenes }}>{children}</Context.Provider>;
};

export { Context };
export default ContextProvider;
