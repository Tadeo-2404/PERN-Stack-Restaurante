import express from 'express';
import { cerrar_sesion, confirmar_cuenta, editar_perfil, eliminar_perfil, iniciar_sesion, olvide_contrasena, perfil, registrarse, restablecer_contrasena } from '../controllers/Cliente.js';
import authorization from '../middleware/authorization.js';
const router = express.Router();

//ruta inciar-sesion
router.post('/iniciar-sesion', iniciar_sesion);

//ruta para registrarse
router.post('/registrarse', registrarse);

//ruta para confirmar cuenta
router.get('/confirmar-cuenta/:token', confirmar_cuenta);

//ruta para mandar correo restablecer contraseña
router.post('/olvide-contrasena', olvide_contrasena);

//ruta para establecer nueva contraseña
router.post('/restablecer-contrasena/:token', restablecer_contrasena);

/* PRIVADO */
//ruta para cerrar sesion
router.get('/cerrar-sesion', authorization ,cerrar_sesion);

//ruta para obtener perfil
router.get('/perfil', authorization ,perfil);

//ruta para eliminar perfil
router.post('/perfil/editar', authorization , editar_perfil);

//ruta para eliminar perfil
router.post('/perfil/eliminar', authorization ,eliminar_perfil);


export default router