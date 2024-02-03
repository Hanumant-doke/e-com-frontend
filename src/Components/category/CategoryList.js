import React, { useEffect, useState } from 'react'
import { getCategories } from '../../functions/category'
import { Grid, Button } from '@mui/material'
import { Link } from 'react-router-dom'

export default function CategoryList() {
    const [categories, setCategory] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getCategories().then((c) => {
            setCategory(c.data)
            setLoading(false)
        })
    }, [])
    const showCategories = () => categories.map((c) => <Button varient="contained"
        key={c._id} style={{ margin: "10px", backgroundColor: "yellow", color: "white", textAlign: "center" }}>
        <Link style={{ textDecoration: 'none', textAlign: "center" }} to={`/category/${c.slug}`}>{c.name}</Link>
    </Button>)
    return (
        <div>
            <Grid container>
                {loading ? (<h4 className='text-center'>Loading...</h4>) : showCategories()}
            </Grid>
        </div>
    )
}
