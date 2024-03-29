import { useSearchParams } from "react-router-dom";
import { Context } from "../../context/ContextProvider";
import { useContext, useEffect, useState } from "react";
import FormularioEditarOrden from "../../components/orden/FormularioEditarOrden";
import CardOrden from "../../components/orden/CardOrden";
import { obtener_ordenes } from "../../api/orden";

const EditarOrden = () => {
  const [searchParams] = useSearchParams();
  const [ordenes, setOrdenes] = useState([]);
  const id = searchParams.get("id");

  const obtenerOrdenes = async () => {
    const response = await obtener_ordenes({id: id});
    setOrdenes(response)
    console.log(response);
  }

  useEffect(() => {
    obtenerOrdenes();
  }, []);

  const orden = ordenes.find((x) => x.id == id);

  return (
    <div>
      {orden ? (
        <div className="grid grid-cols-2 grid-rows-1 gap-4">
            <FormularioEditarOrden id={orden.id} />
          <div className="flex flex-col justify-center items-center gap-4">
            <h1 className="text-2xl text-blue-600 font-bold capitalize">Informacion de la orden</h1>
            <CardOrden key={orden.id} datos={orden} botones={false} />
          </div>
        </div>
      ) : (
        <p>No se encontró la orden con el ID {id}</p>
      )}
    </div>
  );
};

export default EditarOrden;
