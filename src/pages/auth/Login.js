import React, { useEffect, useState } from 'react'
import { auth, googleAuthProvider } from "../../firebase"
import { toast } from 'react-toastify';
import { Button, Form, Input } from 'antd'
import { GoogleOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createOrUpdateUser } from '../../functions/auth';

const Login = () => {
    const [email, setEmail] = useState("hanumantdoke143@gmail.com");
    const [password, setPassword] = useState("123456");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const roleBasedRedirect = (res) => {
        let intended = navigate.location.state;
        if (intended) {
            navigate(intended.from)
        } else {
            if (res.data.role === 'admin') {
                navigate("/admin/dashboard")
            } else {
                navigate("/user/history")
            }
        }

    }

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        if (user && user.token) navigate("/")
    }, [user, navigate])

    let dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        // console.table(email, password)
        try {
            const result = await auth.signInWithEmailAndPassword(email, password)
            const { user } = result
            const idTokenResult = await user.getIdTokenResult()
            createOrUpdateUser(idTokenResult.token)
                .then(
                    (res) => {
                        dispatch({
                            type: 'LOGGED_IN_USER',
                            payload: {
                                name: res.data.name,
                                email: res.data.email,
                                token: idTokenResult.token,
                                role: res.data.role,
                                _id: res.data._id
                            }
                        });
                        roleBasedRedirect(res)
                    }
                )
                .catch(err => console.log(err));
            // navigate("/")

        } catch (error) {
            console.log(error);
            toast.error(error.message)
            setLoading(false)
        }
    }

    const googleLogin = async () => {
        auth.signInWithPopup(googleAuthProvider)
            .then(async (result) => {
                const { user } = result
                const idTokenResult = await user.getIdTokenResult()
                createOrUpdateUser(idTokenResult.token)
                    .then(
                        (res) => {
                            dispatch({
                                type: 'LOGGED_IN_USER',
                                payload: {
                                    name: res.data.name,
                                    email: res.data.email,
                                    token: idTokenResult.token,
                                    role: res.data.role,
                                    _id: res.data._id
                                }
                            });
                            roleBasedRedirect(res)
                        }
                    )
                    .catch(err => console.log(err));
                // navigate("/")
            })
            .catch(err => {
                console.log(err);
                toast.error(err.message)
            })
    }

    const loginForm = () => <Form onSubmit={handleSubmit}>
        <Input
            style={{ width: '50%' }}
            size="large" prefix={<UserOutlined />}
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter email'
            autoFocus

        />
        <br />
        <br />
        <Input
            style={{ width: '50%' }}
            size="large" prefix={<UserOutlined />}
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter password'
        />
        <br></br>
        <br></br>
        <br></br>
        <Button onClick={handleSubmit} type="primary" className="mb-3"
            icon={<MailOutlined />} size='large' disabled={!email || password.length < 6}
            shape='round'>Login with Email/Password</Button>
    </Form>
    return (
        <div style={{ padding: 15, textAlign: "center" }}>
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    {loading ? <h2 className='text-danger'>Loading .... </h2> : <h2>Login</h2>}
                    {loginForm()}
                    <br />

                    <Button onClick={googleLogin} type="primary" danger className="mb-3"
                        icon={<GoogleOutlined />} size='large' varient="outlined"
                        shape='round'>Login with Google</Button>
                    <br />
                    <br />
                    <br />
                    <Link to="/forgot/password">Forgot password</Link>
                </div>
            </div>

        </div>
    )
}

export default Login
