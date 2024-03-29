import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";
import { LoadingOutlined } from "@ant-design/icons";

const Home = lazy(() => import('./pages/Home'));
const Register = lazy(() => import("./pages/auth/Register"));
const Login = lazy(() => import("./pages/auth/Login"));
const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete"));
const Header = lazy(() => import("./Components/nav/Header"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const History = lazy(() => import("./pages/user/History"));
const Password = lazy(() => import("./pages/user/Password"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const CategoryCreate = lazy(() => import("./pages/admin/category/CategoryCreate"));
const CategoryUpdate = lazy(() => import("./pages/admin/category/CategoryUpdate"));
const SubCreate = lazy(() => import("./pages/admin/sub/SubCreate"));
const SubUpdate = lazy(() => import("./pages/admin/sub/SubUpdate"));
const ProductCreate = lazy(() => import("./pages/admin/product/ProductCreate"));
const AllProducts = lazy(() => import("./pages/admin/product/AllProducts"));
const ProductUpdate = lazy(() => import("./pages/admin/product/ProductUpdate"));
const Product = lazy(() => import("./pages/Product"));
const CategoryHome = lazy(() => import("./pages/category/CategoryHome"));
const SubHome = lazy(() => import("./pages/sub/SubHome"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const SideDrawer = lazy(() => import("./Components/drawer/SideDrawer"));
const CheckOut = lazy(() => import("./pages/CheckOut"));
const Coupon = lazy(() => import("./pages/admin/coupon/Coupon"));
const Payment = lazy(() => import("./pages/Payment"));
const Wishlist = lazy(() => import("./pages/user/Wishlist"));


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
            <Suspense fallback={
                <div >___REACT<LoadingOutlined />ECOM___</div>
            }>
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
            </Suspense>

        </BrowserRouter>
    );
}

export default App;
