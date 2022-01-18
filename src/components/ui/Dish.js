const Dish = ({dish}) => {
  const {
    name,
    image,
    inStock,
    category,
    price,
    description,
  } = dish

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
                {price}
              </span>
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Dish