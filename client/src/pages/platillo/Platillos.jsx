import GaleriaPlatillos from "../../components/platillo/GaleriaPlatillos";
import { Context } from "../../context/ContextProvider";
import { useContext } from "react";

const Platillos = () => {
  const { usuario, tipo } = useContext(Context);
  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <h1 className="text-3xl font-bold uppercase text-blue-600">Platillos</h1>
      {(usuario.rol === "administrador" && tipo === "administrador") ? (
        <GaleriaPlatillos botones={true} />
      ) : (
        <GaleriaPlatillos botones={false} />
      )}
    </div>
  );
};

export default Platillos;
