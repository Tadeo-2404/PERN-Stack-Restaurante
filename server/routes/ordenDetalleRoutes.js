import express from 'express';
import { editar_orden_detalle, eliminar_orden_detalle, obtener_orden_detalle } from '../controllers/OrdenDetalle.js';
const router = express.Router();

//obtener registros orden_detalle
router.get('/', obtener_orden_detalle);

//editar registros orden_detalle
router.put('/', editar_orden_detalle);

//eliminar registros orden_detalle
router.delete('/', eliminar_orden_detalle);

export default router;