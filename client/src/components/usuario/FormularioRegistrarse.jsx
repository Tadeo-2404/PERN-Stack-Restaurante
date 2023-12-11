import { useContext } from "react";
import { Context } from "../../context/ContextProvider";
import { Link } from 'react-router-dom';
import { useState } from "react";
import { contrasenaRegex, correoRegex, nombreRegex, telRegex } from "../../utils/FormUtils";
import { registrarse } from "../../api/usuario";
import alertify from 'alertifyjs';


const FormularioRegistrarse = () => {
  const { tipo } = useContext(Context);
  const action = tipo === "cliente" ? "/cliente/iniciar-sesion" : "/administrador/iniciar-sesion";
  const iniciarSesion = tipo === "cliente" ? "/cliente/iniciar-sesion" : "/administrador/iniciar-sesion";
  const olvide = tipo === "cliente" ? "/cliente/olvide-contrasena" : "/administrador/olvide-contrasena";

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [repetirContrasena, setRepetirContrasena] = useState("");
  const [telefono, setTelefono] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!nombre || !correo || !contrasena || !repetirContrasena || !telefono) {
      alertify.error('Todos los campos son obligatorios');
      return;
    }


    if (!nombreRegex.test(nombre)) {
      alertify.error('Formato de nombre invalido');
      return;
    }

    if(!correoRegex.test(correo)) {
      alertify.error('Formato de correo invalido');
      return;
    }

    if(!contrasenaRegex.test(contrasena)) {
      alertify.error('Formato de contraseña invalido');
      return;
    }

    if(contrasena !== repetirContrasena) {
      alertify.error('Las contraseñas deben coincidir');
      return;
    }

    if(!telRegex.test(telefono)) {
      alertify.error('Formato de telefono invalido');
      return;
    }

    try {
      const data = await registrarse({nombre, correo, contrasena, telefono}, tipo);
      alertify.success(data?.msg);
    } catch (error) {
      alertify.error(error?.data?.response?.msg);
    }
  }

  return (
    <div className="p-8 bg-white shadow-xl">
      <form action={action} method="POST" className="flex flex-col justify-center items-center gap-8 text-md" onSubmit={handleSubmit}>
        <legend className="text-3xl uppercase font-bold text-blue-600">registrarse</legend>
        <fieldset className="flex flex-col justify-center items-center gap-8 w-full">

         <div className="flex flex-col w-full gap-1">
            <label htmlFor="nombre" className="capitalize text-gray-400">
              nombre
            </label>
            <input type="text" name="nombre" id="nombre" placeholder="introduce tu nombre" className="border-2 border-transparent p-2 rounded-md focus:border-blue-400 focus:outline-none w-full" minLength="4" maxLength="60" required
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="correo" className="capitalize text-gray-400">
              correo
            </label>
            <input type="email" name="correo" id="correo" placeholder="introduce tu correo" className="border-2 border-transparent p-2 rounded-md focus:border-blue-400 focus:outline-none w-full" minLength="4" maxLength="60" required
            value={correo}
            onChange={(event) => setCorreo(event.target.value)}/>
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="contrasena" className="capitalize text-gray-400">
              contraseña
            </label>
            <input type="password" name="contrasena" id="contrasena" placeholder="introduce tu contraseña" className="border-2 border-transparent p-2 rounded-md focus:border-blue-400 focus:outline-none w-full" minLength="4" maxLength="60" required
            value={contrasena}
            onChange={(event) => setContrasena(event.target.value)}/>
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="repetirContraseña" className="capitalize text-gray-400">
              repetir contraseña
            </label>
            <input type="password" name="repetirContrasena" id="repetirContraseña" placeholder="repite tu contraseña" className="border-2 border-transparent p-2 rounded-md focus:border-blue-400 focus:outline-none w-full" minLength="4" maxLength="60" required
            value={repetirContrasena}
            onChange={(event) => setRepetirContrasena(event.target.value)}/>
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="telefono" className="capitalize text-gray-400">
              telefono
            </label>
            <input type="tel" maxLength="10" minLength="10" name="telefono" id="telefono" placeholder="introduce tu telefono" className="border-2 border-transparent p-2 rounded-md focus:border-blue-400 focus:outline-none w-full" required
            value={telefono}
            onChange={(event) => setTelefono(event.target.value)}/>
          </div>

        </fieldset>
        <input type="submit" value="registrarse" className="p-2 bg-blue-600 font-bold outline capitalize text-white w-full hover:scale-90"/>
      </form>
      <div className="flex justify-between items-center text-blue-400 text-sm mt-5 capitalize w-full gap-8">
      <Link to={"/"}>Volver</Link>
      <Link to={iniciarSesion}>
        ¿Ya tienes una cuenta? Inicia Sesion
      </Link>
      <Link to={olvide}>
        ¿Olvidaste tu contraseña?
      </Link>
      </div>
    </div>
  )
}

export default FormularioRegistrarse