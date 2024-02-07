import React, { useState } from 'react'
import { Card, Tooltip } from 'antd';
import image from "../../images/image.png";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import { Link } from 'react-router-dom';
import Meta from 'antd/es/card/Meta';
import showAverage from '../../functions/rating';
import { useSelector, useDispatch } from 'react-redux';
import _ from "lodash"

const ProductCard = ({ product }) => {
    const [tooltip, setTooltip] = useState('Click to add')
    const { title, description, images, slug, price } = product;

    const { user, cart } = useSelector((state) => ({ ...state }))
    const dispatch = useDispatch()

    const handleAddToCart = () => {
        let cart = []
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            cart.push({
                ...product,
                count: 1
            })
            let unique = _.uniqWith(cart, _.isEqual)
            // console.log(unique, "unique");
            localStorage.setItem('cart', JSON.stringify(unique));
            setTooltip("Added");

            dispatch({
                type: "ADD_TO_CART",
                payload: unique
            })
            dispatch({
                type: "SET_VISIBLE",
                payload: true
            })
        }
    }
    return (
        <div>
            {product && product.ratings && product.ratings.length > 0 ? showAverage(product) :
                <div style={{ textAlign: "center", fontFamily: "fantasy" }}>No rating yet</div>}
            <Card
                cover={<img src={images && images.length ? images[0].url : image}
                    style={{ height: "150px", objectFit: "cover" }}
                    className='m-0' />}
                actions={[
                    <Link to={`/product/${slug}`}> <EyeOutlined className='text-warning' /><br />View Product</Link>,
                    <Tooltip title={tooltip}>
                        <a onClick={handleAddToCart} disabled={product.quantity < 1}>
                            <ShoppingCartOutlined className='text-danger' /> <br />
                            {product.quantity < 1 ? 'Out of stock' : 'Add to cart'}
                        </a>
                    </Tooltip>,
                ]}
            >
                <Meta title={`${title} - $${price}`} description={`${description && description.substring(0, 40)}...`} />
            </Card>
        </div>
    )
}
export default ProductCard;