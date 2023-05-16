import { Link } from "react-router-dom"
const Principal = () => {
  return (
    <div className="bg-white shadow-2xl p-4">
      <div className="text-center flex flex-col justify-center items-center">
        <h1 className="text-3xl">Bienvenido a Restaurante Virtual</h1>
        <p className="text-xl">selecciona a donde deseas ir</p>
        <div className="grid grid-cols-2 mt-5 w-full gap-8">
          <Link to="/administrador/iniciar-sesion"><button className="uppercase w-full p-2 text-white bg-blue-600 font-bold">panel administrador</button></Link>
          <Link to="/cliente/iniciar-sesion"><button className="uppercase w-full p-2 text-white bg-blue-600 font-bold">panel cliente</button></Link>
        </div>
      </div>
    </div>
  );
}

export default Principal;