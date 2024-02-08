import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Grid } from '@mui/material';
import { Card, Tabs, Tooltip } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import image from "../../images/image.png";
import ProductListItems from './ProductListItems';
import StarRatings from 'react-star-ratings'
import RatingModal from '../modal/RatingModal';
import showAverage from '../../functions/rating';
import { useSelector, useDispatch } from 'react-redux';
import _ from "lodash"
import { addToWishlist } from '../../functions/user';
import { toast } from 'react-toastify';

const { TabPane } = Tabs;

export default function SingleProduct({ product, onStarClick, star }) {
    const { title, description, images, _id } = product;
    const [tooltip, setTooltip] = useState('Click to add')

    const { user, cart } = useSelector((state) => ({ ...state }))
    const dispatch = useDispatch()

    const navigate = useNavigate()

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

    const handleAddToWishlist = (e) => {
        e.preventDefault()
        addToWishlist(product._id, user?.token).then((res) => {
            console.log("Added to wishlist", res.data);
            toast.success("Added to wishliast")
            navigate("/user/wishlist")
        })
    }

    return (
        <Grid container>
            <Grid item xs={8}>
                {images && images.length ?
                    <Carousel showArrows={true} autoPlay infiniteLoop>
                        {images && images.map((image) => (
                            <img src={image.url} alt={title} key={image.public_id}
                                style={{ width: '90%', height: '400px', objectFit: 'cover' }}
                            />
                        ))}
                    </Carousel>
                    : <Card
                        cover={<img src={images && images.length ? images[0].url : image}
                            style={{ width: '90%', height: '400px', objectFit: 'cover' }}
                            className='mt-2' />}
                    ></Card>}

                <Tabs type='card'>
                    <TabPane tab="Description" key="1"> {description && description}</TabPane>
                    <TabPane tab="More" key="2">Call us on xx  xxx xxxxx to learn about this product </TabPane>
                </Tabs>
            </Grid>
            <Grid item xs={4}>
                <h1 style={{ backgroundColor: "blue", padding: "20px" }}>{title}</h1>
                {product && product.ratings && product.ratings.length > 0 ? showAverage(product) :
                    <div style={{ textAlign: "center", fontFamily: "fantasy" }}>No rating yet</div>}
                <Card
                    actions={[
                        <Tooltip title={tooltip}>
                            <a onClick={handleAddToCart}><ShoppingCartOutlined className='text-danger' /> <br />Add to Cart</a>
                        </Tooltip>,
                        <a onClick={handleAddToWishlist}>
                            <HeartOutlined className='text-info' /> <br />Add to Wishlist
                        </a>,
                        <RatingModal>
                            <StarRatings
                                name={_id}
                                numberOfStars={5}
                                rating={star}
                                changeRating={onStarClick}
                                isSelectable={true}
                                starRatedColor="red"
                            />
                        </RatingModal>,
                    ]}
                >
                    <ProductListItems product={product} />
                </Card>
            </Grid>
        </Grid>
    );
}
