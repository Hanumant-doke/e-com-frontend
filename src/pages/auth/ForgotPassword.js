import React, { useState, useEffect } from 'react'
import { auth } from "../../firebase"
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';

function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const { user } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        if (user && user.token) navigate("/")
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true
        }

        await auth.sendPasswordResetEmail(email, config)
            .then(() => {
                setEmail('')
                setLoading(false)
                toast.success("Check your email for password reset link")
            })
            .catch((err) => {
                setLoading(false)
                toast.error(err.message)
                console.log("ERROR MSG IN FORGOT PASSWORD", err);
            })
    }

    const navigate = useNavigate()
    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            {loading ? <h4>Loading</h4> : <h3>Forgot password</h3>}
            <Form onSubmit={handleSubmit}>
                <Input
                    style={{ width: '30%' }}
                    type='email'
                    className='form-control'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='type your email'
                    autoFocus
                />
                <br />
                <br />
                <br />
                <Button className='btn btn-raised' disabled={!email} onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default ForgotPassword
