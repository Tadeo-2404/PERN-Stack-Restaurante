import {
  Routes,
  Route,
  BrowserRouter as Router,
  useNavigate,
  Navigate,
} from "react-router-dom";
//layout
import TemplateLayout from "./layouts/TemplateLayout"; //layout
//usuario
import Inicio from "./pages/usuario/Inicio"; //pagina inicio
import IniciarSesion from "./pages/usuario/IniciarSesion"; //pagina inciar sesion
import Registrarse from "./pages/usuario/Registrarse"; //pagina registrarse
import OlvideContraseña from "./pages/usuario/OlvideContraseña"; //pagina mandar correo recuperar contraseña
import RestablecerContraseña from "./pages/usuario/RestablecerContraseña"; //pagina nueva contraseña
import ConfirmarCuenta from "./pages/usuario/ConfirmarCuenta"; //pagina confirmar cuenta
import Perfil from "./pages/usuario/Perfil";
//error 404
import Error404 from "./pages/Error404";
//context
import ContextProvider, { Context } from "./context/ContextProvider";
//plaltillos
import Platillos from "./pages/platillo/Platillos";
import EditarPlatillo from "./pages/platillo/EditarPlatillo";
//ordenes
import Ordenes from "./pages/orden/Ordenes";
import EditarOrden from "./pages/orden/EditarOrden";
import OrdenDetalle from "./pages/orden/OrdenDetalle";
import PerfilEliminar from "./pages/usuario/PerfilEliminar";
import Principal from "./pages/Principal";
import Clientes from "./pages/usuario/Clientes";
import { useContext } from "react";
import Cookies from "js-cookie";

//funcion que protege las rutas del cliente
function ClienteRoutesGuard() {
  const { usuario } = useContext(Context); //obtener usuario
  const jwt = Cookies.get("acceso_token"); //obtener cookie

  //protegemos rutas exclusivas
  if(usuario.rol === "administrador") {
    return <Navigate to={"/administrador"}/>
  }

  return (
    <Routes>
      {/* rutas publicas de usuario */}
      <Route path="iniciar-sesion" element={jwt ? <Navigate to={"/cliente"}/> : <IniciarSesion />} />
      <Route path="registrarse" element={jwt ? <Navigate to={"/cliente"}/> : <Registrarse />} />
      <Route path="olvide-contrasena" element={jwt ?  <Navigate to={"/cliente"}/> : <OlvideContraseña />} />
      <Route path="restablecer-contrasena/:token" element={jwt ?  <Navigate to={"/cliente"}/> : <RestablecerContraseña />}/>
      <Route path="confirmar-cuenta/:token" element={jwt ?  <Navigate to={"/cliente"}/> : <ConfirmarCuenta />} />
      {/* rutas protegidas de usuario */}
      <Route path="/" element={jwt ? <Inicio /> : <Navigate to={"/"} />} />
      <Route path="platillo" element={jwt ? <Platillos /> : <Navigate to={"/"} />}/>
      <Route path="orden" element={jwt ? <Ordenes /> : <Navigate to={"/"} />} />
      <Route path="orden/editar-orden" element={jwt ? <EditarOrden /> : <Navigate to={"/"} />}/>
      <Route path="orden/detalle-orden" element={jwt ? <OrdenDetalle /> : <Navigate to={"/"} />}/>
      <Route path="perfil" element={jwt ? <Perfil /> : <Navigate to={"/"} />} />
      <Route path="perfil/eliminar" element={jwt ? <PerfilEliminar /> : <Navigate to={"/"} />}
      />
    </Routes>
  );
}

//funcion que protege las rutas del administrador
function AdministradorRoutesGuard() {
  const { usuario } = useContext(Context); //obtener usuario
  const jwt = Cookies.get("acceso_token"); //obtener cookie

  //protegemos rutas exclusivas
  if(usuario.rol === "cliente") {
    return <Navigate to={"/cliente"}/>
  }

  return (
    <Routes>
      {/* rutas de usuario publicas */}
      <Route path="iniciar-sesion" element={jwt ? <Navigate to={"/administrador"}/> : <IniciarSesion />} />
      <Route path="registrarse" element={jwt ? <Navigate to={"/administrador"}/> : <Registrarse />} />
      <Route path="olvide-contrasena" element={jwt ?  <Navigate to={"/administrador"}/> : <OlvideContraseña />} />
      <Route path="restablecer-contrasena/:token" element={jwt ?  <Navigate to={"/administrador"}/> : <RestablecerContraseña />}/>
      {/* rutas de usuario protegidas */}
      <Route path="/" element={jwt ? <Inicio /> : <Navigate to={"/"} />} />
      <Route path="orden" element={jwt ? <Ordenes /> : <Navigate to={"/"} />} />
      <Route path="orden/editar-orden" element={jwt ? <EditarOrden /> : <Navigate to={"/"} />}/>
      <Route path="orden/detalle-orden" element={jwt ? <OrdenDetalle /> : <Navigate to={"/"} />}/>
      <Route path="platillo" element={jwt ? <Platillos /> : <Navigate to={"/"} />}/>
      <Route path="platillo/editar-platillo"element={jwt ? <EditarPlatillo /> : <Navigate to={"/"} />}/>
      <Route path="perfil" element={jwt ? <Perfil /> : <Navigate to={"/"} />} />
      <Route path="perfil/eliminar" element={jwt ? <PerfilEliminar /> : <Navigate to={"/"} />}/>
      <Route path="clientes" element={jwt ? <Clientes /> : <Navigate to={"/"} />}/>
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <ContextProvider>
        <Routes>
          <Route path="/" element={<TemplateLayout />}>
            <Route index element={<Principal />} />
            <Route path="cliente/*" element={<ClienteRoutesGuard />} />
            <Route
              path="administrador/*"
              element={<AdministradorRoutesGuard />}
            />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </ContextProvider>
    </Router>
  );
}
