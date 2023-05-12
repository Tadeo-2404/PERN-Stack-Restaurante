import { useContext } from "react"
import { Context } from "../../context/ContextProvider"
import GaleriaOrdenes from "../../components/orden/GaleriaOrdenes"

const Ordenes = () => {
  const { usuario } = useContext(Context);
  const params = { clienteId: usuario.rol === "cliente" ? usuario.id : null };
  const botones = usuario.rol === "cliente" ? true : false;
  const titulo = usuario.rol === "cliente" ? "Tus ordenes" : "Ordenes";

  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <h1 className="text-3xl font-bold uppercase text-blue-600">{titulo}</h1>
      <GaleriaOrdenes botones={botones} params={params} />
    </div>
  );
};

export default Ordenes;
