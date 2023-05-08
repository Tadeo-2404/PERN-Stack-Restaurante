import { useContext, useState } from "react";
import { Context } from "../context/ContextProvider";
import FormularioCrearPlatillo from "../components/platillo/FormularioCrearPlatillo";
import GaleriaPlatillos from "../components/platillo/GaleriaPlatillos";
import { Link } from "react-router-dom";

const Inicio = () => {
  const { tipo, usuario } = useContext(Context);
  const [ show, setShow ] = useState(false);

  const mostrar = () => {
    setShow(!show);
  }

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <div className="flex flex-col justify-center items-center gap-3">
        <h1 className="text-2xl capitalize font-bold">
          <span className="text-blue-600">bienvenido</span> {usuario.nombre}
        </h1>
        <p className="capitalize">¿que deseas hacer hoy?</p>
      </div>
      <div className="flex flex-col gap-8">
        <button
          className="p-2 bg-blue-600 font-bold outline capitalize text-white w-full hover:scale-90"
          onClick={mostrar}
        >
          agregar platillo
        </button>
        {show && <FormularioCrearPlatillo />}
      </div>
      <div className="mt-14">
        <GaleriaPlatillos limite="3" />
        <div className="mt-8">
          <Link to="/administrador/platillo">
            <button className="p-2 bg-blue-600 font-bold outline capitalize text-white hover:scale-90">
              ver mas
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
