import React, { useEffect, useState } from 'react'
import AdminNav from '../../../Components/nav/AdminNav';
import { DeleteOutlined, EditOutlined, LoadingOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { createProduct } from '../../../functions/product';
import { useSelector } from 'react-redux'
import { Button, Input } from 'antd';
import { Select } from 'antd';
import ProductCreateForm from '../../../Components/forms/ProductCreateForm';
import { getCategories, getCategorySubs } from '../../../functions/category';
import FileUpload from '../../../Components/forms/FileUpload';


const initialState = {
    title: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    subs: [],
    shipping: "",
    quantity: "",
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"],
    color: "",
    brand: ""
}
const ProductCreate = () => {
    const { user } = useSelector((state) => ({ ...state }))
    const [values, setValues] = useState(initialState)
    const [subOptions, setSubOptions] = useState([])
    const [showSub, setShowSubs] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCategories()
    }, [])

    const loadCategories = () =>
        getCategories().then((c) =>
            setValues({ ...values, categories: c.data }))

    const handleSubmit = (e) => {
        e.preventDefault();
        createProduct(values, user.token)
            .then((res) => {
                console.log(res);
                window.alert(`${res.data.title} is created`);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
                if (err.response.status === 400) toast.error(err.response.data)
            })
    }

    const handleCategoryChange = (value) => {
        setValues({ ...values, subs: [], category: value });
        getCategorySubs(value)
            .then((res) => {
                console.log('subs option category', res);
                setSubOptions(res.data)
            })
        setShowSubs(true)
    }

    const handleChangeInput = (value, name) => {
        setValues({ ...values, [name]: value });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr' }}>
            <div style={{ gridColumn: '1 / 2' }}>
                <AdminNav />
            </div>
            <div style={{ gridColumn: '2 / 3', padding: '30px' }}>
                {loading ? (<LoadingOutlined className='text-danger' />) : (<h2>Product create form</h2>
                )}
                <hr />
                {/* {JSON.stringify(values.images)} */}
                <div className='p-2'>
                    <FileUpload values={values} setValues={setValues} setLoading={setLoading} />
                </div>
                <ProductCreateForm handleChange={handleChange} handleSubmit={handleSubmit} values={values}
                    handleChangeInput={handleChangeInput}
                    handleCategoryChange={handleCategoryChange}
                    subOptions={subOptions}
                    showSub={showSub}
                    setValues={setValues}
                />
            </div>
        </div>

    )
}

export default ProductCreate;