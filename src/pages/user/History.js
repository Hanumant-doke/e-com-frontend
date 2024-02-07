import React, { useEffect, useState } from 'react';
import UserNav from '../../Components/nav/UserNav';
import { getUserOrders } from '../../functions/user';
import { useSelector } from 'react-redux';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import ShowPaymentInfo from '../../Components/cards/ShowPaymentInfo';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Invoice from '../../Components/order/Invoice';

const History = () => {
    const { user } = useSelector((state) => ({ ...state }))
    const [orders, setOrders] = useState([])

    useEffect(() => {
        loadUserOrders();
    }, [user])

    const loadUserOrders = () => {
        getUserOrders(user?.token).then((res) => {
            console.log(JSON.stringify(res.data, null, 4));
            setOrders(res?.data);
        });
    };

    // const showDownloadLink = (order) => {
    //     if (order && order.products) {
    //         return (
    //             <PDFDownloadLink
    //                 document={<Invoice order={order} />}
    //                 fileName='invoice.pdf'
    //                 className='btn btn-sm btn-block btn-outline-primary'
    //             >
    //                 Download PDF
    //             </PDFDownloadLink>
    //         );
    //     } else {
    //         return null;
    //     }
    // };


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


    const showEachOrders = () => {
        console.log("Orders:", orders);
        return (
            <div>
                {orders && orders.map((order, i) => {
                    console.log("Order:", order);
                    return (
                        <div key={i} className='m-5 p-3 card'>
                            {order && (
                                <>
                                    <ShowPaymentInfo order={order} />
                                    {showOrderInTable(order)}
                                    {/* {showDownloadLink(order)} */}
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };



    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr' }}>
            <div style={{ gridColumn: '1 / 2' }}>
                <UserNav />
            </div>
            <div style={{ gridColumn: '2 / 3', padding: '30px', textAlign: "center" }}>
                <h4>{orders.length > 0 ? "User purchase order" : "No purchase orders"}</h4>
                {showEachOrders()}
            </div>
        </div>
    );
}

export default History;
