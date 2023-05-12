import { useContext, useState } from "react";
import { Context } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { dateOnlyRegex, flotanteRegex } from "../../utils/FormUtils";
import { editar_platillo } from "../../api/platillo";
import alertify from 'alertifyjs';
import { editar_orden } from "../../api/orden";

const FormularioEditarOrden = ({id}) => {
  const { tipo } = useContext(Context);
  const action = tipo === "cliente" ? "/api/platillo/editar-platillo" : undefined;

  const [fecha, setFecha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!fecha) {
      alertify.error('Todos los campos son obligatorios');
      return;
    }

    if (!dateOnlyRegex.test(fecha)) {
      alertify.error('Formato de fecha invalido');
      return;
    }

    try {
      const data = await editar_orden(id, fecha);
      alertify.success(`${data.msg}`)
      navigate(`/cliente/orden`);
      console.log(data);
    } catch (error) {
      console.log(error)
      alertify.error(error.response.data.msg);
    }
  }

  return (
    <div className="p-8 bg-white shadow-xl">
      <form action={action} method="POST" className="flex flex-col justify-center items-center gap-8 text-md" onSubmit={handleSubmit}>
        <legend className="text-3xl uppercase font-bold text-blue-600">editar orden</legend>
        <fieldset className="flex flex-col justify-center items-center gap-8 w-full">

        <div className="flex flex-col w-full gap-1">
            <label htmlFor="fecha" className="capitalize text-gray-400">
              fecha
            </label>
            <input type="date" name="fecha" id="fecha" placeholder="introduce la fecha" className="border-2 border-transparent p-2 rounded-md focus:border-blue-400 focus:outline-none w-full" required
            value={fecha}
            onChange={(event) => setFecha(event.target.value)}/>
          </div>

        </fieldset>
        <input type="submit" value="editar orden" className="p-2 bg-blue-600 font-bold outline capitalize text-white w-full hover:scale-90"/>
      </form>
    </div>
  )
}

export default FormularioEditarOrden;