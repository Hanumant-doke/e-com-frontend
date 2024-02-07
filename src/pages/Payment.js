import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { Grid } from '@mui/material';
import '../stripe.css'
import StripeCheckOut from '../Components/StripeCheckOut';

const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

export default function Payment() {
    return (
        <div>
            <h4 style={{ textAlign: "center", paddingTop: 15, }}>Complete your purchase</h4>
            <Grid container style={{ justifyContent: "center" }}>
                <Elements stripe={promise}>
                    <Grid item xs={6} >
                        <StripeCheckOut />
                    </Grid>
                </Elements>
            </Grid>
        </div>
    )
}
