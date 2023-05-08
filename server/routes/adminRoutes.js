import express from 'express';
import { cerrar_sesion, perfil } from '../controllers/Cliente.js';
import authorization from '../middleware/authorization.js';
import { iniciar_sesion, olvide_contrasena, registrarse, restablecer_contrasena } from '../controllers/Administrador.js';
const router = express.Router();

//ruta inciar-sesion
router.post('/iniciar-sesion', iniciar_sesion);

//ruta para registrarse
router.post('/registrarse', registrarse);

//ruta para mandar correo restablecer contraseña
router.post('/olvide-contrasena', olvide_contrasena);

//ruta para establecer nueva contraseña
router.post('/restablecer-contrasena/:token', restablecer_contrasena);

//ruta para cerrar sesion
router.get('/cerrar-sesion', authorization ,cerrar_sesion);

/* PRIVADO */
router.get('/perfil', authorization ,perfil);

export default router