import { useEffect, useState } from 'react'
import { obtener_clientes } from '../../api/usuario';
import CardCliente from './CardCliente';

const GaleriaClientes = ({params}) => {
    const [clientes, setClientes] = useState([]);
    
    useEffect(() => {
      const obtenerClientes = async () => {
        const clientesObtener = await obtener_clientes(params);
        setClientes(clientesObtener);
      };
      obtenerClientes();
    }, [params]);
    
    return (
        <div>
          {clientes.length > 0 ? (
            <div className="grid grid-cols-3 gap-8">
              {clientes.map((cliente) => (
                <CardCliente key={cliente.id} cliente={cliente}/>
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

export default GaleriaClientes;