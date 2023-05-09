import { useContext, useEffect } from "react";
import { Context } from "../../context/ContextProvider";
import { useState } from "react";
import { crear_orden } from "../../api/orden";
import { useNavigate } from "react-router-dom";
import alertify from 'alertifyjs';

const FormularioCrearOrden = () => {
  const { tipo, usuario, platillos } = useContext(Context);
  const navigate = useNavigate();
  const action = tipo === "administrador" ? "/api/orden" : undefined;

  const [fecha, setFecha] = useState("");

  const mostrar = () => {
    return platillos.map((platillo) => (
      <div key={platillo.id} className="grid grid-cols-2 justify-between content-center w-full">
          <label htmlFor={`platillo-${platillo.id}`} className="capitalize">{platillo.nombre}</label>
          <input type="number" name={`platillo-${platillo.id}`} id={`platillo-${platillo.id}`} placeholder="cantidad" min={0} className="border-2 border-transparent p-1 rounded-md focus:border-blue-400 focus:outline-none w-full"/>
      </div>
    ));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let newPlatillosArr = [];

    // Recorrer los platillos y crear un nuevo arreglo con la información de cada platillo y la cantidad seleccionada
    platillos.forEach((platillo) => {
      const cantidad = parseInt(document.getElementById(`platillo-${platillo.id}`).value);
      if (cantidad > 0) {
        newPlatillosArr.push({...platillo, cantidad});
      }
    });

    if (newPlatillosArr.length === 0) {
      alertify.error('Se requiere al menos un producto');
      return;
    }

    try {
      const data = await crear_orden(fecha, usuario.id, newPlatillosArr);
      alertify.success(`Orden creada exitosamente`);
      navigate('/cliente/orden')
      console.log(data);
    } catch (error) {
      console.log(error)
      alertify.error(error.response.data.msg);
    }
  }

  return (
    <div className="p-8 bg-white shadow-xl">
      <form action={action} method="POST" className="flex flex-col justify-center items-center gap-8 text-md" onSubmit={handleSubmit}>
        <legend className="text-3xl uppercase font-bold text-blue-600">realizar orden</legend>
        <fieldset className="flex flex-col justify-center items-center gap-8 w-full">

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="fecha" className="capitalize text-gray-400">
              fecha
            </label>
            <input type="date" name="fecha" id="fecha" placeholder="introduce la fecha" className="border-2 border-transparent p-2 rounded-md focus:border-blue-400 focus:outline-none w-full" required
            value={fecha}
            onChange={(event) => setFecha(event.target.value)}/>
          </div>

          <div className="flex flex-col justify-center items-center gap-6">
            {mostrar()}
          </div>

        </fieldset>
        <input type="submit" value="realizar orden" className="p-2 bg-blue-600 font-bold outline capitalize text-white w-full hover:scale-90"/>
      </form>
    </div>
  )
}

export default FormularioCrearOrden;