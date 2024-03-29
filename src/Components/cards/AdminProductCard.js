import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import React from 'react'
import image from "../../images/image.png"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { Link } from 'react-router-dom';

const AdminProductCard = ({ product, handleRemove }) => {
    const { title, description, images, slug } = product;

    return (
        <div>
            <Card cover={<img src={images && images.length ? images[0].url : image}
                style={{ height: "150px", objectFit: "cover" }}
                className='m-2' />}
                actions={[
                    <Link to={`/admin/product/${slug}`}> <EditOutlined className='text-warning' /></Link>,
                    <DeleteOutlined onClick={() => handleRemove(slug)} className='text-danger' />
                ]}
            >
                <Meta title={title} description={`${description && description.substring(0, 40)}...`} />
            </Card>
        </div>
    )
}

export default AdminProductCard;