import { contrasenaRegex, correoRegex, dateOnlyRegex, nombreRegex, telRegex } from "../helpers/utils.js";
import Cliente from "../models/ClienteModel.js";

//inciar sesion
const iniciar_sesion = (req, res) => {
    res.json({msg: "login"})
}

//crear una nueva cuenta
const registrarse = async (req, res) => {
    const { nombre, correo, contrasena, telefono, fecha_de_nacimiento } = req.body; //leer datos

    //validar campos no vacios
    if(!nombre || !correo || !contrasena || !telefono) {
        const error = new Error("Todos los campos son obligatorios");
        return res.status(400).json({msg: error.message});
    }

    //validar formato nombre
    if(!nombreRegex.test(nombre)) {
        const error = new Error("Formato de nombre no valido");
        return res.status(400).json({msg: error.message});
    }

    //validar formato correo
    if(!correoRegex.test(correo)) {
        const error = new Error("Formato de correo no valido");
        return res.status(400).json({msg: error.message});
    }

    //validar formato contrasena
    if(!contrasenaRegex.test(contrasena)) {
        const error = new Error("Formato de contrasena no valido");
        return res.status(400).json({msg: error.message});
    }

    //validar formato telefono
    if(!telRegex.test(telefono)) {
        const error = new Error("Formato de telefono no valido");
        return res.status(400).json({msg: error.message});
    }

    if(fecha_de_nacimiento) {
        if(!dateOnlyRegex.test(fecha_de_nacimiento)) {
            const error = new Error("Formato de fecha_de_nacimiento no valido");
            return res.status(400).json({msg: error.message});
        }
    }

    //buscar correo para validar si existe
    const correoExiste = await Cliente.findOne({where: {correo: correo}});

    //validar si existe lanza error
    if(correoExiste) {
        const error = new Error("Este correo ya esta registrado");
        return res.status(400).json({msg: error.message});
    }

    try {
        const cliente = await Cliente.create(req.body);
        return res.status(200).json(cliente);
    } catch (e) {
        console.log(e);
    }
}

//confirmar cuenta creada
const confirmar_cuenta = (req, res) => {
    res.json({msg: "confirm my account"})
}

//mandar correo solicitud de contraseña nueva
const olvide_contrasena = (req, res) => {
    res.json({msg: "forgot-password"})
}

//introducir nueva contraseña
const restablecer_contrasena = (req, res) => {
    res.json({msg: "forgot password :token"})
}

export {
    iniciar_sesion,
    registrarse,
    confirmar_cuenta,
    olvide_contrasena,
    restablecer_contrasena,
}