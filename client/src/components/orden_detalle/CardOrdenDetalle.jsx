function CardOrdenDetalle({ datos, botones }) {

  const limpiarFecha = (fechaCompleta) => {
    const fecha = fechaCompleta.slice(0, 10);
    return fecha;
  }

  return (
    <div className="flex flex-col justify-between items-center bg-gray-200 p-4 shadow-lg rounded-lg gap-4 text-center">
      <h2 className="text-xl capitalize font-bold">Orden</h2>
      <p className="text-base"><span className="font-bold uppercase">id: </span>{datos.id}</p>
      <p className="text-base"><span className="font-bold capitalize">clienteId: </span>{datos.clienteId}</p>
      <p className="text-base"><span className="font-bold capitalize">fecha: </span>{limpiarFecha(datos.fecha)}</p>
      <p className="text-base"><span className="font-bold capitalize">total: </span>{datos.total}</p>
    </div>
  );
}

export default CardOrdenDetalle;