import { Routes, Route } from "react-router-dom"
import { useEffect, lazy, Suspense } from "react";
import { useAppDispatch } from "./redux/store";
import { useSelector } from "react-redux";

//styles
import "./scss/main.scss";

//layout
import PrimaryLayout from "./layout/PrimaryLayout";

//components
import Loader from "./components/Loader";

//pages
const Home = lazy(() => import("./pages/Home"))
const Error404 = lazy(() => import("./pages/Error404"));
const Products = lazy(() => import("./pages/Products"));
const Product = lazy(() => import("./pages/Product"));

const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"))

const Account = lazy(() => import("./pages/Profile/Account"));
const WishList = lazy(() => import("./pages/Profile/WishList"));
const Settings = lazy(() => import("./pages/Profile/Settings"));
const MyReviews = lazy(() => import("./pages/Profile/MyReviews"));
const Notifications = lazy(() => import("./pages/Profile/Notifications"));
const MyOrders = lazy(() => import("./pages/Profile/MyOrders"));
const Shipping = lazy(() => import("./pages/Profile/Shipping"));
const Checkout = lazy(() => import("./pages/Checkout"));

//redux
import { fetchAuthMe } from "./redux/user/asyncActions";
import { isAuthSelector } from "./redux/user/selectors";


function App() {
  const dispatch = useAppDispatch();
  const isAuth = useSelector(isAuthSelector);

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
            {isAuth && <Route path={'profile/'}>
              <Route path={'account'} element={<Account />} />
              <Route path={'wishlist'} element={<WishList />} />
              <Route path={'settings'} element={<Settings />} />
              <Route path={'reviews'} element={<MyReviews />} />
              <Route path={'checkout'} element={<Checkout />} />
              <Route path={'my-orders'} element={<MyOrders />} />
              <Route path={'notifications'} element={<Notifications />} />
              <Route path={'shipping'} element={<Shipping />} />
            </Route>
            }
          </Route>
          {!isAuth &&
            <>
              <Route path={'Sandrela/register'} element={<Register />} />
              <Route path={'Sandrela/login'} element={<Login />} />
            </>
          }
          <Route path={'Sandrela/forgot-password'} element={<ForgotPassword />} />
          <Route path={'Sandrela/reset-password/:id/:token/'} element={<ResetPassword />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
