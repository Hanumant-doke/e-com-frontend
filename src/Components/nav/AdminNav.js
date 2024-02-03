import React from 'react';
import { Link } from 'react-router-dom';

const AdminNav = () => {
    return (
        <nav style={{ padding: "8px", gap: '23px' }}>
            <ul style={{ marginTop: "23px", fontSize: "23px", listStyle: 'none', padding: 0 }}>
                <li style={{ margin: "23px 0" }}>
                    <Link to="/admin/dashboard" style={{ textDecoration: 'none', color: 'green' }}>
                        Dashboard
                    </Link>
                </li>
                <li style={{ margin: "23px 0" }}>
                    <Link to="/admin/product" style={{ textDecoration: 'none', color: 'green' }}>
                        Product
                    </Link>
                </li>
                <li style={{ margin: "23px 0" }}>
                    <Link to="/admin/products" style={{ textDecoration: 'none', color: 'green' }}>
                        Products
                    </Link>
                </li>
                <li style={{ margin: "23px 0" }}>
                    <Link to="/admin/category" style={{ textDecoration: 'none', color: 'green' }}>
                        Category
                    </Link>
                </li>
                <li style={{ margin: "23px 0" }}>
                    <Link to="/admin/sub" style={{ textDecoration: 'none', color: 'green' }}>
                        Sub Category
                    </Link>
                </li>
                <li style={{ margin: "23px 0" }}>
                    <Link to="/admin/coupon" style={{ textDecoration: 'none', color: 'green' }}>
                        Coupon
                    </Link>
                </li>
                <li style={{ margin: "23px 0" }}>
                    <Link to="/user/password" style={{ textDecoration: 'none', color: 'green' }}>
                        Password
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default AdminNav;
