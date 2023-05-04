import express from 'express';
import { confirmar_cuenta, iniciar_sesion, olvide_contrasena, registrarse, restablecer_contrasena } from '../controllers/Cliente.js';
const router = express.Router();

//ruta inciar-sesion
router.post('/inciar-sesion', iniciar_sesion);

//ruta para registrarse
router.post('/registrarse', registrarse);

//ruta para confirmar cuenta
router.get('/confirmar-cuenta/:id', confirmar_cuenta);

//ruta para mandar correo restablecer contraseña
router.post('/olvide-contrasena', olvide_contrasena);

//ruta para establecer nueva contraseña
router.post('/restablecer-contrasena/:id', restablecer_contrasena);

export default router