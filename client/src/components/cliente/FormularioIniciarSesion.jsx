import { useContext } from "react";
import { Context } from "../../context/ContextProvider";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { iniciar_sesion } from "../../api/usuario";
import alertify from 'alertifyjs';

const FormularioIniciarSesion = () => {
  const { tipo } = useContext(Context);
  const navigate = useNavigate();
  const action =
    tipo === "cliente"
      ? "/cliente/iniciar-sesion"
      : "/administrador/iniciar-sesion";
  const registrarse =
    tipo === "cliente" ? "/cliente/registrarse" : "/administrador/registrarse";
  const olvide =
    tipo === "cliente"
      ? "/cliente/olvide-contrasena"
      : "/administrador/olvide-contrasena";

  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!correo || !contrasena) {
      alertify.error("Todos los campos son obligatorios");
      return;
    }

    try {
      const data = await iniciar_sesion(
        { correo, contrasena },
        tipo
      );
      console.log(data)
      alertify.success(data.message);
      navigate(`/${tipo}`)
    } catch (error) {
      alertify.error(error.response.data.msg);
    }
  };

  return (
    <div className="p-8 bg-white shadow-xl">
      <form
        action={action}
        method="POST"
        className="flex flex-col justify-center items-center gap-8 text-md"
        onSubmit={handleSubmit}
      >
        <legend className="text-3xl uppercase font-bold text-blue-600">
          iniciar sesion
        </legend>
        <fieldset className="flex flex-col justify-center items-center gap-8 w-full">
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="correo" className="capitalize text-gray-400">
              correo
            </label>
            <input
              type="email"
              name="correo"
              id="correo"
              placeholder="introduce tu correo"
              className="border-2 border-transparent p-2 rounded-md focus:border-blue-400 focus:outline-none w-full"
              required
              value={correo}
              onChange={(event) => setCorreo(event.target.value)}
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="contrasena" className="capitalize text-gray-400">
              contraseña
            </label>
            <input
              type="password"
              name="contrasena"
              id="contrasena"
              placeholder="introduce tu contraseña"
              className="border-2 border-transparent p-2 rounded-md focus:border-blue-400 focus:outline-none w-full"
              required
              value={contrasena}
              onChange={(event) => setContrasena(event.target.value)}
            />
          </div>
        </fieldset>
        <input
          type="submit"
          value="Inciar sesion"
          className="p-2 bg-blue-600 font-bold outline capitalize text-white w-full hover:scale-90"
        />
      </form>
      <div className="flex justify-between items-center text-blue-400 text-sm mt-5 capitalize w-full gap-8">
        <Link to={registrarse}>¿No tienes una cuenta? Regístrate</Link>
        <Link to={olvide}>¿Olvidaste tu contraseña?</Link>
      </div>
    </div>
  );
};

export default FormularioIniciarSesion;
