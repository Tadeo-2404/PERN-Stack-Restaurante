import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { cerrar_sesion, confirmar_cuenta, editar_perfil, eliminar_perfil, obtener_clientes, olvide_contrasena, perfil, restablecer_contrasena } from "../api/usuario";

const Context = createContext(null);

const ContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [tipo, setTipo] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [busquedaCliente, setBusquedaCliente] = useState("");
  const [usuario, setUsuario] = useState({});
  const [propsOrdenes, setPropsOrdenes] = useState({id: null, clienteId: null, total: 0});
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
    obtenerCookie();
  }, [location.pathname]);

  const cerrarSesion = async () => {
    const jwt = Cookies.get("acceso_token");
    if(!jwt) return;
    try {
      const cerrar = await cerrar_sesion(tipo, jwt);
      setUsuario({});
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

  const olvideContrasena = async (correo) => {
    try {
      const response = await olvide_contrasena(correo, tipo);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

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
        cerrarSesion,
        editarUsuario,
        eliminarUsuario,
        confirmarCuenta,
        olvideContrasena,
        propsOrdenes,
        setPropsOrdenes,
        busquedaCliente,
        setBusquedaCliente
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context };
export default ContextProvider;
