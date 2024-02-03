import React from 'react'
import UserNav from '../../Components/nav/UserNav'

export default function Whishlist() {
    return (
        <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr' }}>
                <div style={{ gridColumn: '1 / 2' }}>
                    <UserNav />
                </div>
                <div style={{ gridColumn: '2 / 3', padding: '30px' }}>
                    User wishlist page
                </div>
            </div>
        </div>
    )
}
