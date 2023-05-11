import { useContext, useState } from "react";
import { Context } from "../../context/ContextProvider";
import alertify from "alertifyjs";

const FormularioEliminarUsuario = () => {
  const { eliminarUsuario, tipo } = useContext(Context);
  const [frase, setFrase] = useState("");

  const action =
    tipo === "cliente"
      ? "/cliente/perfil/eliminar"
      : "/administrador/perfil/eliminar";

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (frase.toUpperCase() === "ELIMINAR CUENTA") {
      alertify.confirm(
        "¿Estas seguro que quieres eliminar tu cuenta definitivamente? Esta accion es irreversible, perderas todos tus datos",
        async function () {
          const eliminado = await eliminarUsuario();
          alertify.success(`${eliminado.msg}`);
        },
        function () {
          alertify.error("Cancelar");
        }
      );
    } else {
      alertify.error("Frase invalida, intentalo de nuevo");
    }
  };

  return (
    <div className="p-8 bg-white shadow-xl w-96">
      <form
        action={action}
        method="POST"
        className="flex flex-col justify-center items-center gap-8 text-md"
        onSubmit={handleSubmit}
      >
        <legend className="text-3xl uppercase font-bold text-red-600">
          eliminar cuenta
        </legend>
        <div>
          <p className="text-xl capitalize text-center">esta accion no se puede deshacer, para confirmar introduce la frase: <span className="font-bold uppercase">eliminar cuenta</span></p>
        </div>
        <fieldset className="flex flex-col justify-center items-center gap-8 w-full">
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="frase" className="capitalize text-gray-400">
              introduce la frase
            </label>
            <input
              type="text"
              name="frase"
              id="frase"
              placeholder="ELIMINAR CUENTA"
              className="border-2 border-transparent p-2 rounded-md focus:border-red-400 focus:outline-none w-full uppercase"
              minLength="15"
              maxLength="15"
              required
              value={frase}
              onChange={(event) => setFrase(event.target.value)}
            />
          </div>
        </fieldset>
        <input
          type="submit"
          value="eliminar cuenta"
          className="p-2 bg-red-600 font-bold outline capitalize text-white w-full hover:scale-90"
        />
      </form>
    </div>
  );
};

export default FormularioEliminarUsuario;
