import { Routes, Route, BrowserRouter as Router, useNavigate, Navigate } from "react-router-dom";
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


function ClienteRoutesGuard() {
  const { tipo } = useContext(Context);

  if (tipo !== "cliente") {
    return <Navigate to="/cliente" />;
  }

  return (
    <Routes>
      {/* Define your protected routes here */}
      <Route path="/" element={<Inicio />} />
      <Route path="iniciar-sesion" element={<IniciarSesion />} />
      <Route path="registrarse" element={<Registrarse />} />
      <Route path="olvide-contrasena" element={<OlvideContraseña />} />
      <Route path="restablecer-contrasena/:token" element={<RestablecerContraseña />}/>
      <Route path="confirmar-cuenta/:token" element={<ConfirmarCuenta />}/>
      <Route path="platillo" element={<Platillos />} />
      <Route path="orden" element={<Ordenes />} />
      <Route path="orden/editar-orden" element={<EditarOrden />} />
      <Route path="orden/detalle-orden" element={<OrdenDetalle />} />
      <Route path="perfil" element={<Perfil />} />
      <Route path="perfil/eliminar" element={<PerfilEliminar/>} />
    </Routes>
  );
}

function AdministradorRoutesGuard() {
  const { tipo } = useContext(Context);

  if (tipo !== "administrador") {
    return <Navigate to="/administrador" />;
  }

  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/iniciar-sesion" element={<IniciarSesion />} />
      <Route path="registrarse" element={<Registrarse />} />
      <Route path="olvide-contrasena" element={<OlvideContraseña />} />
      <Route path="restablecer-contrasena/:token" element={<RestablecerContraseña />}/>
      <Route path="orden" element={<Ordenes />} />
      <Route path="platillo" element={<Platillos />} />
      <Route path="platillo/editar-platillo" element={<EditarPlatillo />} />
      <Route path="perfil" element={<Perfil />} />
      <Route path="perfil/eliminar" element={<PerfilEliminar/>} />
      <Route path="clientes" element={<Clientes/>}/>
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
            <Route path="administrador/*" element={<AdministradorRoutesGuard />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </ContextProvider>
    </Router>
  );
}