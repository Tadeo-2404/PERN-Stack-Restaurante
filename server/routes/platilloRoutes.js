import express from "express";
const router = express.Router(); //usar express router
import { crear_platillo, obtener_platillos, editar_platillo, eliminar_platillo } from "../controllers/Platillo.js"; //importar controllers de platillo

//ruta para crear un platillo
router.post('/', crear_platillo);

//ruta para obtener platillos
router.get('/', obtener_platillos);

//ruta para editar un platillo
router.put('/', editar_platillo);

//ruta para eliminar un platillo
router.delete('/', eliminar_platillo);