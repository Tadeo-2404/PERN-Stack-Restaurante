import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { cerrar_sesion, confirmar_cuenta, editar_perfil, eliminar_perfil, perfil } from "../api/usuario";
import { obtener_platillos } from "../api/platillo";
import { obtener_ordenes } from "../api/orden";

const Context = createContext(null);

const ContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [tipo, setTipo] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [usuario, setUsuario] = useState({});
  const [platillos, SetPlatillos] = useState([]);
  const [ordenes, SetOrdenes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerTipo = () => {
      const path = window.location.pathname;
      if (path.includes("/cliente")) {
        setTipo("cliente");
      } else if (path.includes("/administrador")) {
        setTipo("administrador");
      } else {
        setTipo("/")
      }
    };

    const protegerRutas = () => {
      const ruta = window.location.pathname;
      const esCliente = usuario?.rol === "cliente";
      const esAdministrador = usuario?.rol === "administrador";
      const jwt = Cookies.get("acceso_token");
      
      if(!usuario.rol && (esAdministrador || esCliente)) {
        navigate("/");
        return;
      } else if(esCliente && (
        ruta === "/" ||
        ruta === "/cliente/iniciar-sesion" ||
        ruta === "/cliente/registrarse" ||
        ruta === "/cliente/olvide-contrasena" ||
        ruta === "/cliente/restablecer-contrasena/:token" ||
        ruta === "/cliente/confirmar-cuenta/:token" ||
        ruta === "/administrador" ||
        ruta === "/administrador/iniciar-sesion" ||
        ruta === "/administrador/registrarse" ||
        ruta === "/administrador/olvide-contrasena" ||
        ruta === "/administrador/restablecer-contrasena/:token" ||
        ruta === "/administrador/orden" ||
        ruta === "/administrador/platillo" || 
        ruta === "/administrador/platillo/editar-platillo" ||
        ruta === "/administrador/perfil" ||
        ruta === "/administrador/perfil/eliminar"
      )) {
        navigate('/cliente')
      } else if(esAdministrador && (
        ruta === "/" ||
        ruta === "/administrador/iniciar-sesion" ||
        ruta === "/administrador/registrarse" ||
        ruta === "/administrador/olvide-contrasena" ||
        ruta === "/administrador/restablecer-contrasena/:token" ||
        ruta === "/cliente" ||
        ruta === "/cliente/iniciar-sesion" ||
        ruta === "/cliente/registrarse" ||
        ruta === "/cliente/olvide-contrasena" ||
        ruta === "/cliente/restablecer-contrasena/:token" ||
        ruta === "/cliente/confirmar-cuenta/:token" ||
        ruta === "/cliente/platillo" ||
        ruta === "/cliente/orden" ||
        ruta === "/cliente/orden/editar-orden" ||
        ruta === "/cliente/orden/detalle-orden" ||
        ruta === "/cliente/perfil" ||
        ruta === "/cliente/perfil/eliminar" 
      )) {
        navigate('/administrador')
      } else if(esCliente && !jwt && (
        ruta === "/cliente" ||
        ruta === "/cliente/platillo" ||
        ruta === "/cliente/orden" ||
        ruta === "/cliente/orden/editar-orden" ||
        ruta === "/cliente/orden/detalle-orden" ||
        ruta === "/cliente/perfil" ||
        ruta === "/cliente/perfil/eliminar" 
      )) {
        navigate('/')
      }  else if(esAdministrador && !jwt && (
        ruta === "/administrador" ||
        ruta === "/administrador/orden" ||
        ruta === "/administrador/platillo" || 
        ruta === "/administrador/platillo/editar-platillo" ||
        ruta === "/administrador/perfil" ||
        ruta === "/administrador/perfil/eliminar"
      )) {
        navigate('/')
      }
    };

    //obtener los platillos
    const obtenerPlatillos = async (params) => {
      try {
        const platillos = await obtener_platillos(params);
        SetPlatillos(platillos);
      } catch (error) {
        console.log(error);
      }
    };

    //obtener las ordenes
    const obtenerOrdenes = async (params) => {
      try {
        const ordenes = await obtener_ordenes(params);
        SetOrdenes(ordenes);
      } catch (error) {
        console.log(error);
      }
    };

    //obtener cookie y asignar valor usuario
    const obtenerCookie = async () => {
      const jwt = Cookies.get("acceso_token");
      if(!jwt) return;
      setToken(jwt);

      const token = jwt_decode(jwt);
      if (token && tipo !== token.rol) {
        setTipo(token.rol);
        navigate(`/${token.rol}`);
        return;
      }

      try {
        const usuario = await perfil(tipo, jwt);
        setUsuario({
          id: usuario.id,
          nombre: usuario.nombre,
          correo: usuario.correo,
          telefono: usuario.telefono,
          rol: token.rol,
        });
      } catch (error) {
        console.log(error);
      }
    };

    obtenerTipo();
    protegerRutas();
    obtenerCookie();
    obtenerPlatillos();
    obtenerOrdenes();
  }, [location.pathname]);

  const cerrarSesion = async () => {
    const jwt = Cookies.get("acceso_token");
    if(!jwt) return;
    try {
      const cerrar = await cerrar_sesion(tipo, jwt);
      setUsuario({});
      SetPlatillos({});
      Cookies.remove("acceso_token");
      navigate('/');
      return cerrar;
    } catch (error) {
      console.log(error);
    }
  };

  const editarUsuario = async (user) => {
    try {
      const editado = await editar_perfil(tipo, token, user);
      return editado;
    } catch (error) {
      console.log(error);
    }
  };

  const confirmarCuenta = async (token) => {
      const confirmar = await confirmar_cuenta(token);
      return confirmar;
  }

  const eliminarUsuario = async () => {
    try {
      const eliminado = await eliminar_perfil(tipo, token, { id: usuario.id });
      setUsuario({});
      setToken({});
      Cookies.remove("acceso_token");
      navigate(`/${tipo}/iniciar-sesion`);
      return eliminado;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Context.Provider
      value={{
        tipo,
        setTipo,
        busqueda,
        setBusqueda,
        usuario,
        platillos,
        SetPlatillos,
        cerrarSesion,
        editarUsuario,
        eliminarUsuario,
        confirmarCuenta,
        ordenes,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context };
export default ContextProvider;
