import { NavLink } from "react-router-dom"

const Sidebar = () => {
  return (
    <div className="md:w-2/5 xl:w-1/5 bg-gray-800">
      <div className="p-6">
        <p className="uppercase text-white text-2xl tracking-wide font-bold">
          RestauratApp
        </p>
        <p className="mt-3 text-gray-600">
          Adminsitra tu restaurant en las siguientes opciones
        </p>
        <nav>
          <NavLink
            className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900"
            to="/">
              Órdenes
          </NavLink>
          <NavLink
            className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900"
            to="/menu">
            Menú
          </NavLink>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar