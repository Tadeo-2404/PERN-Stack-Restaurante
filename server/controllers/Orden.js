import { dateOnlyRegex, enteroRegex, flotanteRegex } from '../helpers/utils.js';
import Cliente from '../models/ClienteModel.js';
import Orden_Detalle from '../models/OrdenDetalleModel.js';
import Orden from '../models/OrdenModel.js';
import Platillo from '../models/PlatilloModel.js';
import { crear_orden_detalle } from './OrdenDetalle.js';

const crear_orden = async (req, res) => {
    const { fecha, clienteId, platillosArr } = req.body; //leer input
 
    let total = 0; //inicializar total

    //validar campos no vacios
    if(!fecha || !clienteId) {
        const error = new Error("Todos los campos son obligatorios");
        res.status(400).json({msg: error.message});
    }

    //validar formato id
    if(!flotanteRegex.test(clienteId)) {
        const error = new Error("Formato de clienteId no valido");
        res.status(400).json({msg: error.message});    
    }

    //validar arreglo
    if(platillosArr.length == 0) {
        const error = new Error("Se necesita al menos un producto para crear una Orden");
        res.status(400).json({msg: error.message});    
    }

    //buscar cliente por ID
    const existeCliente = await Cliente.findByPk(clienteId);

    //validar cliente existente
    if(!existeCliente) {
        const error = new Error(`Cliente con el ID ${clienteId} no existe`);
        res.status(400).json({msg: error.message});  
    }

    try {        
        // Verificar si cada platillo existe en la base de datos
        let platillosNoValidos = 0;
        for (const platillo of platillosArr) {
          const existe = await Platillo.findOne({ where: { id: platillo.id } });
          if (!existe) platillosNoValidos++;
        }
        // Si todos los platillos son validos, ejecutamos lo siguiente
        if (platillosNoValidos === 0) {
            console.log(platillosNoValidos);
            const orden = await Orden.create({ fecha, total, clienteId }); //creamos la orden

            //iteramos sobre el arreglo de platillos
            platillosArr.forEach(async platillo => {
                let subtotal = platillo.precio * platillo.cantidad;
                total = total + subtotal;

                //con cada platillo creamos un registro de orden_platillo
                await crear_orden_detalle({
                    ordenId: orden.id,
                    platilloId: platillo.id,
                    precio_unitario: platillo.precio,
                    cantidad: platillo.cantidad,
                    subtotal
                });
            });
            orden.total = total;
            await orden.save(); //guardamos la orden
            res.status(200).json(orden);
        } else {
            res.status(400).json({msg: 'Existen platillos no validos'});
        }
    } catch (e) {
        const error = new Error(e.name);
        res.status(404).json({msg: error.message});
    }    
}

const obtener_ordenes = async (req, res) => {
    const { limite, id, fecha, total } = req.query; //leer parametros

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

    //validacion formato total
    if(total) {
        if(!enteroRegex.test(total) || !flotanteRegex.test(total)) {
            const error = new Error("Total no tiene un formato valido");
            res.status(400).json({msg: error.message});
        }
    }

    //validacion formato fecha
    if(fecha) {
        if(!dateOnlyRegex.test(fecha)) {
            const error = new Error("Fecha no tiene un formato valido");
            res.status(400).json({msg: error.message});
        }
    }

    //asignar valores a where
    let where = {};
    if(id) where.id = id;
    if(fecha) where.fecha = { [Op.like]: `%${fecha}%` };
    if(total) where.total = total;

    //realizar consulta a la base de datos
    const consulta = await Orden.findAll({where,
    limit: limite})

    res.status(200).json(consulta);
}

const editar_orden = async (req, res) => {
    const { id } = req.query;
    const { fecha } = req.body; 

    //validacion campo id
    if(!id) {
        const error = new Error("El ID es obligatorio");
        return res.status(400).json({msg: error.message});
    }

    //validacion formato id
    if(!enteroRegex.test(id)) {
        const error = new Error("El formato de ID no es valido");
        return res.status(400).json({msg: error.message});
    }

    if(!fecha) {
        const error = new Error("La fecha es obligatoria");
        return res.status(400).json({msg: error.message});
    }

    //buscar orden por ID
    const existeOrden = await Orden.findByPk(id); 

    //validar si el registro con el ID no fue encontrado
    if(!existeOrden) {
        const error = new Error(`El orden con el ID ${id} no existe`);
        return res.status(404).json({msg: error.message});
    }

    existeOrden.fecha = fecha || existeOrden.fecha;

    try {
        await existeOrden.save(); //guardar cambios
        res.status(200).json({msg: `Registro con el ID ${id} editado correctamente`});
    } catch (e) {
        const error = new Error(`No se pudo eliminar la orden con el ID ${id}`);
        return res.status(400).json({msg: error.message});
    }
}

const eliminar_orden = async (req, res) => {
    const { id } = req.query;

    //validacion campo id
    if(!id) {
        const error = new Error("El ID es obligatorio");
        return res.status(400).json({msg: error.message});
    }

    //validacion formato id
    if(!enteroRegex.test(id)) {
        const error = new Error("El formato de ID no es valido");
        return res.status(400).json({msg: error.message});
    }

    //buscar orden por ID
    const existeOrden = await Orden.findByPk(id); 

    //validar si el registro con el ID no fue encontrado
    if(!existeOrden) {
        const error = new Error(`El orden con el ID ${id} no existe`);
        return res.status(404).json({msg: error.message});
    }

    //eliminar todos los registros orden_Detalle relacionados
    const orden_detalles = await Orden_Detalle.findAll({where: {ordenId: id}});
    orden_detalles.forEach(async orden_detalle => {
        await orden_detalle.destroy();
    })

    try {
        await existeOrden.destroy(); //guardar cambios
        res.status(200).json({msg: `Registro con el ID ${id} eliminado correctamente`});
    } catch (e) {
        const error = new Error(`No se pudo eliminar la orden con el ID ${id}`);
        return res.status(400).json({msg: error.message});
    }
}

export {
    crear_orden,
    obtener_ordenes,
    editar_orden,
    eliminar_orden
}