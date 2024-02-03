import React, { useState } from 'react'
import { auth } from "../../firebase"
import { toast } from 'react-toastify';
import { Button, Input } from 'antd';
import { MailOutlined, UserOutlined } from '@ant-design/icons';


const Register = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        const config = {
            url: process.env.REACT_APP_REGISTER_URL,
            handleCodeInApp: true
        }

        await auth.sendSignInLinkToEmail(email, config)
        toast.success(`Email is sent to ${email}.
         Click to the link and complete your registration`)
        // set email in local storage
        window.localStorage.setItem('emailForRegistration', email)
        //clear state
        setEmail("")
    }


    const registerForm = () => <form onSubmit={handleSubmit}>
        <Input
            style={{ width: '30%' }}
            size="large" prefix={<UserOutlined />}
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
        />
        <br></br>
        <br></br>
        <br></br>
        <Button type="primary" className="mb-3"
            icon={<MailOutlined />} size='large' onClick={handleSubmit} >Register</Button>
    </form>
    return (
        <div style={{ padding: 15, textAlign: "center" }}>
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <h2>Register</h2>
                    {registerForm()}
                </div>
            </div>

        </div>
    )
}

export default Register
