import React from 'react'
import { Link } from 'react-router-dom'

const UserNav = () => {
    return (
        <nav style={{padding:"8px",  gap:'20px'}}>
            <ul style={{marginTop:"20px", fontSize:"20px"}}>
                <li>
                    <Link to="/user/history">
                        History
                    </Link>
                </li>
                <li>
                    <Link to="/user/password">
                        Password
                    </Link>
                </li>
                <li>
                    <Link to="/user/wishlist">
                        wishlist
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default UserNav