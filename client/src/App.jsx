import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
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
import ContextProvider from "./context/ContextProvider";
//plaltillos
import Platillos from "./pages/platillo/Platillos";
import EditarPlatillo from "./pages/platillo/EditarPlatillo";
//ordenes
import Ordenes from "./pages/orden/Ordenes";
import EditarOrden from "./pages/orden/EditarOrden";
import OrdenDetalle from "./pages/orden/OrdenDetalle";
import PerfilEliminar from "./pages/usuario/PerfilEliminar";
import Principal from "./pages/Principal";

export default function App() {
  return (
    <>
      <Router>
        <ContextProvider>
          <Routes>
            <Route path="/" element={<TemplateLayout />}>
              <Route index element={<Principal />} />

              {/* CLIENTE */}
              <Route path="cliente" element={<Inicio />} />
              <Route path="cliente/iniciar-sesion" element={<IniciarSesion />} />
              <Route path="cliente/registrarse" element={<Registrarse />} />
              <Route path="cliente/olvide-contrasena" element={<OlvideContraseña />} />
              <Route path="cliente/restablecer-contrasena/:token" element={<RestablecerContraseña />}/>
              <Route path="cliente/confirmar-cuenta/:token" element={<ConfirmarCuenta />}/>
              <Route path="cliente/platillo" element={<Platillos />} />
              <Route path="cliente/orden" element={<Ordenes />} />
              <Route path="cliente/orden/editar-orden" element={<EditarOrden />} />
              <Route path="cliente/orden/detalle-orden" element={<OrdenDetalle />} />
              <Route path="cliente/perfil" element={<Perfil />} />
              <Route path="cliente/perfil/eliminar" element={<PerfilEliminar/>} />

              {/* ADMINISTRADOR */}
              <Route path="administrador" element={<Inicio />} />
              <Route path="administrador/iniciar-sesion" element={<IniciarSesion />} />
              <Route path="administrador/registrarse" element={<Registrarse />} />
              <Route path="administrador/olvide-contrasena" element={<OlvideContraseña />} />
              <Route path="administrador/restablecer-contrasena/:token" element={<RestablecerContraseña />}/>
              <Route path="administrador/orden" element={<Ordenes />} />
              <Route path="administrador/platillo" element={<Platillos />} />
              <Route path="administrador/platillo/editar-platillo" element={<EditarPlatillo />} />
              <Route path="administrador/perfil" element={<Perfil />} />
              <Route path="administrador/perfil/eliminar" element={<PerfilEliminar/>} />
            </Route>
            <Route path="*" element={<Error404 />} />
          </Routes>
        </ContextProvider>
      </Router>
    </>
  );
}
