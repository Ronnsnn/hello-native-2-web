import { collection, orderBy, query } from "firebase/firestore"
import { Link } from "react-router-dom"
import { useFirestore, useFirestoreCollectionData } from "reactfire"
import Dish from "../ui/Dish"

const Menu = () => {
  const firestore = useFirestore()
  const dishesCollection = collection(firestore, 'dishes')
  const dishesQuery = query(dishesCollection, orderBy('name'))

  const { status, data: dishes } = useFirestoreCollectionData(dishesQuery, {
    idField: 'id'
  })

  return (
    <>
      <h1 className="text-3xl font-light mb-4">
        Menú
      </h1>
      <Link
        className="bg-blue-800 hover:bg-blue-700 inline-block mb-5 p-2 text-white uppercase font-bold"
        to="/new-dish">
        Agregar platillo
      </Link>

      {
        status === 'loading' && <div>Cargando</div> 
      }
      {
        status === 'success' && (
        dishes.map(dish => <Dish key={dish.id} dish={dish}/>)
        )
      }
    </>
  )
}

export default Menu