import { useRef, useState } from "react"
import { useFirestore, update } from "reactfire"
import { doc, updateDoc } from 'firebase/firestore'


const Dish = ({dish}) => {
  const firestore = useFirestore()
  const [isLoading, setIsLoading] = useState(false)
  const {
    id,
    name,
    image,
    inStock,
    category,
    price,
    description,
  } = dish
  const inStockRef = useRef(inStock)

  const handleInStockChange = async () => {
    try {
      setIsLoading(true)
      const changedInStock = inStockRef.current.value === "true"
      const dishesRef = doc(firestore, `dishes/${id}`)
      await updateDoc(dishesRef, {inStock: changedInStock})
      setIsLoading(false)
    } catch (err) {
      console.log(err)
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full px-3 mb-4">
      <div className="p-5 shadow-md bg-white">
        <div className="lg:flex">
          <div className="lg:w-5/12 xl:3/12">
            <img src={image} alt="imagen" />
          </div>
          <div className="lg:w-7/12 xl:9/12 pl-5">
            <p className="font-bold text-2xl text-yellow-600 mb-4">
              {name}
            </p>
            <p className="text-gray-600 mb-4">
              Categoría: {' '}
              <span className="text-gray-700 font-bold">{category}</span>
            </p>
            <p className="text-gray-600 mb-4">
              {description}
            </p>
            <p className="text-gray-600 mb-4">
              Precio: {' '}
              <span className="text-gray-700 font-bold">
                ${price}
              </span>
            </p>
            <div className="flex items-center mt-5">
              <span>Existencia:</span>
              <select
                className="bg-white shadow appearance-none border rounded py-1 px-3 ml-3 text-xs leading-tight focus:outline-none focus:shadow-outline"
                value={inStock}
                ref={inStockRef}
                onChange={handleInStockChange}
                disabled={isLoading}
              >
                <option value="true">Disponible</option>
                <option value="false">NO Disponible</option>
              </select>
              {isLoading && <div>Cargando...</div>}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Dish