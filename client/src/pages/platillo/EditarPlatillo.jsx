import { useSearchParams } from "react-router-dom";
import { Context } from "../../context/ContextProvider";
import { useContext, useEffect } from "react";
import CardPlatillo from "../../components/platillo/CardPlatillo";
import FormularioEditarPlatillo from "../../components/platillo/FormularioEditarPlatillo";

const EditarPlatillo = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { platillos } = useContext(Context);
  const platillo = platillos.find((x) => x.id == id);

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
