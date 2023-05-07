import { useContext } from "react";
import { Context } from "../../context/ContextProvider";
import { Link } from 'react-router-dom';

const FormularioRegistrarse = () => {
  const { tipo } = useContext(Context);
  const action = tipo === "cliente" ? "/cliente/olvide-contrasena" : "/administrador/olvide-contrasena";
  const iniciarSesion = tipo === "cliente" ? "/cliente/iniciar-sesion" : "/administrador/iniciar-sesion";
  const registrarse = tipo === "cliente" ? "/cliente/registrarse" : "/administrador/registrarse";
  return (
    <div className="p-8 bg-white shadow-xl">
      <form action={action} method="POST" className="flex flex-col justify-center items-center gap-8 text-md">
        <legend className="text-3xl uppercase font-bold text-blue-600">olvide mi contraseña</legend>
        <fieldset className="flex flex-col justify-center items-center gap-8 w-full">

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="correo" className="capitalize text-gray-400">
              correo
            </label>
            <input type="email" name="correo" id="correo" placeholder="introduce tu correo" className="border-2 border-transparent p-2 rounded-md focus:border-blue-400 focus:outline-none w-full capitalize" minLength="4" maxLength="60" required/>
          </div>


        </fieldset>
        <input type="submit" value="olvide contraseña" className="p-2 bg-blue-600 font-bold outline capitalize text-white w-full hover:scale-90"/>
      </form>
      <div className="flex justify-between items-center text-blue-400 text-sm mt-5 capitalize w-full gap-8">
      <Link to={iniciarSesion}>
        ¿Ya tienes una cuenta? Inicia Sesion
      </Link>
      <Link to={registrarse}>
      ¿No tienes una cuenta? Registrate
      </Link>
      </div>
    </div>
  )
}

export default FormularioRegistrarse