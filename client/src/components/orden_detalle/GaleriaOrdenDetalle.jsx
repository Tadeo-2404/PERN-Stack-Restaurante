import { useEffect, useState } from 'react'
import CardOrdenDetalle from "./CardOrdenDetalle";
import { obtener_orden_detalle } from "../../../../server/controllers/OrdenDetalle";

const GaleriaOrdenDetalles = ({params}) => {
    const [ordenesDetalle, setOrdenesDetalle] = useState([]);
    
    useEffect(() => {
      const obtenerOrdenesDetalle = async () => {
        const nuevasOrdenDetalle = await obtener_orden_detalle(params);
        setOrdenesDetalle(nuevasOrdenDetalle);
      };
      obtenerOrdenesDetalle();
    }, []);
    
    return(
        <div className={`grid grid-cols-3 gap-8`}>
            {
                ordenesDetalle.length ? (
                    ordenesDetalle.map(orden => (
                        <CardOrdenDetalle key={orden.id} datos={orden}/>
                    ))
                ) : (
                    <p>No hay detalles para mostrar</p>
                )
            }
        </div>
)};

export default GaleriaOrdenDetalles;