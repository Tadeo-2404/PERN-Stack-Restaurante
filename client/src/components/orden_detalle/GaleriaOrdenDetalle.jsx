import { useEffect, useState } from "react";
import CardOrdenDetalle from "./CardOrdenDetalle";
import { obtener_ordenes_detalle } from "../../api/orden_detalle";

const GaleriaOrdenDetalles = ({ params }) => {
  const [ordenesDetalle, setOrdenesDetalle] = useState([]);

  useEffect(() => {
    const obtenerOrdenesDetalle = async () => {
      const nuevasOrdenDetalle = await obtener_ordenes_detalle(params);
      setOrdenesDetalle(nuevasOrdenDetalle);
    };
    obtenerOrdenesDetalle();
  }, []);

  return (
    <div>
      {ordenesDetalle.length ? (
        <div className="grid grid-cols-3 gap-8">
          {ordenesDetalle.map((orden) => (
            <CardOrdenDetalle key={orden.id} datos={orden} />
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

export default GaleriaOrdenDetalles;
