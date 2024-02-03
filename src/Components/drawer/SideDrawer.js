import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import image from "../../images/image.png";
import { Drawer } from 'antd';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

export default function SideDrawer({ children }) {
    const dispatch = useDispatch()
    const { drawer, cart } = useSelector((state) => ({ ...state }))

    const imageStyle = {
        width: '100%',
        height: "50px",
        objectFit: "cover"
    }
    return (
        <div>
            <Drawer style={{ textAlign: "center" }} placement='right' closable={false} title={`Cart / ${cart.length} Product`} onClose={() => {
                dispatch({
                    type: "SET_VISIBLE",
                    payload: false
                })
            }} visible={drawer}>{cart.map((p) => (
                <div key={p._id}>{p.images[0] ? (<>
                    <img src={p.images[0].url} style={imageStyle} />
                    <p className='text-center bg-secondary text-light'>{p.title} X {p.count}</p>
                </>) :
                    (<>
                        <img src={image} style={imageStyle} />
                        <p className='text-center bg-secondary text-light'>{p.title} X {p.count}</p>
                    </>)}</div>
            ))}
                <Link to="/cart">
                    <Button onClick={() => dispatch({
                        type: "SET_VISIBLE",
                        payload: false
                    })} variant='outlined'>GO TO CART</Button>
                </Link>
            </Drawer>
        </div>
    )
}
