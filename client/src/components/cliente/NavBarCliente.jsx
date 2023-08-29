import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { ImHome } from "react-icons/im";
import { MdFastfood, MdLogout } from "react-icons/md";
import { useContext } from "react";
import { Context } from "../../context/ContextProvider";
import alertify from 'alertifyjs';

const NavBarCliente = () => {
  const { usuario, tipo, cerrarSesion } = useContext(Context);
  console.log("tipo", tipo)
  console.log("usuario", usuario.rol)
  const cerrar_sesion = async () => {
    const cerrar = await cerrarSesion();
    alertify.success(`${cerrar.message}`);
  }
  return (
    <>
      {usuario.rol === "cliente" && tipo === "cliente" ? (
        <div className="bg-orange-500 p-6 text-white uppercase font-bold flex justify-between items-center">
          <div>
            <h1 className="text-2xl">restaurante</h1>
          </div>

          <div className="grid grid-cols-5 grid-rows-1 justify-between content-center text-center text-sm">
            <div className="flex justify-center items-center p-2">
              <div className="hover:translate-y-1">
                <Link to="/cliente" className="flex justify-center items-center gap-2">
                  <ImHome />
                  <p className="hover:underline">inicio</p>
                </Link>
              </div>
            </div>

            <div className="flex justify-center items-center p-2">
              <div className="hover:translate-y-1">
                <Link
                  to="/cliente/platillo"
                  className="flex justify-center items-center gap-2"
                >
                  <MdFastfood />
                  <p className="hover:underline">platillos</p>
                </Link>
              </div>
            </div>

            <div className="flex justify-center items-center p-2">
              <div className="hover:translate-y-1">
                <Link
                  to="/cliente/orden"
                  className="flex justify-center items-center gap-2"
                >
                  <MdFastfood />
                  <p className="hover:underline">mis ordenes</p>
                </Link>
              </div>
            </div>

            <div className="flex justify-center items-center p-2">
              <div className="hover:translate-y-1">
                <Link
                  to="/cliente/perfil"
                  className="flex justify-center items-center gap-2"
                >
                  <FaUserAlt />
                  <p className="hover:underline">perfil</p>
                </Link>
              </div>
            </div>

            <div className="flex justify-center items-center p-2">
              <div className="hover:translate-y-1" onClick={() => cerrar_sesion()}>
                <Link
                  to="/cliente/cerrar-sesion"
                  className="flex justify-center items-center gap-2"
                >
                  <MdLogout className="text-xl" />
                  <p className="hover:underline">salir</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-orange-500 p-6 text-white uppercase font-bold flex justify-center items-center">
          <div>
            <h1 className="text-2xl">restaurante</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBarCliente;
