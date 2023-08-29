import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/ContextProvider";
import NavBarAdministrador from "../components/administrador/NavBarAdministrador";
import NavBarCliente from "../components/cliente/NavBarCliente";

const TemplateLayout = () => {
  const { tipo, usuario } = useContext(Context);
  console.log("tipo", tipo)
  console.log("usuario", usuario.rol)
  return (
    <div>
      {(usuario.rol === "cliente") ? (
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