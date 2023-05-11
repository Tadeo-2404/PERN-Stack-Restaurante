import { contrasenaRegex, correoRegex, enteroRegex, nombreRegex, telRegex } from "../helpers/utils.js"; //importar helpers
import Administrador from '../models/AdminModel.js'; //importar modelo administrador
import jwt from 'jsonwebtoken'; //importar jsonwebtoken
import CredencialesAdministrador from '../models/CrendencialesAdminModel.js'; //importar modelo credenciales admin
import crypto from 'crypto'; //importar crypto para token seguro
import { enviarEmail } from "../helpers/enviarCorreo.js";

//inciar sesion
const iniciar_sesion = async (req, res) => {
    const { correo, contrasena } = req.body; //leer input

    if (!correo || !contrasena) {
        const error = new Error("Todos los campos son obligatorios");
        return res.status(400).json({ msg: error.message });
    }

    //buscar administrador por correo
    const administrador = await Administrador.findOne({ where: { correo: correo } });

    if (!administrador) {
        const error = new Error("Este correo no existe");
        return res.status(404).json({ msg: error.message });
    }
 
    //buscar credencial 
    const credencial = await CredencialesAdministrador.findOne({ where: { administradorId: administrador.id } });

    //validar cuenta no confirmada
    if (!credencial) {
        const error = new Error("Este Administrador no tiene una CredencialAdministrador");
        return res.status(404).json({ msg: error.message });
    }

    //validar contraseña
    if (await Administrador.comprobarContrasena(contrasena, administrador.dataValues.contrasena)) {
 
        //generar jwt y enviar cookie al frontend
        const token = jwt.sign({ id: administrador.id, rol: credencial.rol }, process.env.SECRET_TOKEN);
        return res
            .cookie("acceso_token", token)
            .status(200)
            .json({ message: "Bienvenido" });
    } else {
        const error = new Error("Contraseña no valida");
        return res.status(400).json({ msg: error.message });
    }
}

//crear una nueva cuenta
const registrarse = async (req, res) => {
    const { nombre, correo, contrasena, telefono } = req.body; //leer datos
    console.log(contrasena)

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

    //buscar correo para validar si existe
    const correoExiste = await Administrador.findOne({ where: { correo: correo } });

    //validar si existe lanza error
    if (correoExiste) {
        const error = new Error("Este correo ya esta registrado");
        return res.status(400).json({ msg: error.message });
    }

    try {
        //crear objeto administrador
        const administrador = await Administrador.create(req.body);

        //generar token seguro aleatorio
        let randomString = crypto.randomBytes(16).toString('hex'); // Genera una cadena de 32 caracteres aleatoria
        let randomToken = Buffer.from(randomString).toString('base64'); // Codifica la cadena en Base64

        //crear objeto de credencial para cliente
        await CredencialesAdministrador.create({ administradorId: administrador.id, token: randomToken });
        return res.status(200).json({ msg: `Administrador ${administrador.nombre} creado exitosamente`});
    } catch (e) {
        console.log(e);
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
    const existeAdministrador = await Administrador.findOne({ where: { correo: correo } });

    //validar si cliente no existe
    if (!existeAdministrador) {
        const error = new Error("Este correo no existe");
        return res.status(404).json({ msg: error.message });
    }

    //buscar registro de Credencial
    const token = await CredencialesAdministrador.findOne({ where: { administradorId: existeAdministrador.id } });

    //generar token seguro aleatorio
    let randomString = crypto.randomBytes(16).toString('hex'); // Genera una cadena de 32 caracteres aleatoria
    let randomToken = Buffer.from(randomString).toString('base64'); // Codifica la cadena en Base64
    token.token = randomToken;

    try {
        await token.save(); //guardar nuevo token
        // await enviarEmail("restablecer contraseña", existeAdministrador, token.dataValues.token) //enviar correo
        return res.status(200).json({ msg: `Se ha enviado un correo a '${existeAdministrador.correo}' para cambiar tu contraseña` });
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
    const tokenValido = await CredencialesAdministrador.findOne({where: {token: token}});

    //validar token
    if(!tokenValido) {
        const error = new Error("Token no valido, intentalo de nuevo");
        return res.status(404).json({msg: error.message});
    } 

    //obtener administrador
    const administrador = await Administrador.findOne({where: {id: tokenValido.administradorId}});

    //validar administrador
    if(!administrador) {
        const error = new Error("Administrador no encontrado");
        return res.status(404).json({msg: error.message});
    }

    try {
        administrador.contrasena = nuevaContrasena;
        tokenValido.token = null;
        await tokenValido.save();
        await administrador.save();
        return res.status(200).json({msg: 'Contraseña cambiada correctamente'})
    } catch (error) {
        console.log(error);
    }
}

//editar perfil
const editar_perfil = async (req, res) => {
    const { id, nombre, correo, telefono } = req.body; // leer datos
  
    // Validar si el ID es válido
    if (!id) {
      const error = new Error("El ID es obligatorio");
      return res.status(400).json({ msg: error.message });
    }
  
    // Validar el formato del ID
    if (!enteroRegex.test(id)) {
      const error = new Error("ID no tiene un formato válido");
      return res.status(400).json({ msg: error.message });
    }
  
    // Buscar el administrador por su ID
    const administrador = await Administrador.findOne({ where: { id: id } });
  
    // Validar si el administrador existe
    if (!administrador) {
      const error = new Error("El administrador no existe");
      return res.status(400).json({ msg: error.message });
    }
  
    // Validar campos no vacíos
    if (!nombre && !correo && !telefono) {
      const error = new Error("Todos los campos son obligatorios");
      return res.status(400).json({ msg: error.message });
    }
  
    // Validar formato de nombre
    if (!nombreRegex.test(nombre)) {
      const error = new Error("Formato de nombre no válido");
      return res.status(400).json({ msg: error.message });
    }
  
    // Validar formato de correo
    if (!correoRegex.test(correo)) {
      const error = new Error("Formato de correo no válido");
      return res.status(400).json({ msg: error.message });
    }
  
    // Validar formato de teléfono
    if (!telRegex.test(telefono)) {
      const error = new Error("Formato de teléfono no válido");
      return res.status(400).json({ msg: error.message });
    }
  
    // Comprobar si el correo electrónico que se quiere actualizar es diferente del correo electrónico actual del cliente
    if (correo !== administrador.correo) {
      // Buscar correo para validar si existe
      const correoExiste = await Administrador.findOne({ where: { correo: correo } });
  
      // Validar si existe lanza error
      if (correoExiste) {
        const error = new Error("Este correo ya está registrado");
        return res.status(400).json({ msg: error.message });
      }
    }
  
    administrador.nombre = nombre || administrador.nombre;
    administrador.correo = correo || administrador.correo;
    administrador.telefono = telefono || administrador.telefono;
  
    try {
      await administrador.save();
      return res.status(200).json({ msg: "Cuenta editada exitosamente" });
    } catch (error) {
      console.log(error);
    }
  };

//eliminar perfil
const eliminar_perfil = async (req, res) => {
    const { id } = req.params;

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

    //buscar administrador
    const administrador =  await Administrador.findByPk(id);

    //validar si no existe
    if(!administrador) {
        const error = new Error("Este administrador no existe");
        return res.status(400).json({ msg: error.message });
    }

    try {
        await administrador.destroy();
        return res.status(200).json({msg: 'Se ha elimnado tu cuenta correctamente'});
    } catch (error) {
        console.log(error)
    }
}

export {
    iniciar_sesion,
    registrarse,
    olvide_contrasena,
    restablecer_contrasena,
    editar_perfil,
    eliminar_perfil
}