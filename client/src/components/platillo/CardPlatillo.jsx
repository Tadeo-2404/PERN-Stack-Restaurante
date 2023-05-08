import { Link } from "react-router-dom";
import { eliminar_platillo } from "../../api/platillo";
import { useNavigate } from "react-router-dom";
import alertify from "alertifyjs";

function CardPlatillo({ datos, botones }) {
  const navigate = useNavigate();
  CardPlatillo.defaultProps = {
    botones: true,
  };

  const eliminarPlatillo = async ({id}) => {
    alertify.confirm(
      `¿Deseas eliminar el platillo ${datos.nombre}?`,
      async function () {
        const eliminado = await eliminar_platillo(parseInt(id));
        alertify.success(`Platillo con el ID ${id} eliminado correctamente`)
        navigate("/administrador");
      },
      function () {}
      );
  };

  return (
    <div className="flex flex-col justify-between items-center bg-gray-200 p-4 shadow-lg rounded-lg w-60 gap-4 text-center">
      <h2 className="text-xl capitalize font-bold">{datos.nombre}</h2>
      <p className="text-base">{datos.descripcion}</p>
      <p className="text-base">
        <span className="font-bold">Precio:</span> ${datos.precio}
      </p>
      {botones && (
        <div className="flex justify-between items-center w-full">
          <Link to={`/administrador/platillo/editar-platillo/?id=${datos.id}`}>
            <button className="p-2 w-20 bg-blue-600 font-bold outline capitalize text-white hover:scale-90">
              editar
            </button>
          </Link>
          <button
            className="p-2 w-20 bg-red-600 font-bold outline capitalize text-white hover:scale-90"
            onClick={() => eliminarPlatillo({ id: datos.id })}
          >
            eliminar
          </button>
        </div>
      )}
    </div>
  );
}

export default CardPlatillo;