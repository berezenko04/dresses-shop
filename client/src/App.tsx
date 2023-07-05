import { Routes, Route } from "react-router-dom"
import { useEffect } from "react";
import { useAppDispatch } from "./redux/store";
import loadable from '@loadable/component'
import pMinDelay from 'p-min-delay'

//styles
import "./scss/main.scss";

//components
import PrimaryLayout from "./layout/PrimaryLayout";
import Loader from "./components/Loader";

//redux
import { fetchAuthMe } from "./redux/user/asyncActions";

const delay = 400;

//pages
const Home = loadable(() => pMinDelay(import('./pages/Home'), delay), {
  fallback: <Loader />,
});
const Error404 = loadable(() => pMinDelay(import('./pages/Error404'), delay), {
  fallback: <Loader />,
});
const Products = loadable(() => pMinDelay(import('./pages/Products'), delay), {
  fallback: <Loader />,
});
const Product = loadable(() => pMinDelay(import('./pages/Product'), delay), {
  fallback: <Loader />,
});
const OrderSuccess = loadable(() => pMinDelay(import('./pages/OrderSuccess'), delay), {
  fallback: <Loader />,
});
const Register = loadable(() => pMinDelay(import('./pages/Register'), delay), {
  fallback: <Loader />,
});
const Login = loadable(() => pMinDelay(import('./pages/Login'), delay), {
  fallback: <Loader />,
});
const ForgotPassword = loadable(() => pMinDelay(import('./pages/ForgotPassword'), delay), {
  fallback: <Loader />,
});
const ResetPassword = loadable(() => pMinDelay(import('./pages/ResetPassword'), delay), {
  fallback: <Loader />,
});
const Account = loadable(() => pMinDelay(import('./pages/Profile/Account'), delay), {
  fallback: <Loader />,
});
const WishList = loadable(() => pMinDelay(import('./pages/Profile/WishList'), delay), {
  fallback: <Loader />,
});
const Settings = loadable(() => pMinDelay(import('./pages/Profile/Settings'), delay), {
  fallback: <Loader />,
});
const MyReviews = loadable(() => pMinDelay(import('./pages/Profile/MyReviews'), delay), {
  fallback: <Loader />,
});
const Notifications = loadable(() => pMinDelay(import('./pages/Profile/Notifications'), delay), {
  fallback: <Loader />,
});
const MyOrders = loadable(() => pMinDelay(import('./pages/Profile/MyOrders'), delay), {
  fallback: <Loader />,
});
const Shipping = loadable(() => pMinDelay(import('./pages/Profile/Shipping'), delay), {
  fallback: <Loader />,
});
const Checkout = loadable(() => pMinDelay(import('./pages/Checkout'), delay), {
  fallback: <Loader />,
});


function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [])

  const token = localStorage.getItem('token');

  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<PrimaryLayout />}>
          <Route path={''} element={<Home />} />
          <Route path={'*'} element={<Error404 />} />
          <Route path={'dresses'} element={<Products />} />
          <Route path={'dresses/:id'} element={<Product />} />
          <Route path={'order-success'} element={<OrderSuccess />} />
          {token && <Route path={'checkout'} element={<Checkout />} />}
          {token && <Route path={'profile/'}>
            <Route path={'account'} element={<Account />} />
            <Route path={'wishlist'} element={<WishList />} />
            <Route path={'settings'} element={<Settings />} />
            <Route path={'reviews'} element={<MyReviews />} />
            <Route path={'orders'} element={<MyOrders />} />
            <Route path={'notifications'} element={<Notifications />} />
            <Route path={'shipping'} element={<Shipping />} />
          </Route>
          }
        </Route>
        {!token && (
          <>
            <Route path={'/register'} element={<Register />} />
            <Route path={'/login'} element={<Login />} />
          </>
        )}
        <Route path={'/forgot-password'} element={<ForgotPassword />} />
        <Route path={'/reset-password/:id/:token/'} element={<ResetPassword />} />
      </Routes>
    </div>
  )
}

export default App
