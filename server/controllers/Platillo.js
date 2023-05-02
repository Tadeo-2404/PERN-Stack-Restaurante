import { cadenaRegex, flotanteRegex, cadenaLengthRegex } from '../helpers/utils.js';
import Platillo from '../models/PlatilloModel.js';

const crear_platillo = async (req, res) => {
    const { nombre, descripcion, precio } = req.body; //leer input 

    //validar nombre
    if(!cadenaRegex.test(nombre) && nombre.length == 0) {
        const error = new Error(`"${nombre}" no es un nombre valido`);
        res.status(400).json({msg: error.message});
    }

    //validar descripcion
    if(!cadenaLengthRegex.test(descripcion)) {
        const error = new Error(`"${descripcion}" no es una descripcion valida`);
        res.status(400).json({msg: error.message});
    }

    //validar precio
    if(!flotanteRegex.test(precio)) {
        const error = new Error(`"${precio}" no es un precio valida`);
        res.status(400).json({msg: error.message});
    }

    //validar que el nombre no exista
    const existeNombre = await Platillo.findOne({where:{ nombre: nombre}});

    //si el nombre no existe
    if(!existeNombre) {
        try {
            //crear registro de platillo
            const platillo = await Platillo.create(req.body);
            res.status(200).json(platillo);
        } catch (e) {
            const error = new Error("No se pudo crear el registro de Platilo");
            res.status(400).json({msg: error.message});
        }
    } else {
        const error = new Error(`"${nombre}" ya existe`);
        res.status(400).json({msg: error.message});
    }
}

const obtener_platillos = (req, res) => {
    res.json({msg: 'obteniendo platillos'})
}

const editar_platillo = (req, res) => {
    res.json({msg: 'editando platillo'})
}

const eliminar_platillo = (req, res) => {
    res.json({msg: 'eliminando platillo'})
}

export {
    crear_platillo, 
    obtener_platillos,
    editar_platillo,
    eliminar_platillo
}