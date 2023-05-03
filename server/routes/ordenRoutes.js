import express from 'express';
import { crear_orden, editar_orden, eliminar_orden, obtener_ordenes } from '../controllers/Orden.js';
const router = express.Router();

//crear registro orden
router.post('/', crear_orden);

//obtener registros orden
router.get('/', obtener_ordenes);

//editar registros orden
router.put('/', editar_orden);

//eliminar registros orden
router.delete('/', eliminar_orden);

export default router;