import React, { useState } from 'react'
import UserNav from '../../Components/nav/UserNav'
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { Form, useNavigate } from 'react-router-dom';
import { Button, Input } from 'antd';
import { MailOutlined, UserOutlined } from '@ant-design/icons';

export default function Password() {
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState("")

    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        // console.log(password);
        await auth.currentUser.updatePassword(password)
            .then(() => {
                setLoading(false)
                toast.success("password updated")
            })
            .catch(err => {
                setLoading(false)
                toast.error(err.message)
            })
    }

    const passwordUpdateForm = () =>
    (<form onSubmit={handleSubmit}>
        <div>
            <lable>
                Your Password :-
            </lable>
            <br />
            <br />
            <Input
                style={{ width: '30%' }}
                size="large" prefix={<UserOutlined />}
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter new password'
                disabled={loading}
            />
            <br />
            <br />
            <Button type="primary" className="mb-3"
                icon={<MailOutlined />} size='large' onClick={handleSubmit}
                disabled={!password || password.length < 6 || loading} >Submit</Button>
        </div>
    </form>)


    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr' }}>
            <div style={{ gridColumn: '1 / 2' }}>
                <UserNav />
            </div>
            <div style={{ gridColumn: '2 / 3', padding: '30px' }}>
                {loading ? <h3 style={{ color: 'red' }}>loading ...</h3> : <h3>Password Updated</h3>}
                {passwordUpdateForm()}
            </div>
        </div>
    )
}
