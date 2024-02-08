import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import RegisterComplete from "./pages/auth/RegisterComplete";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Header from "./Components/nav/Header";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { currentUser } from "./functions/auth";
import History from "./pages/user/History";
import Password from "./pages/user/Password";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import SubCreate from "./pages/admin/sub/SubCreate";
import SubUpdate from "./pages/admin/sub/SubUpdate";
import ProductCreate from "./pages/admin/product/ProductCreate";
import AllProducts from "./pages/admin/product/AllProducts";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import Product from "./pages/Product";
import CategoryHome from "./pages/category/CategoryHome";
import SubHome from "./pages/sub/SubHome";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import SideDrawer from "./Components/drawer/SideDrawer";
import CheckOut from "./pages/CheckOut";
import Coupon from "./pages/admin/coupon/Coupon";
import Payment from "./pages/Payment";
import Wishlist from "./pages/user/Wishlist";


const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const idTokenResult = await user.getIdTokenResult()
                console.log("user", user);
                currentUser(idTokenResult.token)
                    .then(
                        (res) => {
                            dispatch({
                                type: 'LOGGED_IN_USER',
                                payload: {
                                    name: res.data.name,
                                    email: res.data.email,
                                    token: idTokenResult.token,
                                    role: res.data.role,
                                    _id: res.data._id
                                }
                            });
                        }
                    )
                    .catch(err => console.log(err));
            }
        })
        return () => unsubscribe()
    }, [dispatch])
    return (
        <BrowserRouter>
            <Header />
            <SideDrawer />
            <ToastContainer style={{ fontSize: "20px" }} />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/register' element={<Register />} />
                <Route exact path='/register/complete' element={<RegisterComplete />} />
                <Route exact path='/forgot/password' element={<ForgotPassword />} />
                <Route exact path='/user/history' element={<History />} />
                <Route exact path='/user/password' element={<Password />} />
                <Route exact path='/user/wishlist' element={<Wishlist />} />
                <Route exact path='/admin/dashboard' element={<AdminDashboard />} />
                <Route exact path='/admin/category' element={<CategoryCreate />} />
                <Route exact path="/admin/category/:slug" element={<CategoryUpdate />} />
                <Route exact path="/admin/sub" element={<SubCreate />} />
                <Route exact path="/admin/sub/:slug" element={<SubUpdate />} />
                <Route exact path="/admin/product" element={<ProductCreate />} />
                <Route exact path="/admin/products" element={<AllProducts />} />
                <Route exact path="/admin/product/:slug" element={<ProductUpdate />} />
                <Route exact path='/product/:slug' element={<Product />} />
                <Route exact path='/category/:slug' element={<CategoryHome />} />
                <Route exact path='/sub/:slug' element={<SubHome />} />
                <Route exact path='/shop' element={<Shop />} />
                <Route exact path='/cart' element={<Cart />} />
                <Route exact path='/checkout' element={<CheckOut />} />
                <Route exact path='/admin/coupon' element={<Coupon />} />
                <Route exact path='/payment' element={<Payment />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
