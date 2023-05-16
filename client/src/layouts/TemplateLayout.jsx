import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/ContextProvider";
import NavBarAdministrador from "../components/administrador/NavBarAdministrador";
import NavBarCliente from "../components/cliente/NavBarCliente";

const TemplateLayout = () => {
  const { tipo } = useContext(Context);
  return (
    <div>
      {(tipo === "cliente" || tipo === "/") ? (
        <NavBarCliente/>
      ) : (
        <NavBarAdministrador/>
      )}
      <div className="flex flex-col justify-center items-center p-4 bg-slate-100 min-h-screen">
        <Outlet/>
      </div>
    </div>
  );
}

export default TemplateLayout