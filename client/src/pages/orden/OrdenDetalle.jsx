import { useContext } from "react"
import { Context } from "../../context/ContextProvider"
import GaleriaOrdenDetalles from "../../components/orden_detalle/GaleriaOrdenDetalle";

const OrdenDetalle = () => {
  const { usuario } = useContext(Context);
  return (
    <div className="flex flex-col justify-center items-center gap-6">
        <h1 className="text-3xl font-bold uppercase text-blue-600">tus ordenes</h1>
        <GaleriaOrdenDetalles params={{clienteId: usuario.id}} />
    </div>
  )
}

export default OrdenDetalle