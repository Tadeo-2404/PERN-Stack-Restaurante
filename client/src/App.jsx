import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Inicio from './pages/cliente/Inicio';
import IniciarSesion from './pages/cliente/IniciarSesion';
import Error404 from './pages/cliente/Error404';
import ClienteLayout from './layouts/clienteLayout';
import Registrarse from './pages/cliente/Registrarse';
import OlvideContraseña from './pages/cliente/OlvideContraseña';
import { RestablecerContraseña } from './pages/cliente/RestablecerContraseña';
import ConfirmarCuenta from './pages/cliente/ConfirmarCuenta';
export default function App() {
  return (
    <>
      <Router>
        <Routes>
           <Route path='/cliente' element={<ClienteLayout/>}>
              <Route index  element={<Inicio/>}/>
              <Route path='iniciar-sesion' element={<IniciarSesion/>}/>
              <Route path='registrarse' element={<Registrarse />}/>
              <Route path='olvide-contrasena' element={<OlvideContraseña />}/>
              <Route path='restablecer-contrasena/:token' element={<RestablecerContraseña />}/>
              <Route path='confirmar-cuenta/:token' element={<ConfirmarCuenta />}/>              
              <Route path='*' element={<Error404/>} />
           </Route>
           <Route path='*' element={<Error404/>} />
        </Routes>
      </Router>
    </>
  );
}
