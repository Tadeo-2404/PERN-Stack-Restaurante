import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { ImHome } from "react-icons/im";
import { MdFastfood, MdLogout } from "react-icons/md";
import { useContext } from "react";
import { Context } from "../../context/ContextProvider";

const NavBarAdministrador = () => {
  const { auth } = useContext(Context);
  return (
    <>
      {auth.rol === "administrador" ? (
        <div className="bg-orange-500 p-6 text-white uppercase font-bold flex justify-between items-center">
          <div>
            <h1 className="text-2xl">administracion</h1>
          </div>

          <div className="grid grid-cols-4 grid-rows-1 justify-between content-center text-center text-sm">
            <div className="flex justify-center items-center p-2">
              <div className="hover:translate-y-1">
                <Link to="/" className="flex justify-center items-center gap-2">
                  <ImHome />
                  <p className="hover:underline">inicio</p>
                </Link>
              </div>
            </div>

            <div className="flex justify-center items-center p-2">
              <div className="hover:translate-y-1">
                <Link
                  to="/platillos"
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
                  to="/perfil"
                  className="flex justify-center items-center gap-2"
                >
                  <FaUserAlt />
                  <p className="hover:underline">perfil</p>
                </Link>
              </div>
            </div>

            <div className="flex justify-center items-center p-2">
              <div className="hover:translate-y-1">
                <Link
                  to="/perfil"
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
            <h1 className="text-2xl">administracion</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBarAdministrador;
