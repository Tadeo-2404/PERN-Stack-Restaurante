import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import alertify from "alertifyjs";
import { eliminar_orden } from "../../api/orden";
import { useContext } from "react";
import { Context } from "../../context/ContextProvider";

function CardOrden({ datos, botones }) {
  const { usuario } = useContext(Context);
  const navigate = useNavigate();
  CardOrden.defaultProps = {
    botones: true,
  };

  const eliminarOrden = async ({ id }) => {
    alertify.confirm(
      `¿Deseas eliminar el orden ${datos.id}?`,
      async function () {
        const eliminado = await eliminar_orden(parseInt(id));
        alertify.success(`Orden con el ID ${id} eliminado correctamente`);
        navigate("/cliente/orden");
      }
    );
  };

  return (
    <div className="flex flex-col justify-between items-center bg-gray-200 p-4 shadow-lg rounded-lg gap-4 text-center">
      <h2 className="text-xl capitalize font-bold">Orden</h2>
      <p className="text-base">
        <span className="font-bold uppercase">id: </span>
        {datos.id}
      </p>
      <p className="text-base">
        <span className="font-bold capitalize">clienteId: </span>
        {datos.clienteId}
      </p>
      <p className="text-base">
        <span className="font-bold capitalize">fecha: </span>
        {datos.fecha}
      </p>
      <p className="text-base">
        <span className="font-bold capitalize">total: </span>
        {parseInt(datos.total).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </p>
      {botones && (
        <div className="flex justify-between items-center w-full">
          <Link to={`/${usuario.rol}/orden/editar-orden/?id=${datos.id}`}>
            <button className="p-2 w-20 bg-blue-600 font-bold outline capitalize text-white hover:scale-90">
              editar
            </button>
          </Link>
          <Link to={`/${usuario.rol}/orden/detalle-orden/?id=${datos.id}`}>
            <button className="p-2 w-20 bg-green-600 font-bold outline capitalize text-white hover:scale-90">
              detalles
            </button>
          </Link>
          <button
            className="p-2 w-20 bg-red-600 font-bold outline capitalize text-white hover:scale-90"
            onClick={() => eliminarOrden({ id: datos.id })}
          >
            eliminar
          </button>
        </div>
      )}
    </div>
  );
}

export default CardOrden;
