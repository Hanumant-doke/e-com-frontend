import React, { useEffect, useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useSelector, useDispatch } from 'react-redux';
import { createPaymentIntent } from '../functions/stripe'
import { Link, useNavigate } from 'react-router-dom'
import { Card } from 'antd';
import { DollarOutlined, CheckOutlined } from '@ant-design/icons';
import image from "../images/image.png"
import { createOrder, emptyUserCart } from '../functions/user';

export default function StripeCheckOut() {
    const { user, coupon } = useSelector((state) => ({ ...state }))
    let dispatch = useDispatch()

    const [succeeded, setSucceeded] = useState(false)
    const [error, setError] = useState(null)
    const [processing, setProcessing] = useState("")
    const [disabled, setDisabled] = useState(true)
    const [clientSecret, setClientSecret] = useState("")

    const [cartTotal, setCartTotal] = useState(0)
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
    const [payable, setPayable] = useState(0)

    const navigate = useNavigate()
    const stripe = useStripe()
    const elements = useElements()

    useEffect(() => {
        if (user && user.token) {
            createPaymentIntent(user.token, coupon)
                .then((res) => {
                    console.log('create payment intent', res.data);
                    setClientSecret(res.data.clientSecret)
                    setCartTotal(res.data.cartTotal)
                    setTotalAfterDiscount(res.data.totalAfterDiscount)
                    setPayable(res.data.payable)
                })
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setProcessing(true)

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: e.target.name.value,
                }
            }
        })
        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`)
            setProcessing(false)
        } else {
            createOrder(payload, user.token)
                .then((res) => {
                    if (res.data.ok) {
                        if (typeof window !== "undefined") localStorage.removeItem("cart");
                        dispatch({
                            type: "ADD_TO_CART",
                            payload: []
                        })
                        dispatch({
                            type: "COUPON_APPLIED",
                            payload: false,
                        })
                        emptyUserCart(user.token)
                    }
                })
            console.log(JSON.stringify(payload, null, 4));
            setError(null)
            setProcessing(false)
            setSucceeded(true)
        }
    }

    const handleChange = async (e) => {
        setDisabled(e.empty)
        setError(e.error ? e.error.message : "")
    }

    const cartStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: "Arial, sans-serif",
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d",
                },
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a",
            },
        },
    };

    return (
        <>
            {!succeeded && <div>
                {coupon && totalAfterDiscount !== undefined ? (<p className='alert alert-success'>
                    {`Total after discount : $${totalAfterDiscount}`}
                </p>) : (<p className='alert alert-danger' style={{ textAlign: "center" }}>No Coupon Applid</p>)}
            </div>
            }
            <div className='text-center  pb-5'>
                <Card
                    cover={<img src={image} style={{ height: "30px", objectFit: "cover", marginBottom: "-70px", margin: 5 }}
                    />
                    }
                    actions={[
                        <>
                            <DollarOutlined className='text-info' /><br /> Total: $
                            {cartTotal}
                        </>,
                        <>
                            <CheckOutlined className='text-info' /><br /> Total payable: $
                            {(payable / 100).toFixed(2)}
                        </>
                    ]}
                />
            </div>
            <form id='payment-form' className='stripe-form' onSubmit={handleSubmit}>
                <CardElement
                    id='card-element'
                    options={cartStyle}
                    onChange={handleChange} />

                <button className='stripe-button' disabled={processing || disabled || succeeded}>
                    <span id="button-text"> {processing ? <div className='spinner' id='spinner'></div> :
                        "Pay"}</span>
                </button>
                {error && <div className='card-error' role="alert"
                    style={{ textAlign: 'center', paddingTop: 5, fontWeight: "bold" }}> {error}</div>}
                <br />
                <p className={succeeded ? "result-message" : "result-message hidden"}>
                    Payment succeeded.{" "} <Link to='/user/history'>See it in purchase history</Link>
                </p>
            </form>

        </>
    )
}
