import React, { useState } from 'react';
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux';
import { StarOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

export default function RatingModal({ children }) {
    const { user } = useSelector((state) => ({ ...state }))
    const [modelVisible, setModelVisible] = useState(false)
    const navigate = useNavigate()
    let { slug } = useParams()


    const handleModal = () => {
        if (user && user.token) {
            setModelVisible(true)
        } else {
            navigate({
                pathname: '/login',
                state: { form: `/product/${slug}` }
            })
        }
    }

    return (<>
        <div onClick={handleModal}>
            <StarOutlined className='text-danger' /><br /> {user ? "Leave Rating" : "Login to Leave rating"}
        </div>
        <Modal
            title="leave your rating"
            centered visible={modelVisible}
            onOk={() => {
                setModelVisible(false)
                toast.success('Thanks for your review . it will appear soon ')
            }
            }
            onCancel={() => setModelVisible(false)
            }
        >{children}</Modal>
    </>)
}
