import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

//paginas cliente
import Inicio from "./pages/Inicio";
import IniciarSesion from "./pages/IniciarSesion";
import Error404 from "./pages/Error404";
import TemplateLayout from "./layouts/TemplateLayout";
import Registrarse from "./pages/Registrarse";
import OlvideContraseña from "./pages/OlvideContraseña";
import RestablecerContraseña from "./pages/RestablecerContraseña";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";
import ContextProvider from "./context/ContextProvider";
import Platillos from "./pages/platillo/Platillos";
import EditarPlatillo from "./pages/platillo/EditarPlatillo";
import Ordenes from "./pages/orden/Ordenes";
import EditarOrden from "./pages/orden/EditarOrden";
import OrdenDetalle from "./pages/orden/OrdenDetalle";
export default function App() {
  return (
    <>
      <Router>
        <ContextProvider>
          <Routes>
            <Route path="/cliente" element={<TemplateLayout />}>
              <Route index element={<Inicio />} />
              <Route path="iniciar-sesion" element={<IniciarSesion />} />
              <Route path="registrarse" element={<Registrarse />} />
              <Route path="olvide-contrasena" element={<OlvideContraseña />} />
              <Route path="restablecer-contrasena/:token" element={<RestablecerContraseña />}/>
              <Route path="confirmar-cuenta/:token" element={<ConfirmarCuenta />}/>

              <Route path="platillo" element={<Platillos />} />
              <Route path="orden" element={<Ordenes />} />
              <Route path="orden/editar-orden" element={<EditarOrden />} />
              <Route path="orden/detalle-orden" element={<OrdenDetalle />} />
              <Route path="*" element={<Error404 />} />
            </Route>

            <Route path="/administrador" element={<TemplateLayout />}>
              <Route index element={<Inicio />} />
              <Route path="iniciar-sesion" element={<IniciarSesion />} />
              <Route path="registrarse" element={<Registrarse />} />
              <Route path="olvide-contrasena" element={<OlvideContraseña />} />
              <Route path="restablecer-contrasena/:token" element={<RestablecerContraseña />}/>
              <Route path="confirmar-cuenta/:token"element={<ConfirmarCuenta />}/>

              <Route path="platillo" element={<Platillos />} />
              <Route path="platillo/editar-platillo" element={<EditarPlatillo />} />
              <Route path="*" element={<Error404 />} />
            </Route>
            <Route path="*" element={<Error404 />} />
          </Routes>
        </ContextProvider>
      </Router>
    </>
  );
}
