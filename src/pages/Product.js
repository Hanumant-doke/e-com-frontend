import React, { useEffect, useState } from 'react'
import { getProduct, productStar, getRelated } from '../functions/product';
import { useParams } from 'react-router-dom';
import SingleProduct from '../Components/cards/SingleProduct';
import { useSelector } from 'react-redux';
import ProductCard from '../Components/cards/ProductCard';

const Product = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [product, setProduct] = useState({})
    const [releted, setRelated] = useState([])
    const [star, setStar] = useState(0)
    const { slug } = useParams();

    useEffect(() => {
        loadSingleProduct();
    }, [slug])

    useEffect(() => {
        if (product.ratings && user) {
            let existingRatingObject = product.ratings.find((ele) => ele.postedBy.toString() === user._id.toString())
            existingRatingObject && setStar(existingRatingObject.star)
        }
    }, [])

    const loadSingleProduct = () => getProduct(slug).then((res) => {
        setProduct(res.data);
        // Corrected function name: getRelated instead of getReleted
        getRelated(res.data._id).then((res) => setRelated(res.data))
    })

    const onStarClick = (newRating, name) => {
        setStar(newRating)
        // console.table(newRating, name);
        productStar(name, newRating, user.token)
            .then((res) => {
                console.log('rating clicked', res.data);
                loadSingleProduct();
            })
    }

    console.log(releted, 'releted');
    return (<>
        <div style={{ margin: 10 }}>
            <SingleProduct product={product} onStarClick={onStarClick} star={star} />
        </div>
        <div style={{ padding: 10, textAlign: "center" }}>
            <hr />
            <h3>Realated Products</h3>
            <hr />
            <div>{releted.length ? releted.map((r) => <div key={r._id}>
                <ProductCard product={r} />
            </div>) : "no products found"}</div>
        </div>
    </>
    )
}

export default Product;