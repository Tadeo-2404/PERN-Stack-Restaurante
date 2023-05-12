import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/ContextProvider'

const Error404 = () => {
  const { tipo } = useContext(Context)
  const ruta =  window.location.pathname;
  return (
    <div>
      <div className="flex flex-col justify-center item-center text-center p-4 bg-white shadow-2xl gap-4">
        <h1 className="text-blue-600 font-bold uppercase text-3xl">error 404</h1>
        <p className="text-xl">La ruta <span className="font-bold">{ruta}</span> no existe</p>
        <Link to={`/${tipo}`}>
          <button className="p-2 bg-blue-600 font-bold outline capitalize text-white w-full hover:scale-90">volver a inicio</button>
        </Link>
      </div>
    </div>
  )
}

export default Error404