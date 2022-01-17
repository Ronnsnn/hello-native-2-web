import { getFirestore } from "firebase/firestore"
import { Routes, Route } from "react-router"
import { FirestoreProvider, useFirebaseApp } from "reactfire"
import Menu from "./components/pages/Menu"
import NewDish from "./components/pages/NewDish"
import Orders from "./components/pages/Orders"
import Sidebar from "./components/ui/Sidebar"

const App = () => {
  const firestoreInstance = getFirestore(useFirebaseApp())
  return (
    <FirestoreProvider sdk={firestoreInstance}>
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
    </FirestoreProvider>
  );
}

export default App;
