import { useFormik } from "formik"
import * as Yup from "yup"
import { collection, addDoc } from 'firebase/firestore'
import { useFirestore, useStorage } from 'reactfire'
import { useNavigate } from "react-router-dom"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

const NewDish = () => {
  const firestore = useFirestore()
  const storage = useStorage()
  const navigate = useNavigate()
  const handleImgChange = (e) => formik.setFieldValue('image', e.currentTarget.files[0])

  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      category: '',
      image: '',
      description: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3,'Los platillos deben tener al menos 3 caracteres')
        .required('El nombre del platillo es requerido'),
      price: Yup.number()
        .min(1,'Debes agregar un número')
        .required('El precio del platillo es requerido'),
      category: Yup.string()
        .required('La categoría del platillo es requerida'),
      description: Yup.string()
        .min(10,'La descripción debe ser más larga')
        .required('La categoría del platillo es requerida'),
    }),
    onSubmit: async (data) => {
      try {
        const dishesRef = collection(firestore, 'dishes')
        const storageRef  = ref(storage,`dishes/${Date.now()}/${data.image.name}`)
        const uploadTask = await uploadBytes(storageRef, data.image, {contentType:'image/jpeg'});
        const imgData = await getDownloadURL(uploadTask.ref)
        data.inStock = true
        data.image = imgData 
        await addDoc(dishesRef, data)
        // TODO: add progess data
        navigate('/menu')
      } catch (err) {
        console.log(err)
      }
    }
  })

  return (
    <>
      <h1 className="text-3xl font-light mb-4">
        Agregar Platillo
      </h1>
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-3xl">
          <form
            onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Nombre">
                Nombre
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                placeholder="Nombre Platillo"
              />
              {
                formik.touched.name && formik.errors.name ? (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 py-2 px-4 text-xs mb-4 mt-2" role="alert">
                      <p className="font-bold">Error:</p>
                      <p>{formik.errors.name}</p>
                    </div>
                  ) : null
              }
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Precio">
                Precio
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="price"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="number"
                min="0"
                placeholder="Precio"
              />
              {
                formik.touched.price && formik.errors.price ? (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 py-2 px-4 text-xs mb-4 mt-2" role="alert">
                      <p className="font-bold">Error:</p>
                      <p>{formik.errors.price}</p>
                    </div>
                  ) : null
              }
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Categoría">
                Categoría
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">---Seleccione---</option>
                <option value="desayuno">Desayuno</option>
                <option value="comida">Comida</option>
                <option value="cena">Cena</option>
                <option value="bebida">Bebida</option>
                <option value="postre">Postre</option>
                <option value="ensalada">Ensalada</option>
              </select>
              {
                formik.touched.category && formik.errors.category ? (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 py-2 px-4 text-xs mb-4 mt-2" role="alert">
                      <p className="font-bold">Error:</p>
                      <p>{formik.errors.category}</p>
                    </div>
                  ) : null
              }
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Imagen">
                Imagen
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="image"
                name="image"
                value={undefined}
                onChange={handleImgChange}
                type="file"
              />
              
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Descripción">
                Descripción
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
                id="description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                placeholder="Descripción Platillo"
              />
              {
                formik.touched.description && formik.errors.description ? (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 py-2 px-4 text-xs mb-4 mt-2" role="alert">
                      <p className="font-bold">Error:</p>
                      <p>{formik.errors.description}</p>
                    </div>
                  ) : null
              }
            </div>

            <input 
              type="submit"
              className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
              value="Agregar platillo"
            />

          </form>
        </div>
      </div>

    </>
  )
}

export default NewDish