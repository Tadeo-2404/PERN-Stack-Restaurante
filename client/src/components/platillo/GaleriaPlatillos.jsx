import CardPlatillo from "./CardPlatillo";
import { useEffect, useState } from 'react'
import { obtener_platillos } from "../../api/platillo";

const GaleriaPlatillos = ({params, botones}) => {
    const [platillos, setPlatillos] = useState([]);
    
    useEffect(() => {
      const obtenerPlatillos = async () => {
        const nuevosPlatillos = await obtener_platillos(params);
        setPlatillos(nuevosPlatillos);
      };
      obtenerPlatillos();
    }, []);
    
    return (
        <div>
          {platillos.length ? (
            <div className="grid grid-cols-3 gap-8">
              {platillos.map((platillo) => (
                <CardPlatillo key={platillo.id} datos={platillo} botones={botones}/>))}
            </div>
          ) : (
            <div className="flex justify-center items-center text-center">
              <p>No hay detalles para mostrar</p>
            </div>
          )}
        </div>
      );

};

export default GaleriaPlatillos;