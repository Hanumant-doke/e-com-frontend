import { Button, Grid } from '@mui/material';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ProductCardInCheckout from '../Components/cards/ProductCardInCheckout';
import { userCart } from '../functions/user';

export default function Cart() {
    const { cart, user } = useSelector((state) => ({ ...state }))
    let dispatch = useDispatch()

    const navigate = useNavigate()

    const getTotal = () => {
        return cart.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    }

    const saveOrderToDb = () => {
        userCart(cart, user.token)
            .then((res) => {
                console.log("CART POST RESULT", res);
                if (res.data.ok) navigate("/checkout")
            }).catch((err) => {
                console.log("cart save error", err);
            })
    }

    const showCartItems = () => (
        <div style={{ padding: 15 }}>
            <table className='table table-borderd' >
                <thead className='thead-light' >
                    <tr>
                        <th scope='col'>Image</th>
                        <th scope='col'>Title</th>
                        <th scope='col'>Price</th>
                        <th scope='col'>Brand</th>
                        <th scope='col'>Color</th>
                        <th scope='col'>Count</th>
                        <th scope='col'>Shopping</th>
                        <th scope='col'>Remove</th>
                    </tr>
                </thead>
                {cart.map((p) => (
                    <ProductCardInCheckout key={p._id} p={p} />
                ))}
            </table>
        </div>
    )
    return (
        <div style={{ padding: 20 }}>
            <Grid container>
                <Grid item xs={8}>
                    <h4>Cart / {cart.length} Product</h4>

                    {!cart.length ? <p>No products in cart . <Link to="/shop">Continue Shopping .</Link></p> :
                        showCartItems()
                    }
                </Grid>
                <Grid item xs={4}>
                    <h4>Order Summary</h4>
                    <hr />
                    <p>Products</p>
                    {cart.map((c, i) => (
                        <div key={i}>
                            <p>{c.title} x {c.count}  = ${c.price * c.count}</p>
                        </div>
                    ))}
                    <hr />
                    Total: <b>${getTotal()}</b>
                    <hr />

                    {
                        user ? (<Button variant='outlined' onClick={saveOrderToDb} disabled={!cart.length}>
                            Proceed to checkout</Button>)
                            : (<Button variant='outlined' >
                                <Link to={{
                                    pathname: "/login",
                                    state: { from: "cart" }
                                }}>Login to checkout</Link>
                            </Button>)
                    }
                </Grid>
            </Grid>
        </div>
    )
}
