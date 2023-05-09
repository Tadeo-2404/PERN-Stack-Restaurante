import { enteroRegex, flotanteRegex } from '../helpers/utils.js';
import Orden_Detalle from '../models/OrdenDetalleModel.js';
import Orden from '../models/OrdenModel.js';
import Platillo from '../models/PlatilloModel.js';

const crear_orden_detalle = async (data) => {
    const { platilloId, ordenId, precio_unitario, cantidad, subtotal } = data; //leer datos

    //validar platilloId no vacio
    if (!platilloId) {
        const error = new Error("platilloId es obligatorio");
        console.log(error.message);
    }

    //validar platilloId formato
    if (!enteroRegex.test(platilloId)) {
        const error = new Error("platilloId no tiene un formato valido");
        console.log(error.message);
    }

    //validar ordenId formato
    if (!enteroRegex.test(ordenId)) {
        const error = new Error("ordenId no tiene un formato valido");
        console.log(error.message);
    }

    //buscar platillo por ID
    const existePlatillo = await Platillo.findByPk(platilloId);

    //validar si platillo existe
    if (!existePlatillo) {
        const error = new Error(`El platillo con el ID ${platilloId} no existe`);
        console.log(error.message);
    }

    try {
        await Orden_Detalle.create({ platilloId, ordenId, precio_unitario, cantidad, subtotal });
    } catch (e) {
        const error = new Error("No se pudo crear el registro orden_detalle");
        console.log(error.message);
    }
}

const obtener_orden_detalle = async (req, res) => {
    const { limite, id, precio_unitario, cantidad, subtotal, ordenId } = req.query; //leer parametros

    //validacion formato id
    if (id) {
        if (!enteroRegex.test(id)) {
            const error = new Error("ID no tiene un formato valido");
            return res.status(400).json({ msg: error.message });
        }
    }

    //validacion formato ordenId
    if (ordenId) {
        if (!enteroRegex.test(ordenId)) {
            const error = new Error("ordenId no tiene un formato valido");
            return res.status(400).json({ msg: error.message });
        }
    }

    //validacion formato limite
    if (limite) {
        if (!enteroRegex.test(limite)) {
            const error = new Error("Limite no tiene un formato valido");
            return res.status(400).json({ msg: error.message });
        }
    }

    //validacion formato subtotal
    if (subtotal) {
        if (!enteroRegex.test(subtotal) && !flotanteRegex.test(subtotal)) {
            const error = new Error("Subtotal no tiene un formato valido");
            return res.status(400).json({ msg: error.message });
        }
    }

    //validacion formato precio_unitario
    if (precio_unitario) {
        if (!enteroRegex.test(precio_unitario) && !flotanteRegex.test(precio_unitario)) {
            const error = new Error("precio_unitario no tiene un formato valido");
            return res.status(400).json({ msg: error.message });
        }
    }

    //validacion formato cantidad
    if (cantidad) {
        if (!enteroRegex.test(cantidad) && !flotanteRegex.test(cantidad)) {
            const error = new Error("Cantidad no tiene un formato valido");
            return res.status(400).json({ msg: error.message });
        }
    }

    //asignar valores a where
    let where = {};
    if (id) where.id = id;
    if (ordenId) where.ordenId = ordenId;
    if (precio_unitario) where.precio_unitario = precio_unitario;
    if (cantidad) where.cantidad = cantidad;
    if (subtotal) where.subtotal = subtotal;

    //realizar consulta a la base de datos
    const consulta = await Orden_Detalle.findAll({
        where,
        limit: limite
    })

    return res.status(200).json(consulta);
}

