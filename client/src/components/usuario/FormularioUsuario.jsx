import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/ContextProvider";
import { BsFillPencilFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import alertify from "alertifyjs";
import { correoRegex, nombreRegex, telRegex } from "../../utils/FormUtils";

const FormularioUsuario = ({ usuario }) => {
  const { editarUsuario, tipo } = useContext(Context);

  const action =
    tipo === "cliente"
      ? "/cliente/perfil/editar"
      : "/administrador/perfil/editar";

  const [nombre, setNombre] = useState(usuario.nombre);
  const [correo, setCorreo] = useState(usuario.correo);
  const [telefono, setTelefono] = useState(usuario.telefono);

  const [editarNombre, setEditarNombre] = useState(false);
  const [editarCorreo, setEditarCorreo] = useState(false);
  const [editarTelefono, setEditarTelefono] = useState(false);
  const [mostrarBoton, setMostrarBoton] = useState(false);

  const handleChangeNombre = async (e) => {
    setNombre(e.target.value);
    if (e.target.value !== usuario.nombre) {
      setMostrarBoton(true);
    }
    if (e.target.value == usuario.nombre) {
      setMostrarBoton(false);
    }
  };

  const handleChangeCorreo = (e) => {
    setCorreo(e.target.value);
    if (e.target.value !== usuario.correo) {
      setMostrarBoton(true);
    }
    if (e.target.value == usuario.correo) {
      setMostrarBoton(false);
    }
  };

  const handleChangeTelefono = (e) => {
    setTelefono(e.target.value);
    if (e.target.value !== usuario.telefono) {
      setMostrarBoton(true);
    }
    if (e.target.value == usuario.telefono) {
      setMostrarBoton(false);
    }
  };

  useEffect(() => {
    setNombre(usuario.nombre);
    setCorreo(usuario.correo);
    setTelefono(usuario.telefono);
  }, [usuario]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!nombreRegex.test(nombre)) {
      alertify.error('Nombre no valido');
      return;
    }

    if(!correoRegex.test(correo)) {
      alertify.error('Correo no valido');
      return;
    }

    if(!telRegex.test(telefono)) {
      alertify.error('Telefono no valido');
      return;
    }

    let user = {
      id: usuario.id,
      nombre: nombre,
      correo: correo,
      telefono: telefono
    }

    try {
      const editado = await editarUsuario(user);
      console.log(editado);
      alertify.success(`${editado.msg}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form
      className="flex flex-col justify-center text-left text-xl"
      onSubmit={handleSubmit}
      action={action}
    >
      <fieldset className="flex flex-col">
        <div className="grid grid-cols-2 p-2 justify-start content-start">
          <label className="font-bold capitalize">nombre: </label>
          <div className="flex justify-center items-center bg-gray-100">
            {!editarNombre ? (
              <input
                className="border-2 border-transparent p-2 rounded-md w-full bg-gray-100 outline-none border-none text-gray-400"
                readOnly
                type="text"
                name="nombre"
                id="nombre"
                value={nombre || ""}
              />
            ) : (
              <input
                className="border-2
                w-full bg-gray-100 outline-none border-none p-2"
                type="text"
                name="nombre"
                id="nombre"
                required
                value={nombre}
                onChange={handleChangeNombre}
              />
            )}
            <div className="p-2" onClick={() => setEditarNombre(!editarNombre)}>
              <BsFillPencilFill className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 p-2 justify-start content-start">
          <label className="font-bold capitalize">correo: </label>
          <div className="flex justify-center items-center bg-gray-100">
            {!editarCorreo ? (
              <input
                className="border-2 border-transparent p-2 rounded-md w-full bg-gray-100 outline-none border-none text-gray-400"
                readOnly
                type="email"
                name="correo"
                id="correo"
                value={correo || ""}
              />
            ) : (
              <input
                className="border-2
                w-full bg-gray-100 outline-none border-none p-2"
                type="email"
                name="correo"
                id="correo"
                required
                value={correo}
                onChange={handleChangeCorreo}
              />
            )}
            <div className="p-2" onClick={() => setEditarCorreo(!editarCorreo)}>
              <BsFillPencilFill className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 p-2 justify-start content-start">
          <label className="font-bold capitalize">telefono: </label>
          <div className="flex justify-center items-center bg-gray-100">
            {!editarTelefono ? (
              <input
                className="border-2 border-transparent p-2 rounded-md w-full bg-gray-100 outline-none border-none text-gray-400"
                readOnly
                type="tel"
                name="telefono"
                id="telefono"
                value={telefono || ""}
              />
            ) : (
              <input
                className="border-2
                w-full bg-gray-100 outline-none border-none p-2"
                type="tel"
                name="telefono"
                id="telefono"
                required
                value={telefono}
                onChange={handleChangeTelefono}
              />
            )}
            <div
              className="p-2"
              onClick={() => setEditarTelefono(!editarTelefono)}
            >
              <BsFillPencilFill className="text-blue-600" />
            </div>
          </div>
        </div>
      </fieldset>
      {!mostrarBoton ? (
        <input
          type="submit"
          disabled
          value="guardar cambios"
          className="disabled:bg-blue-400 disabled:cursor-not-allowed p-2 bg-blue-600 font-bold outline capitalize text-white w-full disabled"
        />
      ) : (
        <input
          type="submit"
          value="guardar cambios"
          className="p-2 bg-blue-600 font-bold outline capitalize text-white w-full"
        />
      )}
          <Link to={`/${tipo}/perfil/eliminar`}>
            <button className="p-2 bg-red-600 font-bold outline capitalize text-white hover:scale-90 w-full">
              eliminar cuenta
            </button>
          </Link>
    </form>
  );
};

export default FormularioUsuario;
