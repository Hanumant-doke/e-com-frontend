import React, { useEffect, useState } from 'react'
import { Grid, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { getSubs } from '../../functions/sub'

export default function SubList() {
    const [subs, setSubs] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getSubs().then((res) => {
            setSubs(res.data)
            setLoading(false)
        })
    }, [])
    const showSubs = () => subs.map((s) => <Button varient="contained"
        key={s._id} style={{ margin: "10px", backgroundColor: "yellow", color: "white", textAlign: "center" }}>
        <Link style={{ textDecoration: 'none', textAlign: "center" }} to={`/sub/${s.slug}`}>{s.name}</Link>
    </Button>)
    return (
        <div>
            <Grid container>
                {loading ? (<h4 className='text-center'>Loading...</h4>) : showSubs()}
            </Grid>
        </div>
    )
}
