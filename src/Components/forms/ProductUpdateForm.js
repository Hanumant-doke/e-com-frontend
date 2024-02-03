import { MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input, Select } from 'antd';
import React from 'react'

const ProductUpdateForm = ({ values, setValues, handleChange, handleChangeInput, handleSubmit,
    handleCategoryChange, showSub, subOptions, categories, arryOfSub, satArrayOfSubIds, selectedCategory }) => {
    const {
        title,
        description,
        price,
        category,
        subs,
        shipping,
        quantity,
        images,
        colors,
        brands,
        color,
        brand,
    } = values;
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <lable>
                        Title :-
                    </lable>
                    <br />
                    <Input
                        name='title'
                        // style={{ width: '30%' }}
                        size="large" prefix={<UserOutlined />}
                        type='text'
                        value={title}
                        onChange={handleChange}
                    />
                    <br />
                    <br />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <lable>
                            Description :-
                        </lable>
                        <br />
                        <Input
                            name='description'
                            // style={{ width: '30%' }}
                            size="large" prefix={<UserOutlined />}
                            type='text'
                            value={description}
                            onChange={handleChange}
                        />
                    </div>
                    <br />
                    <br />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <lable>
                            Price :-
                        </lable>
                        <br />
                        <Input
                            name='price'
                            // style={{ width: '30%' }}
                            size="large" prefix={<UserOutlined />}
                            type='number'
                            value={price}
                            onChange={handleChange}
                        />
                    </div>
                    <br />
                    <br />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <lable>
                            Shipping :-
                        </lable>
                        <br />
                        <Select
                            name="shipping"
                            // style={{ width: '30%' }}
                            onChange={(value) => handleChangeInput(value, 'shipping')}
                            value={shipping === 'Yes' ? 'Yes' : 'No'}
                        >
                            <Select.Option value="No">No</Select.Option>
                            <Select.Option value="Yes">Yes</Select.Option>
                        </Select>

                    </div>
                    <br />
                    <br />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <lable>
                            Quantity :-
                        </lable>
                        <br />
                        <Input
                            name='quantity'
                            // style={{ width: '30%' }}
                            size="large" prefix={<UserOutlined />}
                            type='number'
                            value={quantity}
                            onChange={handleChange}
                        />
                    </div>
                    <br />
                    <br />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label>
                            Color:
                        </label>
                        <br />
                        <Select
                            name="color"
                            // style={{ width: '30%' }}
                            onChange={(value) => handleChangeInput(value, 'color')}
                            value={color}
                        >
                            <Select.Option value="">Please select</Select.Option>
                            {colors.map((c) => (
                                <Select.Option key={c} value={c}>
                                    {c}
                                </Select.Option>
                            ))}
                        </Select>
                    </div>


                    <br />
                    <br />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label>
                            Brand:
                        </label>
                        <br />
                        <Select
                            name="brand"
                            // style={{ width: '30%' }}
                            onChange={(value) => handleChangeInput(value, 'brand')}
                            value={brand}
                        >
                            <Select.Option value="">Please select</Select.Option>
                            {brands.map((b) => (
                                <Select.Option key={b} value={b}>
                                    {b}
                                </Select.Option>
                            ))}
                        </Select>
                    </div>
                    <br />
                    <br />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label>Category</label>
                        <br />
                        <Select
                            name="category"
                            onChange={(value) => handleCategoryChange(value, 'category')}
                            value={selectedCategory ? selectedCategory : category._id}
                        >
                            {categories.length > 0 &&
                                categories.map((c) => (
                                    <Select.Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Select.Option>
                                ))}
                        </Select>

                    </div>
                    <br />
                    <br />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label>
                            Sub Category:
                        </label>
                        <br />
                        <Select
                            mode='multiple'
                            name="subs"
                            value={arryOfSub}
                            onChange={(value) => satArrayOfSubIds(value)}

                        >
                            <Select.Option value="">Please select</Select.Option>
                            {subOptions.length && subOptions.map((s) => (
                                <Select.Option key={s._id} value={s._id}>
                                    {s.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </div>
                    <br />
                    <br />
                    <Button type="primary" className="mb-3" style={{ width: "200px" }}
                        icon={<MailOutlined />} size='large' onClick={handleSubmit}
                    >Save</Button>
                </div>
            </form>
        </div>
    )
}
export default ProductUpdateForm;