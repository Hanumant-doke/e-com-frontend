import React from 'react'
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import ShowPaymentInfo from './ShowPaymentInfo'
import { Grid } from '@mui/material'

export default function Orders({ orders, handleStatusChange }) {
    const showOrderInTable = (order) =>
        <table className='table table-borderd'>
            <thead className='thead-light'>
                <tr>
                    <th scope='col'>Title</th>
                    <th scope='col'>Price</th>
                    <th scope='col'>Brand</th>
                    <th scope='col'>Color</th>
                    <th scope='col'>Count</th>
                    <th scope='col'>Shipping</th>
                </tr>
            </thead>
            <tbody>
                {order?.products?.map((p, i) => (
                    <tr key={i}>
                        <td><b>{p.product.title}</b></td>
                        <td>{p.product.price}</td>
                        <td>{p.product.brand}</td>
                        <td>{p.color}</td>
                        <td>{p.count}</td>
                        <td>{p.product.shipping === "Yes" ? <CheckCircleOutlined style={{ color: "green" }} />
                            : <CloseCircleOutlined style={{ color: "red" }} />}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    return (
        <div>
            {orders ? (
                orders.map((order) => (
                    <Grid key={order._id} container >
                        <div className='btn btn-block bg-light' style={{ padding: 15 }}>
                            <ShowPaymentInfo order={order} showStatus={false} />
                            <Grid item xs={4} style={{ paddingTop: 10 }}>Delivery Status</Grid>
                            <Grid item xs={8}>
                                <select defaultValue={order.orderStatus}
                                    name='status'
                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}>
                                    <option value="Not Processed">Not Processed</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Dispatched">Dispatched</option>
                                    <option value="Cancelled">Cancelled</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </Grid>
                        </div>
                        {showOrderInTable(order)}
                    </Grid>
                ))
            ) : (
                <p>Loading...</p>
            )}

        </div>
    )
}
