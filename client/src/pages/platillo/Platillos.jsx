import SearchBar from "../../components/SearchBar";
import GaleriaPlatillos from "../../components/platillo/GaleriaPlatillos";
import { Context } from "../../context/ContextProvider";
import { useContext } from "react";

const Platillos = () => {
  const { usuario, tipo, setBusqueda, busqueda } = useContext(Context);
  console.log(busqueda)
  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <h1 className="text-3xl font-bold uppercase text-blue-600">Platillos</h1>
      {(usuario.rol === "administrador" && tipo === "administrador") ? (
        <div>
          <SearchBar setBusqueda={setBusqueda}/>
          <GaleriaPlatillos botones={true} params={busqueda ? {nombre: busqueda} : {}}/>
        </div>
      ) : (
        <div>
          <SearchBar setBusqueda={setBusqueda}/>
          <GaleriaPlatillos botones={false} params={busqueda ? {nombre: busqueda} : {}}/>
        </div>
      )}
    </div>
  );
};

export default Platillos;
