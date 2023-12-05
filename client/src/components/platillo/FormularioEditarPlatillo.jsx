import { useContext, useState } from "react";
import { Context } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { flotanteRegex, nombreRegex } from "../../utils/FormUtils";
import { editar_platillo } from "../../api/platillo";
import alertify from 'alertifyjs';

const FormularioEditarPlatillo = ({id}) => {
  const { tipo } = useContext(Context);
  const action = tipo === "administrador" ? "/api/platillo/editar-platillo" : undefined;

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(0.00);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!nombre && !descripcion && !precio) {
      alertify.error('Hay campos vacios');
      return;
    }

    if (!nombreRegex.test(nombre)) {
      alertify.error('Formato de nombre invalido');
      return;
    }

    if(!flotanteRegex.test(precio)) {
      alertify.error('Formato de precio invalido');
      return;
    }

    try {
      const data = await editar_platillo(id, {nombre, descripcion, precio});
      alertify.success(`${data.msg}`)
      navigate(`/administrador/platillo`);
      console.log(data);
    } catch (error) {
      console.log(error)
      alertify.error(error.response.data.msg);
    }
  }

  return (
    <div className="p-8 bg-white shadow-xl">
      <form action={action} method="POST" className="flex flex-col justify-center items-center gap-8 text-md" onSubmit={handleSubmit}>
        <legend className="text-3xl uppercase font-bold text-blue-600">editar platillo</legend>
        <fieldset className="flex flex-col justify-center items-center gap-8 w-full">

         <div className="flex flex-col w-full gap-1">
            <label htmlFor="nombre" className="capitalize text-gray-400">
              nombre
            </label>
            <input type="text" name="nombre" id="nombre" placeholder="introduce el nombre del platillo" className="border-2 border-transparent p-2 rounded-md focus:border-blue-400 focus:outline-none w-full" minLength="4" maxLength="60" required
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="descripcion" className="capitalize text-gray-400">
              descripcion
            </label>
            <textarea name="descripcion" id="descripcion" cols="5" rows="5" onChange={(event) => setDescripcion(event.target.value)} 
            className="border-2 border-transparent p-2 rounded-md focus:border-blue-400 focus:outline-none w-full"></textarea>
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="precio" className="capitalize text-gray-400">
              precio
            </label>
            <input type="number" name="precio" id="precio" placeholder="introduce el precio" className="border-2 border-transparent p-2 rounded-md focus:border-blue-400 focus:outline-none w-full" minLength="4" maxLength="60" required
            value={precio}
            onChange={(event) => setPrecio(event.target.value)}/>
          </div>

        </fieldset>
        <input type="submit" value="editar platillo" className="p-2 bg-blue-600 font-bold outline capitalize text-white w-full hover:scale-90"/>
      </form>
    </div>
  )
}

export default FormularioEditarPlatillo;