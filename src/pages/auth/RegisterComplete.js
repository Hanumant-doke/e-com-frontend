import React, { useEffect, useState } from 'react'
import { auth } from "../../firebase"
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { createOrUpdateUser } from '../../functions/auth';

const RegisterComplete = ({ history }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    let dispatch = useDispatch()

    // const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegistration'))
        // console.log(window.location.href);
        // console.log(window.localStorage.getItem('emailForRegistration'));
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email || !password) {
            toast.error("email and password must be required")
            return;
        }
        if (password.length < 6) {
            toast.error("password must be 6 caractor long")
            return
        }
        try {
            const result = await auth.signInWithEmailLink(email, window.location.href)
            if (result.user.emailVerified) {
                window.localStorage.removeItem("emailForRegistration")
                let user = auth.currentUser
                await user.updatePassword(password)
                const idTokenResult = await user.getIdTokenResult()
                console.log("user", user, "idTokenResult", idTokenResult);
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
                        }
                    )
                    .catch(err => console.log(err));
                navigate("/")
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    const completeRegisterForm = () => <form onSubmit={handleSubmit}>
        <Input
            style={{ width: '30%' }}
            size="large" prefix={<UserOutlined />}
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled
        />
        <br />
        <br />
        <Input
            style={{ width: '30%' }}
            size="large" prefix={<UserOutlined />}
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter password'
        />
        <br />
        <br />
        <Button type="primary" shape='round' size='large' onClick={handleSubmit}>Complete Registration</Button>
    </form>
    return (
        <div style={{ padding: 15, textAlign: "center" }}>
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <h4>Register Complete</h4>
                    {completeRegisterForm()}
                </div>
            </div>

        </div>
    )
}

export default RegisterComplete
