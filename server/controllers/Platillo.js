import Platillo from '../models/PlatilloModel';

const crear_platillo = (req, res) => {
    res.json({msg: 'creando platillo'});
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