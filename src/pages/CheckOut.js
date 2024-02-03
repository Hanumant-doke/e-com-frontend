import { Button, Grid } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react'
import { getUserCart, emptyUserCart, saveUserAddress, applyCoupon } from '../functions/user';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

export default function CheckOut() {
    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)
    const [address, setAddress] = useState("")
    const [addressSaved, setAddressSaved] = useState(false)
    const [coupon, setCoupon] = useState("")
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
    const [discountError, setDiscountError] = useState("")

    const navigate = useNavigate();

    const dispatch = useDispatch()
    const { user } = useSelector((state) => ({ ...state }));
    console.log(user, 'user');


    useEffect(() => {
        // Check if user is not null before making the API call
        if (user && user.token) {
            getUserCart(user.token)
                .then((res) => {
                    console.log("user cart result", JSON.stringify(res.data, null, 4));
                    setProducts(res.data.products);
                    setTotal(res.data.cartTotal)
                })
                .catch((error) => {
                    console.error("Error fetching user cart:", error);
                });
        }
    }, [user])


    const emptyCart = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem("cart")
        }
        dispatch({
            type: "ADD_TO_CART",
            payload: [],
        })
        emptyUserCart(user.token)
            .then((res) => {
                setProducts([])
                setTotal(0);
                setTotalAfterDiscount(0)
                setCoupon("")
                toast.success("cart is empty . Continue shopping")
            })
    }

    const saveAddressToDb = () => {
        saveUserAddress(user.token, address).then((res) => {
            if (res.data.ok) {
                setAddressSaved(true)
                toast.success("Address saved")
            }
        })
    }
    const showAddress = () => (
        <> <ReactQuill theme='snow' value={address} onChange={setAddress} />
            <br />
            <Button onClick={saveAddressToDb} variant='contained'>Save</Button>
        </>)

    const showProductSummary = () =>
        products.map((p, i) => (
            <div key={i}>
                <p>{p.product.title} ({p.color}) X {p.count} = {""}
                    {p.product.price * p.count}
                </p>
            </div>
        )
        )

    const applyDiscountCoupon = () => {
        applyCoupon(user.token, coupon)
            .then((res) => {
                if (res.data) {
                    setTotalAfterDiscount(res.data)
                    dispatch({
                        type: "COUPON_APPLIED",
                        payload: true,
                    })
                }
                if (res.data.err) {
                    setDiscountError(res.data.err)
                    dispatch({
                        type: "COUPON_APPLIED",
                        payload: false,
                    })
                }
            })
    }

    const showApplyCoupon = () => (
        <>
            <input onChange={(e) => {
                setCoupon(e.target.value)
                setDiscountError("")
            }}
                value={coupon}
                type='text'
                className='form-control'
            />
            <br />
            <Button variant='contained' onClick={applyDiscountCoupon}>Apply</Button>
        </>
    )
    return (
        <div>
            <Grid container padding={2} spacing={4}>
                <Grid item xs={6}>
                    <h4>Delivery Address</h4>
                    <br />
                    {showAddress()}
                    <hr />
                    <h4>Got Coupon ?</h4>
                    <br />
                    {showApplyCoupon()}
                    <br />
                    {discountError && <p className='bg-danger mt-3 p-1'>{discountError}</p>}
                </Grid>
                <Grid item xs={6}>
                    <h4>Order Summary</h4>
                    {/* <h1>${total}</h1> */}
                    <hr />
                    <p>Products {products.length}</p>
                    <hr />
                    {showProductSummary()}
                    <hr />
                    <p>Card total: {total}</p>
                    {totalAfterDiscount > 0 && (
                        <p className='bg-success p-2'>Discount Applied : Total payable : {totalAfterDiscount}</p>
                    )}
                    <Grid container style={{ justifyContent: "space-around" }}>
                        <Grid item xs={3}>
                            <Button variant='contained' onClick={() => navigate("/payment")}
                                disabled={!addressSaved || !products.length}>Place Order</Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button variant='contained'
                                disabled={!products.length} onClick={emptyCart}>Empty Cart</Button>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </div>
    )
}
