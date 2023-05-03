import { Op } from 'sequelize';
import { cadenaRegex, flotanteRegex, cadenaLengthRegex, enteroRegex } from '../helpers/utils.js';
import Platillo from '../models/PlatilloModel.js';

const crear_platillo = async (req, res) => {
    const { nombre, descripcion, precio } = req.body; //leer input 

    //validar nombre
    if(!cadenaRegex.test(nombre) && nombre.length == 0) {
        const error = new Error(`${nombre} no es un nombre valido`);
        res.status(400).json({msg: error.message});
        return;
    }

    //validar descripcion
    if(!cadenaLengthRegex.test(descripcion)) {
        const error = new Error(`${descripcion} no es una descripcion valida`);
        res.status(400).json({msg: error.message});
        return;
    }

    //validar precio
    if(!flotanteRegex.test(precio)) {
        const error = new Error(`${precio} no es un precio valida`);
        res.status(400).json({msg: error.message});
        return;
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
            return;
        }
    } else {
        const error = new Error(`Registro con el nombre: ${nombre} ya existe`);
        res.status(400).json({msg: error.message});
        return;
    }
}

const obtener_platillos = async (req, res) => {
    const { limite, id, nombre, descripcion, precio } = req.query; //leer parametros

    //validacion formato id
    if(id) {
        if(!enteroRegex.test(id)) {
            const error = new Error("ID no tiene un formato valido");
            return res.status(400).json({msg: error.message});
        }
    }

    //validacion formato limite
    if(limite) {
        if(!enteroRegex.test(limite)) {
            const error = new Error("Limite no tiene un formato valido");
            return res.status(400).json({msg: error.message});
        }
    }

    //validacion formato precio
    if(precio) {
        if(!enteroRegex.test(precio) || !flotanteRegex.test(precio)) {
            const error = new Error("Precio no tiene un formato valido");
            res.status(400).json({msg: error.message});
        }
    }

    //asignar valores a where
    let where = {};
    if(id) where.id = id;
    if(nombre) where.nombre = { [Op.like]: `%${nombre}%` };
    if(descripcion) where.descripcion = { [Op.like]: `%${descripcion}%` };
    if(precio) where.precio = precio;

    //realizar consulta a la base de datos
    const consulta = await Platillo.findAll({where,
    limit: limite})

    res.status(200).json(consulta);
}

const editar_platillo = async (req, res) => {
    const { id } = req.query; //leer id parametro
    const { nombre, descripcion, precio } = req.body; //leer formulario

    //validacion id
    if(!id) {
        const error = new Error("El ID es obligatorio");
        return res.status(400).json({msg: error.message});
    } 

    //validacion formato id
    if (!enteroRegex.test(id)) {
        const error = new Error("ID no tiene un formato valido");
        return res.status(400).json({ msg: error.message });
    }

    //validacion formato nombre
    if(nombre) {
        if(!cadenaRegex.test(nombre)) {
            const error = new Error("El nombre no tiene un formato valido");
            return res.status(400).json({msg: error.message});
        }
    }

    //validacion formato descripcion
    if(descripcion) {
        if(!cadenaLengthRegex.test(descripcion)) {
            const error = new Error("La descripcion no tiene un formato valido");
            return res.status(400).json({msg: error.message});
        }
    }

    //validacion formato precio
    if(precio) {
        if(!enteroRegex.test(precio)) {
            const error = new Error("El precio no tiene un formato valido");
            return res.status(400).json({msg: error.message});
        }
    }

    if(!nombre && !descripcion && !precio) {
        const error = new Error("Al menos un campo es obligatorio");
        return res.status(404).json({msg: error.message});
    }
    
    //buscar platillo por ID
    const existePlatillo = await Platillo.findByPk(id); 

    //validar si el registro con el ID no fue encontrado
    if(!existePlatillo) {
        const error = new Error(`El platillo con el ID ${id} no existe`);
        return res.status(404).json({msg: error.message});
    }

    //asignar valores
    existePlatillo.nombre = nombre || existePlatillo.nombre;
    existePlatillo.descripcion = descripcion || existePlatillo.descripcion;
    existePlatillo.precio = precio || existePlatillo.precio;

    try {
        await existePlatillo.save(); //guardar cambios
        res.status(200).json({msg: `Registro con el ID ${id} editado correctamente`});
    } catch (e) {
        const error = new Error(`No se pudo editar el Platillo con el ID ${id}`);
        return res.status(400).json({msg: error.message});
    }
}

const eliminar_platillo = async (req, res) => {
    const { id } = req.query; //leer id parametro

    //validacion id
    if(!id) {
        const error = new Error("El ID es obligatorio");
        return res.status(400).json({msg: error.message});
    } 

    //validacion formato id
    if (!enteroRegex.test(id)) {
        const error = new Error("ID no tiene un formato valido");
        return res.status(400).json({ msg: error.message });
    }
    
    //buscar platillo por ID
    const existePlatillo = await Platillo.findByPk(id); 

    //validar si el registro con el ID no fue encontrado
    if(!existePlatillo) {
        const error = new Error(`El platillo con el ID ${id} no existe`);
        return res.status(404).json({msg: error.message});
    }

    try {
        await existePlatillo.destroy(); //guardar cambios
        res.status(200).json({msg: `Registro con el ID ${id} eliminado correctamente`});
    } catch (e) {
        const error = new Error(`No se pudo eliminar el Platillo con el ID ${id}`);
        return res.status(400).json({msg: error.message});
    }
}

export {
    crear_platillo, 
    obtener_platillos,
    editar_platillo,
    eliminar_platillo
}