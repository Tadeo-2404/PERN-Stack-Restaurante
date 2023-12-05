import { useSearchParams } from "react-router-dom";
import { Context } from "../../context/ContextProvider";
import { useContext, useEffect, useState } from "react";
import CardPlatillo from "../../components/platillo/CardPlatillo";
import FormularioEditarPlatillo from "../../components/platillo/FormularioEditarPlatillo";
import { obtener_platillos } from "../../api/platillo";

const EditarPlatillo = () => {
  const [platillo, setPlatillo] = useState([]);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  console.log("id",  id)

  const obtenerPlatillos = async () => {
    try {
      const response = await obtener_platillos({id: id});
      console.log("response", response)
      setPlatillo(response[0]);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    obtenerPlatillos();
  }, []);

  return (
    <div>
      {platillo ? (
        <div className="grid grid-cols-2 grid-rows-1 gap-4">
            <FormularioEditarPlatillo id={platillo.id} />
          <div className="flex flex-col justify-center items-center gap-4">
            <h1 className="text-2xl text-blue-600 font-bold capitalize">Informacion del Platillo</h1>
            <CardPlatillo key={platillo.id} datos={platillo} botones={false} />
          </div>
        </div>
      ) : (
        <p>No se encontró el platillo con el ID {id}</p>
      )}
    </div>
  );
};

export default EditarPlatillo;
