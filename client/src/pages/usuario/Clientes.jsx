import { useContext } from "react";
import GaleriaClientes from "../../components/cliente/GaleriaClientes";
import { Context } from "../../context/ContextProvider";
import SearchBar from "../../components/SearchBar";

const Clientes = () => {
  const { setBusquedaCliente, busquedaCliente } = useContext(Context);
  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <h1 className="text-3xl font-bold uppercase text-blue-600">Listado de Clientes</h1>
     <div>
      <SearchBar setBusqueda={setBusquedaCliente} titulo={"buscar por nombre"}/>
      <GaleriaClientes  params={busquedaCliente ? {nombre: busquedaCliente} : {}}/>
     </div>
    </div>
  );
};

export default Clientes;
