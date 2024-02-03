import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from "react-toastify"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getCoupons, removeCoupon, createCoupon } from '../../../functions/coupon';
import { DeleteOutlined } from "@ant-design/icons"
import { Button, Grid } from '@mui/material';
import AdminNav from '../../../Components/nav/AdminNav';


export default function Coupon() {
    const [name, setName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [discount, setDiscount] = useState("");
    const [loading, setLoading] = useState("");
    const [coupons, setCoupons] = useState([])

    const { user } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        getCoupons().then((res) => setCoupons(res.data))
    }, [])

    const loadAllCoupons = () => getCoupons().then((res) => setCoupons(res.data));

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        createCoupon({ name, expiry, discount }, user.token)
            .then((res) => {
                setLoading(false)
                setName("")
                setDiscount("")
                setExpiry("")
                loadAllCoupons()
                toast.success(`${res.data.name} is created .}`)
            }).catch((err) => {
                console.log(err);
            })
    }

    const handleRemove = (couponId) => {
        if (window.confirm('Delete?')) {
            setLoading(true)
            removeCoupon(couponId, user.token).then((res) => {
                loadAllCoupons()
                setLoading(false)
                toast.error(`Coupon ${res.data.name} deleted.`)
            }).catch((err) => console.log(err));
        }

    }
    return (
        <>
            <Grid container>
                <Grid item xs={2}>
                    <AdminNav />
                </Grid>
                <Grid item xs={10} padding={3}>
                    {loading ? <h4>Loading...</h4> : <h4>Coupon</h4>}
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label className='text-muted'>Name</label>
                            <input
                                type='text'
                                className='form-control'
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                autoFocus
                                required
                            />
                        </div>
                        <br />
                        <div className='form-group'>
                            <label className='text-muted'> % Discount</label>
                            <input
                                type='text'
                                className='form-control'
                                onChange={(e) => setDiscount(e.target.value)}
                                value={discount}
                                required
                            />
                        </div>
                        <br />
                        <div className='form-group'>
                            <label className='text-muted'>Expiry</label>
                            <br />
                            <br />
                            <DatePicker
                                className='form-control'
                                selected={new Date()}
                                value={expiry}
                                onChange={(date) => setExpiry(date)}
                                required
                            />
                        </div>
                        <br />
                        <Button type="primary" className="mt-3"
                            variant='contained' size='large' onClick={handleSubmit}
                        >Save</Button>
                    </form>
                    <br />
                    <table className='table table-borderd'>
                        <thead className='thead-light'>
                            <tr>
                                <th scope='col'>Name</th >
                                <th scope='col'>Expiry</th >
                                <th scope='col'>Discount</th >
                                <th scope='col'>Action</th >
                            </tr>
                        </thead>
                        <tbody>
                            {coupons.map((c) => (
                                <tr key={c._id}>
                                    <td>{c.name}</td>
                                    <td>{new Date(c.expiry).toLocaleDateString()}</td>
                                    <td>{c.discount}%</td>
                                    <td><DeleteOutlined onClick={() => handleRemove(c._id)}
                                        className='text-danger coursor:pointer' /></td>
                                </tr>
                            )
                            )}
                        </tbody>
                    </table>
                </Grid>
            </Grid>
        </>
    )
}
