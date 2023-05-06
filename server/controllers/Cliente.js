import { contrasenaRegex, correoRegex, dateOnlyRegex, nombreRegex, telRegex } from "../helpers/utils.js"; //importar helpers
import Cliente from "../models/ClienteModel.js"; //importar modelo cliente
import jwt from 'jsonwebtoken'; //importar jsonwebtoken
import Credenciales from '../models/CredencialesModel.js'; //importat modelo credenciales
import crypto from 'crypto'; //importar crypto para token seguro
import { enviarEmail } from "../helpers/enviarCorreo.js";

//inciar sesion
const iniciar_sesion = async (req, res) => {
    const { correo, contrasena } = req.body; //leer input

    if (!correo || !contrasena) {
        const error = new Error("Todos los campos son obligatorios");
        return res.status(400).json({ msg: error.message });
    }

    //buscar cliente por correo
    const cliente = await Cliente.findOne({ where: { correo: correo } });

    if (!cliente) {
        const error = new Error("Este correo no existe");
        return res.status(404).json({ msg: error.message });
    }

    //buscar credencial 
    const credencial = await Credenciales.findOne({ where: { clienteId: cliente.id } });

    //validar cuenta no confirmada
    if (!credencial.confirmado || credencial.token) {
        const error = new Error("Necesitas confirmar tu cuenta para poder Iniciar Sesion");
        return res.status(404).json({ msg: error.message });
    }

    //validar contraseña
    if (await Cliente.comprobarContrasena(contrasena, cliente.contrasena)) {

        //generar jwt y enviar cookie al frontend
        const token = jwt.sign({ id: cliente.id, rol: credencial.rol }, process.env.SECRET_TOKEN);
        return res
            .cookie("acceso_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            })
            .status(200)
            .json({ message: "Bienvenido" });
    } else {
        const error = new Error("Contraseña no valida");
        return res.status(400).json({ msg: error.message });
    }
}

//crear una nueva cuenta
const registrarse = async (req, res) => {
    const { nombre, correo, contrasena, telefono, fecha_de_nacimiento } = req.body; //leer datos

    //validar campos no vacios
    if (!nombre || !correo || !contrasena || !telefono) {
        const error = new Error("Todos los campos son obligatorios");
        return res.status(400).json({ msg: error.message });
    }

    //validar formato nombre
    if (!nombreRegex.test(nombre)) {
        const error = new Error("Formato de nombre no valido");
        return res.status(400).json({ msg: error.message });
    }

    //validar formato correo
    if (!correoRegex.test(correo)) {
        const error = new Error("Formato de correo no valido");
        return res.status(400).json({ msg: error.message });
    }

    //validar formato contrasena
    if (!contrasenaRegex.test(contrasena)) {
        const error = new Error("Formato de contrasena no valido");
        return res.status(400).json({ msg: error.message });
    }

    //validar formato telefono
    if (!telRegex.test(telefono)) {
        const error = new Error("Formato de telefono no valido");
        return res.status(400).json({ msg: error.message });
    }

    if (fecha_de_nacimiento) {
        if (!dateOnlyRegex.test(fecha_de_nacimiento)) {
            const error = new Error("Formato de fecha_de_nacimiento no valido");
            return res.status(400).json({ msg: error.message });
        }
    }

    //buscar correo para validar si existe
    const correoExiste = await Cliente.findOne({ where: { correo: correo } });

    //validar si existe lanza error
    if (correoExiste) {
        const error = new Error("Este correo ya esta registrado");
        return res.status(400).json({ msg: error.message });
    }

    try {
        //crear objeto cliente
        const cliente = await Cliente.create(req.body);

        //crear objeto de credencial para cliente
        const credencial = await Credenciales.create({ clienteId: cliente.id, token: randomToken, rol: "cliente" });
        await enviarEmail("confirmar cuenta" ,cliente, credencial.token);
        return res.status(200).json({ msg: `Se ha enviado un correo a '${existeCliente.correo}' para cambiar tu contraseña` });
    } catch (e) {
        console.log(e);
    }
}

//confirmar cuenta creada
const confirmar_cuenta = async (req, res) => {
    const { token } = req.params; //leer token para confirmar cuenta

    if (!token) {
        const error = new Error("El token es obligatorio");
        return res.status(400).json({ msg: error.message });
    }

    //buscar token en Credenciales
    const tokenValido = await Credenciales.findOne({ where: { token: token } });

    //validar si token no es valido
    if (!tokenValido) {
        const error = new Error("Token invalido, intentalo de nuevo");
        return res.status(404).json({ msg: error.message });
    }

    try {
        tokenValido.token = null;
        tokenValido.confirmado = true;
        await tokenValido.save();
        return res.status(200).json({ msg: 'Cuenta confirmada con exito' });
    } catch (error) {
        console.log(error);
    }
}

//mandar correo solicitud de contraseña nueva
const olvide_contrasena = async (req, res) => {
    const { correo } = req.body; //leer correo

    //validar si correo existe
    if (!correo) {
        const error = new Error("Todos los campos son necesarios");
        return res.status(400).json({ msg: error.message });
    }

    //buscar al cliente
    const existeCliente = await Cliente.findOne({ where: { correo: correo } });

    //validar si cliente no existe
    if (!existeCliente) {
        const error = new Error("Este correo no existe");
        return res.status(404).json({ msg: error.message });
    }

    //buscar registro de Credencial
    const token = await Credenciales.findOne({ where: { clienteId: existeCliente.id } });

    //validar cuenta confirmada
    if(!token.confirmado) {
        const error = new Error("Necesitas confirmar tu cuenta");
        return res.status(400).json({ msg: error.message });
    }

    //generar token seguro aleatorio
    let randomString = crypto.randomBytes(16).toString('hex'); // Genera una cadena de 32 caracteres aleatoria
    let randomToken = Buffer.from(randomString).toString('base64'); // Codifica la cadena en Base64
    token.token = randomToken;

    try {
        await token.save(); //guardar nuevo token
        await enviarEmail("restablecer contraseña", existeCliente, token.dataValues.token) //enviar correo
        return res.status(200).json({ msg: `Se ha enviado un correo a '${existeCliente.correo}' para cambiar tu contraseña` });
    } catch (error) {
        console.log(error)
    }
}

//introducir nueva contraseña
const restablecer_contrasena = async (req, res) => {
    const { token } = req.params; //leer token
    const { nuevaContrasena, repetirContrasena } = req.body; //leer formulario

    //validar campos no vacios
    if(!nuevaContrasena || !repetirContrasena) {
        const error = new Error("Todos los campos son obligatios");
        return res.status(400).json({msg: error.message});
    }

    //validar formato contraseña
    if(!contrasenaRegex.test(nuevaContrasena)) {
        const error = new Error("Formato de contraseña invalido");
        return res.status(400).json({msg: error.message});
    }

    if(nuevaContrasena !== repetirContrasena) {
        const error = new Error("Las contraseñas no coinciden");
        return res.status(400).json({msg: error.message});
    }

    //buscar token
    const tokenValido = await Credenciales.findOne({where: {token: token}});

    //validar token
    if(!tokenValido) {
        const error = new Error("Token no valido, intentalo de nuevo");
        return res.status(404).json({msg: error.message});
    } 

    //validar cuenta confirmada
    if(!tokenValido.confirmado) {
        const error = new Error("Necesitas confirmar tu cuenta");
        return res.status(400).json({ msg: error.message });
    }

    //obtener cliente
    const cliente = await Cliente.findOne({where: {id: tokenValido.clienteId}});

    //validar cliente
    if(!cliente) {
        const error = new Error("Cliente no encontrado");
        return res.status(404).json({msg: error.message});
    }

    try {
        cliente.contrasena = nuevaContrasena;
        tokenValido.token = null;
        await tokenValido.save();
        await cliente.save();
        return res.status(200).json({msg: 'Contraseña cambiada correctamente'})
    } catch (error) {
        console.log(error);
    }
}

const cerrar_sesion = (req, res) => {
    return res
    .clearCookie("acceso_token")
    .status(200)
    .json({ message: "Sesion cerrada correctamente"})
}

const perfil = async (req, res) => {
    const user = req.user;

    const cliente = await Cliente.findByPk(user.id, {
        attributes: { exclude: ['contrasena'] }
    })

    return res.status(200).json({cliente: cliente.dataValues});
}

export {
    iniciar_sesion,
    registrarse,
    confirmar_cuenta,
    olvide_contrasena,
    restablecer_contrasena,
    cerrar_sesion,
    perfil
}