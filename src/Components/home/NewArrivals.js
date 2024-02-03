import React, { useEffect, useState } from 'react'
import { getProducts, getProductsCount } from '../../functions/product';
import ProductCard from '../../Components/cards/ProductCard';
import LoadingCard from '../../Components/cards/LoadingCard';
import { Pagination } from 'antd';


const NewArrivals = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false);
    const [productsCount, setProductsCount] = useState(0)
    const [page, setPage] = useState(1);

    useEffect(() => {
        loadAllProducts();
    }, [page])

    useEffect(() => {
        getProductsCount().then((res) => setProductsCount(res.data))
    }, [])

    const loadAllProducts = () => {
        setLoading(true)
        getProducts('createdAt', 'desc', page)
            .then((res) => {
                setProducts(res.data);
                setLoading(false)
            })
    }
    return (
        <>
            <div className='container'>
                {loading ? (<LoadingCard count={3} />) : (
                    <div className='row'>
                        {products.map((product) => (
                            <div key={product._id} className='col-md-4' style={{ flexDirection: 'column', marginTop: "20px" }}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )
                }
            </div>
            <div style={{ textAlign:'center' }}>
                <nav>
                    <Pagination
                        current={page}
                        total={(productsCount / 3) * 10}
                        onChange={(value) => setPage(value)} />
                </nav>
            </div>
        </>
    )
}

export default NewArrivals
