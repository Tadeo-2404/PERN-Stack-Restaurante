import FormularioUsuario from '../../components/usuario/FormularioUsuario';
import { Context } from '../../context/ContextProvider'
import { useContext } from 'react'

const Perfil = () => {
    const { usuario } = useContext(Context);
  return (
    <div className='flex flex-col justify-center items-center bg-white shadow-2xl p-6 gap-4'>
        <h1 className='uppercase font-bold text-3xl text-blue-600'>mi perfil</h1>
        <FormularioUsuario usuario={usuario} />
    </div>
  ) 
}

export default Perfil