const editar_orden_detalle = async (req, res) => {
    const { id } = req.query;
    const { cantidad, platilloId, ordenId } = req.body; //leer input

    //validacion campo id
    if (!id) {
        const error = new Error("El ID es obligatorio");
        return res.status(400).json({ msg: error.message });
    }

    //validacion formato id
    if (!enteroRegex.test(id)) {
        const error = new Error("El formato de ID no es valido");
        return res.status(400).json({ msg: error.message });
    }

    //validacion platilloId
    if (platilloId) {
        if (!enteroRegex.test(platilloId) || !enteroRegex.test(platilloId)) {
            const error = new Error("El formato de platilloId no es valido");
            return res.status(400).json({ msg: error.message });
        }
    }

    //buscar orden_Detalle por ID
    const existeOrdenDetalle = await Orden_Detalle.findByPk(id);

    //validar si el registro con el ID no fue encontrado
    if (!existeOrdenDetalle) {
        const error = new Error(`La OrdenDetalle con el ID ${id} no existe`);
        return res.status(404).json({ msg: error.message });
    }

    //validacion ordenId
    if (ordenId) {
        if (!enteroRegex.test(ordenId) || !enteroRegex.test(ordenId)) {
            const error = new Error("El formato de ordenId no es valido");
            return res.status(400).json({ msg: error.message });
        }

        //buscar orden por id
        const existeOrden = await Orden.findByPk(ordenId);

        if (!existeOrden) {
            const error = new Error(`La Orden con el ID ${ordenId} no existe`);
            return res.status(400).json({ msg: error.message });
        }

        //restar subtotal a total
        existeOrden.total -= existeOrdenDetalle.subtotal;

        //calcular nuevo subtotal
        existeOrdenDetalle.subtotal = platilloExiste.precio * cantidad;

        //asignar nuevo total
        existeOrden.total += existeOrdenDetalle.subtotal;
        await existeOrden.save();
    }

    //asignar valores si el ID de platillo se modifica
    if (platilloId) {
        const platilloExiste = await Platillo.findByPk(platilloId);

        //buscar orden por id
        const existeOrden = await Orden.findByPk(ordenId);

        if (!existeOrden) {
            const error = new Error(`La Orden con el ID ${ordenId} no existe`);
            return res.status(400).json({ msg: error.message });
        }

        //asignar nuevo precio unitario en base a precio 
        existeOrdenDetalle.precio_unitario = platilloExiste.precio

        //asignar el nuevo id de platillo
        existeOrdenDetalle.platilloId = platilloId;

        //restar subtotal a total
        existeOrden.total -= existeOrdenDetalle.subtotal;

        //calcular nuevo subtotal
        existeOrdenDetalle.subtotal = platilloExiste.precio * cantidad;

        //asignar nuevo total
        existeOrden.total += existeOrdenDetalle.subtotal;
        await existeOrden.save();
    }

    //validacion cantidad
    if (cantidad) {
        if (!enteroRegex.test(cantidad) || !enteroRegex.test(cantidad)) {
            const error = new Error("El formato de cantidad no es valido");
            return res.status(400).json({ msg: error.message });
        }

        //buscar orden por id
        const existeOrden = await Orden.findByPk(existeOrdenDetalle.ordenId);

        if (!existeOrden) {
            const error = new Error(`La Orden con el ID ${existeOrdenDetalle.ordenId} no existe`);
            return res.status(400).json({ msg: error.message });
        }

        //restar total
        existeOrden.total -= existeOrdenDetalle.subtotal;
    
        //asignar nueva cantidad
        existeOrdenDetalle.cantidad = cantidad;

        //asignar nuevo subtotal a orden_detalle
        existeOrdenDetalle.subtotal = cantidad * existeOrdenDetalle.precio_unitario;

        //asignar nuevo total
        existeOrden.total += existeOrdenDetalle.subtotal;
        await existeOrden.save();
    }

    try {
        await existeOrdenDetalle.save(); //guardar cambios
        res.status(200).json({ msg: `Registro con el ID ${id} se ha editado correctamente` });
    } catch (e) {
        const error = new Error(`No se pudo eliminar la orden con el ID ${id}`);
        return res.status(400).json({ msg: error.message });
    }
}

const eliminar_orden_detalle = async (req, res) => {
    const { id } = req.query;

    //validacion campo id
    if (!id) {
        const error = new Error("El ID es obligatorio");
        return res.status(400).json({ msg: error.message });
    }

    //validacion formato id
    if (!enteroRegex.test(id)) {
        const error = new Error("El formato de ID no es valido");
        return res.status(400).json({ msg: error.message });
    }

    //buscar orden por ID
    const existeOrden_Detalle = await Orden_Detalle.findByPk(id);

    //validar si el registro con el ID no fue encontrado
    if (!existeOrden_Detalle) {
        const error = new Error(`El orden_Detalle con el ID ${id} no existe`);
        return res.status(404).json({ msg: error.message });
    }

    //buscar orden por id
    const existeOrden = await Orden.findByPk(existeOrden_Detalle.ordenId);

    if (!existeOrden) {
        const error = new Error(`La Orden no existe`);
        return res.status(400).json({ msg: error.message });
    }

    //actualizar valor del total
    existeOrden.total -= existeOrden_Detalle.subtotal;

    try {
        await existeOrden.save();
        await existeOrden_Detalle.destroy(); //guardar cambios
        res.status(200).json({ msg: `Registro con el ID ${id} eliminado correctamente` });
    } catch (e) {
        const error = new Error(`No se pudo eliminar la orden_detalle con el ID ${id}`);
        return res.status(400).json({ msg: error.message });
    }
}

export {
    crear_orden_detalle,
    obtener_orden_detalle,
    editar_orden_detalle,
    eliminar_orden_detalle
}