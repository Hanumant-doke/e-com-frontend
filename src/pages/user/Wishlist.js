import React, { useEffect, useState } from 'react'
import UserNav from '../../Components/nav/UserNav'
import { getWishlist, removWishlist } from '../../functions/user'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { DeleteOutlined } from '@ant-design/icons'

export default function Wishlist() {
    const [wishlist, setWishlist] = useState([])

    const { user } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        loadWishlist()
    }, [user])

    const loadWishlist = () => getWishlist(user?.token).then((res) => {
        console.log(res);
        setWishlist(res.data.wishlist)
    }
    )

    const handleRemove = (productId) => {
        console.log("Removing product with ID:", productId);

        removWishlist(productId, user?.token)
            .then((res) => {
                console.log("Wishlist item removed successfully:", res);
                loadWishlist();
            })
            .catch((error) => {
                console.error("Error removing wishlist item:", error);
            });
    };

    return (
        <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr' }}>
                <div style={{ gridColumn: '1 / 2' }}>
                    <UserNav />
                </div>
                <div style={{ gridColumn: '2 / 3', padding: '30px' }}>
                    <h4>Wishlist</h4>
                    {wishlist.map((p) => (
                        <div key={p._id} className='alert alert-secondery'>
                            <Link to={`/product/${p.slug}`}>{p.title}</Link>
                            <span onClick={() => handleRemove(p._id)} style={{ marginLeft: 200, cursor: "pointer" }}>
                                <DeleteOutlined className='text-danger' />
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
