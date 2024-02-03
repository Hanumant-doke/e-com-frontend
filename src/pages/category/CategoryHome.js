import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCategory } from '../../functions/category'
import { Grid } from '@mui/material'
import ProductCard from '../../Components/cards/ProductCard'

export default function CategoryHome() {
    const [category, setCategory] = useState({})
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(false)

    const { slug } = useParams()

    useEffect(() => {
        setLoading(true)
        getCategory(slug)
            .then((res) => {
                console.log(JSON.stringify(res.data, null, 4));
                setCategory(res.data.category)
                setProduct(res.data.products)
                setLoading(false)
            })
    }, [slug])
    return (<>
        <div>
            <Grid>
                {loading ? (<h4>Loading....</h4>) : (<h4>{product.length} products in the {category.name} category</h4>)}
            </Grid>
        </div>
        <div>
            <Grid>{product.map((p) => <div key={p._id}>
                <ProductCard product={p} />
            </div>)}</Grid>
        </div>
    </>)
}
