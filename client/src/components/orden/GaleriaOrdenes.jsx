import CardOrden from "./CardOrden";
import { obtener_ordenes } from "../../api/orden";
import { useEffect, useState } from 'react'

const GaleriaOrdenes = ({params, botones, usuario}) => {
    const [ordenes, setOrdenes] = useState([]);
    
    useEffect(() => {
      const obtenerordenes = async () => {
        const nuevasOrdenes = await obtener_ordenes({...params, clienteId: usuario.id});
        setOrdenes(nuevasOrdenes);
      };
      obtenerordenes();
    }, [params]);
    
    return (
        <div>
          {ordenes.length ? (
            <div className="grid grid-cols-3 gap-8">
              {ordenes.map((orden) => (
                <CardOrden key={orden.id} datos={orden} botones={botones}/>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-8">
              <p>No hay detalles para mostrar</p>
            </div>
          )}
        </div>
      );
};

export default GaleriaOrdenes;