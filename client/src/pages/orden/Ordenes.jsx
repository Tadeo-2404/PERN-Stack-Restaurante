import { useContext } from "react"
import { Context } from "../../context/ContextProvider"
import GaleriaOrdenes from "../../components/orden/GaleriaOrdenes"
import FilterBar from "../../components/FilterBar";

const Ordenes = () => {
  const { usuario, setPropsOrdenes, propsOrdenes } = useContext(Context);
  const botones = usuario.rol === "cliente" ? true : true;
  const titulo = usuario.rol === "cliente" ? "Tus ordenes" : "Ordenes";
  console.log(propsOrdenes)
  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <h1 className="text-3xl font-bold uppercase text-blue-600">{titulo}</h1>
      <FilterBar setPropsOrdenes={setPropsOrdenes} usuario={usuario}/>
      <GaleriaOrdenes botones={botones} params={propsOrdenes} usuario={usuario}/>
    </div>
  );
};

export default Ordenes;
