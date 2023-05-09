import { obtener_ordenes } from "../../api/orden";
import CardOrden from "./CardOrden";
import { useEffect, useState } from 'react'

const GaleriaOrdenes = ({params, botones}) => {
    const [ordenes, setOrdenes] = useState([]);
    
    useEffect(() => {
      const obtenerordenes = async () => {
        const nuevasOrdenes = await obtener_ordenes(params);
        setOrdenes(nuevasOrdenes);
      };
      obtenerordenes();
    }, []);
    
    return(
        <div className={`grid grid-cols-3 gap-8`}>
            {
                ordenes.length ? (
                    ordenes.map(orden => (
                        <CardOrden key={orden.id} datos={orden} botones={botones}/>
                    ))
                ) : (
                    <p>No hay ordenes para mostrar</p>
                )
            }
        </div>
)};

export default GaleriaOrdenes;