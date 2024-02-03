import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Grid } from '@mui/material'
import ProductCard from '../../Components/cards/ProductCard'
import { getSub } from '../../functions/sub'

export default function SubHome() {
    const [sub, setSub] = useState({})
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(false)

    const { slug } = useParams()

    useEffect(() => {
        setLoading(true)
        getSub(slug)
            .then((res) => {
                console.log(JSON.stringify(res.data, null, 4));
                setSub(res.data.sub)
                setProduct(res.data.products)
                setLoading(false)
            })
    }, [])
    return (<>
        <div>
            <Grid>
                {loading ? (<h4>Loading....</h4>) : (<h4>{product.length} products in the {sub.name} sub category</h4>)}
            </Grid>
        </div>
        <div>
            <Grid>{product.map((p) => <div key={p._id}>
                <ProductCard product={p} />
            </div>)}</Grid>
        </div>
    </>)
}
