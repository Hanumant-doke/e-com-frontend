import React from 'react'
import ModalImage from "react-modal-image";
import image from "../../images/image.png";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { CheckCircleOutlined, ClockCircleOutlined, DeleteOutlined } from '@ant-design/icons';

export default function ProductCardInCheckout({ p }) {
    const colors = ["Black", "Brown", "Silver", "White", "Blue"]

    const dispatch = useDispatch()

    const handleColorChange = (e) => {
        console.log("color changed", e.target.value);
        let cart = []

        if (typeof window !== 'undefined') {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem("cart"))
            }
            cart.map((product, i) => {
                if (product._id === p._id) {
                    cart[i].color = e.target.value;
                }
            });
            localStorage.setItem('cart', JSON.stringify(cart));
            dispatch({
                type: "ADD_TO_CART",
                payload: cart,
            })
        }
    }

    const handleQuantityCHange = (e) => {
        let count = e.target.value < 1 ? 1 : e.target.value;
        if (count > p.quantity) {
            toast.error(`Max available quantity : ${p.quantity}`)
            return;
        }
        let cart = []
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem("cart"))
            }
            cart.map((product, i) => {
                if (product._id == p._id) {
                    cart[i].count = count;
                }
            });
            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch({
                type: "ADD_TO_CART",
                payload: cart
            })
        }
    }
    const hendleRemove = () => {
        let cart = []
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem("cart"))
            }
            cart.map((product, i) => {
                if (product._id === p._id) {
                    cart.splice(i, 1)
                }
            });
            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch({
                type: "ADD_TO_CART",
                payload: cart
            })
        }
    }

    return (
        <tbody>
            <tr>
                <td>
                    <div style={{ width: "100px", height: "auto" }}>
                        {p.images.length ? (<ModalImage small={p.images[0].url} large={p.images[0].url} />) :
                            (<ModalImage small={image} large={image} />)}
                    </div>
                </td>
                <td>{p.title}</td>
                <td>${p.price}</td>
                <td>{p.brand}</td>
                <td><select onChange={handleColorChange} name="color" className='form-control'>
                    {p.color ? <option value={p.color}>{p.color}</option> : <option>Select</option>}
                    {colors.filter((c) => c !== p.color).map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                </td>
                <td>
                    <input type='number' value={p.count} onChange={handleQuantityCHange} />
                </td>
                <td style={{ textAlign: "center" }}>{p.shipping === 'Yes' ? <CheckCircleOutlined className='text-success' /> :
                    <ClockCircleOutlined className='text-danger' />}</td>
                <td style={{ textAlign: "center", cursor: 'pointer' }}>
                    <DeleteOutlined className='text-danger' onClick={() => hendleRemove(p._id)} /></td>
            </tr>
        </tbody>
    )
}
