import { MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import React from 'react'

const CategoryForm = ({ handleSubmit, setName, name }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <lable>
                    Name :-
                </lable>
                <br />
                <br />
                <Input
                    style={{ width: '30%' }}
                    size="large" prefix={<UserOutlined />}
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Enter Name'
                    autoFocus
                    required
                />
                <br />
                <br />
                <Button type="primary" className="mb-3"
                    icon={<MailOutlined />} size='large' onClick={handleSubmit}
                >Save</Button>
            </div>
        </form>
    )
}

export default CategoryForm;        