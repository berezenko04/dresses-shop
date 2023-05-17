import { Routes, Route } from "react-router-dom"
import { useEffect, lazy, Suspense } from "react";
import { useAppDispatch } from "./redux/store";

//styles
import "./scss/main.scss";

//layout
import PrimaryLayout from "./layout/PrimaryLayout";

//components
import Loader from "./components/Loader";

//pages
const Home = lazy(() => import("./pages/Home"))
const Products = lazy(() => import("./pages/Products"));
const Product = lazy(() => import("./pages/Product"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Profile = lazy(() => import("./pages/Profile"));
const Error404 = lazy(() => import("./pages/Error404"));

//redux
import { fetchAuthMe } from "./redux/user/asyncActions";


function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [])

  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path={'Sandrela/'} element={<PrimaryLayout />}>
            <Route path={''} element={<Home />} />
            <Route path={'*'} element={<Error404 />} />
            <Route path={'products'} element={<Products />} />
            <Route path={'products/:id'} element={<Product />} />
            <Route path={'profile/:id'} element={<Profile />} />
            <Route path={'checkout/:id'} element={<Checkout />} />
          </Route>
          <Route path={'Sandrela/register'} element={<Register />} />
          <Route path={'Sandrela/login'} element={<Login />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
