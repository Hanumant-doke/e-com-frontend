import React, { useEffect, useState } from 'react';
import AdminNav from '../../../Components/nav/AdminNav';
import { getProductsByCount } from '../../../functions/product';
import AdminProductCard from '../../../Components/cards/AdminProductCard';
import { removeProduct } from '../../../functions/product';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const AllProducts = () => {
    const { user } = useSelector((state) => ({ ...state }))
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadAllProducts();
    }, []);

    const loadAllProducts = () => {
        setLoading(true);
        getProductsByCount(100)
            .then((res) => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };
    const handleRemove = (slug) => {
        // let answer = window.confirm('Delete')
        if (window.confirm('Delete')) {
            // console.log("send delete request", slug);
            removeProduct(slug, user.token)
                .then((res) => {
                    loadAllProducts();
                    toast.error(`${res.data.title} is deleted. `)
                }).catch((err) => {
                    if (err.response.status === 400) toast.error(err.response.date)
                    console.log(err);
                })
        }
    }
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr' }}>
            <div style={{ gridColumn: '1 / 2' }}>
                <AdminNav />
            </div>
            <div style={{ gridColumn: '2 / 12', padding: '20px' }}>
                {loading ? (
                    <h2 className='text-danger'>Loading......!</h2>
                ) : (
                    <>
                        <h3>All Products</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                            {products.map((product) => (
                                <div key={product._id}>
                                    <AdminProductCard product={product} handleRemove={handleRemove} />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AllProducts;
