import { useContext, useEffect, useState } from "react"
import { Context } from "../../context/ContextProvider"
import { useParams, Link } from "react-router-dom"
import alertify from "alertifyjs"

const ConfirmarCuenta = () => {
  const { confirmarCuenta, tipo } = useContext(Context)
  const { token } = useParams();
  const [ confirmado, setConfirmado ] = useState({tipo: 'error', respuesta: 'Token invalido, intentalo de nuevo'});
  const iniciarSesion = tipo === "cliente" ? "/cliente/iniciar-sesion" : "/administrador/iniciar-sesion";

  useEffect(() => {
    const confirmar = async () => {
      const respuesta = await confirmarCuenta(token);
      if(respuesta.tipo === "exito") {
        setConfirmado(respuesta);
        alertify.succes('confirmado')
        return;
      } 
      alertify.error('error')
    }
    confirmar();
  }, [])
  
  
  return (
    <div className="bg-white p-8 flex flex-col justify-center items-center shadow-2xl">
      {confirmado.tipo === "exito" ? (
        <div className="flex flex-col gap-3">
          <div className="bg-green-500 text-white uppercase p-4 font-bold">
            <h1>{confirmado.respuesta}</h1>
          </div>
          <div className="text-center underline text-blue-600">
            <Link to={iniciarSesion}>Iniciar Sesion</Link>
          </div>
        </div>
      ) : (
        <div className="bg-red-500 text-white uppercase p-4 font-bold">
          <h1>{confirmado.respuesta}</h1>
        </div>
      )}
    </div>
  );
}

export default ConfirmarCuenta