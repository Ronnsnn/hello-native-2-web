import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { Routes, Route } from "react-router"
import { FirestoreProvider, StorageProvider, useFirebaseApp, AuthProvider } from "reactfire"
import Menu from "./components/pages/Menu"
import NewDish from "./components/pages/NewDish"
import Orders from "./components/pages/Orders"
import Sidebar from "./components/ui/Sidebar"

const App = () => {
  const app = useFirebaseApp()
  const firestore = getFirestore(app)
  const storage = getStorage(app)
  const auth= getStorage(app)


  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestore}>
        <StorageProvider sdk={storage}>
          <div className="md:flex min-h-screen">
            <Sidebar />
            <div className="md:w-3/5 xl:w-4/5 p-6">
              <Routes>
                <Route path="/" element={<Orders />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/new-dish" element={<NewDish />} />
              </Routes>
            </div>
          </div>
        </StorageProvider>
      </FirestoreProvider>
    </AuthProvider>
  );
}

export default App;
