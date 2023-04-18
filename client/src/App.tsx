import { Routes, Route } from "react-router-dom"

import "./scss/main.scss";

import PrimaryLayout from "./layout/PrimaryLayout";

import Home from "./pages/Home"
import Products from "./pages/Products";
import Product from "./pages/Product";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path={'Sandrela/'} element={<PrimaryLayout />}>
          <Route path={''} element={<Home />} />
          <Route path={'products'} element={<Products />} />
          <Route path={'products/:id'} element={<Product />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
