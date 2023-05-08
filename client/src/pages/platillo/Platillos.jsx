import GaleriaPlatillos from "../../components/platillo/GaleriaPlatillos"

const Platillos = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6">
        <h1 className="text-3xl font-bold uppercase text-blue-600">Platillos</h1>
        <GaleriaPlatillos />
    </div>
  )
}

export default Platillos