import { useSearchParams } from "react-router-dom";
import GaleriaOrdenDetalles from "../../components/orden_detalle/GaleriaOrdenDetalle";

const OrdenDetalle = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  return (
    <div className="flex flex-col justify-center items-center gap-6">
        <h1 className="text-3xl font-bold uppercase text-blue-600">detalle orden ID {id}</h1>
        <GaleriaOrdenDetalles params={{ordenId: id}} />
    </div>
  )
}

export default OrdenDetalle