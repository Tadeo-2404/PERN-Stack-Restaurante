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
    
    return(
        <div className={`grid grid-cols-3 gap-8`}>
            {
                platillos.length ? (
                    platillos.map(platillo => (
                        <CardPlatillo key={platillo.id} datos={platillo} botones={botones}/>
                    ))
                ) : (
                    <p>No hay platillos para mostrar</p>
                )
            }
        </div>
)};

export default GaleriaPlatillos;