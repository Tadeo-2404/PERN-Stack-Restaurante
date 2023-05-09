function CardOrdenDetalle({ datos }) {
  return (
    <div className="flex flex-col justify-between items-center bg-gray-200 p-4 shadow-lg rounded-lg gap-4 text-center">
      <h2 className="text-xl capitalize font-bold">Orden</h2>
      <p className="text-base"><span className="font-bold uppercase">id: </span>{datos.id}</p>
      <p className="text-base"><span className="font-bold capitalize">ordenId: </span>{datos.ordenId}</p>
      <p className="text-base"><span className="font-bold capitalize">platilloId: </span>{datos.platilloId}</p>
      <p className="text-base"><span className="font-bold capitalize">precio unitario: </span>{datos.precio_unitario}</p>
      <p className="text-base"><span className="font-bold capitalize">cantidad: </span>{datos.cantidad}</p>
      <p className="text-base"><span className="font-bold capitalize">subtotal: </span>${datos.subtotal}</p>
    </div>
  );
}

export default CardOrdenDetalle;