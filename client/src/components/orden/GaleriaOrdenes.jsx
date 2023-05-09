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
    
    return (
        <div>
          {ordenes.length ? (
            <div className="grid grid-cols-3 gap-8">
              {ordenes.map((orden) => (
                <CardOrden key={orden.id} datos={orden} botones={botones}/>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center text-center">
              <p>No hay detalles para mostrar</p>
            </div>
          )}
        </div>
      );
};

export default GaleriaOrdenes;