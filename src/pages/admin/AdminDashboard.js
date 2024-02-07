import React, { useEffect, useState } from 'react';
import AdminNav from "../../Components/nav/AdminNav";
import { getOrders, changeStatus } from '../../functions/admin';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Orders from '../../Components/cards/Orders';

const AdminDashboard = () => {
    const [orders, setOrders] = useState("")
    const { user } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        loadOrders()
    }, [user])

    const loadOrders = () => getOrders(user?.token).then((res) => {
        console.log(JSON.stringify(res.data, null, 4));
        setOrders(res.data)
    })

    const handleStatusChange = (orderId, orderStatus) => {
        changeStatus(orderId, orderStatus, user?.token).then((res) => {
            toast.success("Status updated")
            loadOrders()
        })
    }
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr' }}>
            <div style={{ gridColumn: '1 / 2' }}>
                <AdminNav />
            </div>
            <div style={{ gridColumn: '2 / 12', padding: '20px' }}>
                <h4>Admin Dashboard</h4>
                <Orders orders={orders} handleStatusChange={handleStatusChange} />
            </div>
        </div>
    );
};

export default AdminDashboard;
