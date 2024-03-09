import './App.css'
import NavBar from "./components/NavBar/NavBar";
import {Route, Routes} from "react-router-dom";
import Transactions from "./components/transaction/Transactions";
import Category from "./components/category/Category";
function App() {

  return (
    <>
      <header><NavBar/></header>
        <main>
            <Routes>
                <Route path='/' element={<Transactions/>} />
                <Route path='category' element={<Category/>}/>
            </Routes>
        </main>
    </>
  )
}

export default App
