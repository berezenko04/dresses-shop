import { Routes, Route } from "react-router-dom"
import { useEffect } from "react";
import { useAppDispatch } from "./redux/store";
import { useSelector } from "react-redux";

//styles
import "./scss/main.scss";

//layout
import PrimaryLayout from "./layout/PrimaryLayout";

//pages
import Home from "./pages/Home"
import Products from "./pages/Products";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";

//redux
import { fetchAuthMe } from "./redux/auth/asyncActions";
import { authDataSelector } from "./redux/auth/selectors";


function App() {
  const dispatch = useAppDispatch();
  const data = useSelector(authDataSelector);

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path={'Sandrela/'} element={<PrimaryLayout />}>
          <Route path={''} element={<Home />} />
          <Route path={'products'} element={<Products />} />
          <Route path={'products/:id'} element={<Product />} />
          <Route path={'profile/:id'} element={<Profile />} />
          <Route path={'checkout/:id'} element={<Checkout />} />
        </Route>
        <Route path={'Sandrela/register'} element={<Register />} />
        <Route path={'Sandrela/login'} element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
