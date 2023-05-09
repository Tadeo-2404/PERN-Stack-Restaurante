import { useContext } from "react"
import { Context } from "../../context/ContextProvider"
import GaleriaOrdenes from "../../components/orden/GaleriaOrdenes"

const Ordenes = () => {
  const { usuario } = useContext(Context);
  return (
    <div className="flex flex-col justify-center items-center gap-6">
        <h1 className="text-3xl font-bold uppercase text-blue-600">tus ordenes</h1>
        <GaleriaOrdenes botones={true} params={{clienteId: usuario.id}} />
    </div>
  )
}

export default Ordenes