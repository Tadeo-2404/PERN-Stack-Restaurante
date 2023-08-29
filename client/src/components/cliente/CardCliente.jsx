
const CardCliente = ({cliente}) => {
  return (
    <div className="bg-gray-200 p-4 shadow-xl w-fit">
        <p className="flex flex-col justify-between"><span className="font-bold">nombre</span>{cliente.nombre}</p>
        <p className="flex flex-col justify-between"><span className="font-bold">correo</span>{cliente.correo}</p>
        <p className="flex flex-col justify-between"><span className="font-bold">telefono</span>{cliente.telefono}</p>
    </div>
  )
}

export default CardCliente