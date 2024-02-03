import React, { useState } from "react";
import {
    AppstoreOutlined, SettingOutlined, ShopOutlined,
    ShoppingCartOutlined, ShoppingOutlined, UserAddOutlined, UserOutlined
} from '@ant-design/icons';
import { Menu, Badge } from 'antd';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import firebase from "firebase/compat/app";
import Search from "../forms/Search";

const Header = () => {
    const [current, setCurrent] = useState("home");
    let dispatch = useDispatch();

    let { user, cart } = useSelector((state) => ({ ...state }))
    const navigate = useNavigate();

    const handleClick = (e) => {
        setCurrent(e.key);
    }

    const logout = () => {
        firebase.auth().signOut();
        dispatch({
            type: "LOGOUT",
            payload: null
        });
        navigate("/login");
    }

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="home" icon={<AppstoreOutlined />}>
                <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="shop" icon={<ShoppingOutlined />}>
                <Link to="/shop">Shop</Link>
            </Menu.Item>
            <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
                <Link to="/cart">
                    <Badge count={cart.length} offset={[9, 0]}>Cart</Badge>
                </Link>
            </Menu.Item>
            {!user && (
                <Menu.Item key="register" style={{ position: 'absolute', right: "2%" }}>
                    <Link to="register">Register</Link>
                </Menu.Item>
            )}
            {!user && (
                <Menu.Item key="login" style={{ position: 'absolute', right: "10%" }}>
                    <Link to="/login">Login</Link>
                </Menu.Item>
            )}
            {user && (
                <Menu.SubMenu icon={<SettingOutlined />} title={user.email && user.email.split('@')[0]} style={{ position: 'absolute', right: "0%" }}>
                    {user && user.role === "subscriber" && (
                        <Menu.Item key="setting:1">
                            <Link to="/user/history">Dashboard</Link>
                        </Menu.Item>)}
                    {user && user.role === "admin" && (
                        <Menu.Item key="setting:2">
                            <Link to="/admin/dashboard">Dashboard</Link>
                        </Menu.Item>)}
                    <Menu.Item icon={<UserOutlined />} onClick={logout}>Logout</Menu.Item>
                </Menu.SubMenu>
            )}
            <span style={{ position: "absolute", right: 190 }}><Search /></span>
        </Menu>
    )
}

export default Header;
