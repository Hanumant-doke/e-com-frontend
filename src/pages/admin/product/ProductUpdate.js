import React, { useEffect, useState } from 'react';
import AdminNav from '../../../Components/nav/AdminNav';
import { getProduct, updateProducts } from '../../../functions/product';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ProductUpdateForm from '../../../Components/forms/ProductUpdateForm';
import { getCategories, getCategorySubs } from '../../../functions/category';
import FileUpload from '../../../Components/forms/FileUpload';
import { LoadingOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';


const initialState = {
    title: "",
    description: "",
    price: "",
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

const ProductUpdate = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [values, setValues] = useState(initialState)
    const [subOptions, setSubOptions] = useState([])
    const [arryOfSub, satArrayOfSubIds] = useState([])
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("")
    const [categories, setCategories] = useState([])
    const { slug } = useParams();
    console.log(slug, 'slug');
    const navigate = useNavigate()
    useEffect(() => {
        loadProduct();
        loadCategories();
    }, []);

    const loadProduct = () => {
        getProduct(slug)
            .then((p) => {
                // console.log('product', p);
                setValues({ ...values, ...p.data })
                getCategorySubs(p.data.category._id)
                    .then((res) => {
                        setSubOptions(res.data)
                    })
                let arr = []
                p.data.subs.map((s) => {
                    arr.push(s._id)
                })
                satArrayOfSubIds((prev) => arr)
            })
            .catch((error) => {
                console.error('Error loading product:', error);
            });
    };


    const loadCategories = () =>
        getCategories().then((c) => {
            console.log("select category", c.data);
            setCategories(c.data);
        })

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        values.subs = arryOfSub
        values.category = selectedCategory ? selectedCategory : values.category;
        updateProducts(slug, values, user.token)
            .then((res) => {
                setLoading(false);
                toast.success(`${res.data.title}  is updated .`);
                navigate("/admin/products")
            })
            .catch((err) => {
                console.log(err);
                setLoading(false)
                toast.error(err.response.data.err)
            })
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };
    const handleChangeInput = (value, name) => {
        setValues({ ...values, [name]: value });
    };

    const handleCategoryChange = (value) => {
        setValues({ ...values, subs: [], category: value });
        setSelectedCategory(value)
        getCategorySubs(value)
            .then((res) => {
                console.log('subs option category', res);
                setSubOptions(res.data);

                // Check if values.category._id is equal to e.target.value
                if (values.category._id === value) {
                    loadProduct();
                }
            })
            .catch((error) => {
                // Handle errors if needed
                console.error('Error fetching category subs:', error);
            });

        satArrayOfSubIds([]);
    };


    console.log(categories, 'categories');

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr' }}>
            <div style={{ gridColumn: '1 / 2' }}>
                <AdminNav />
            </div>
            <div style={{ gridColumn: '2 / 3', padding: '30px' }}>
                {JSON.stringify(values)}
                {loading ? (<LoadingOutlined className='text-danger' />) : (<h2>Product Update Form</h2>
                )}
                <hr />
                <div className='p-2'>
                    <FileUpload values={values} setValues={setValues} setLoading={setLoading} />
                </div>
                <ProductUpdateForm
                    handleChange={handleChange} handleSubmit={handleSubmit} values={values}
                    setValues={setValues} handleChangeInput={handleChangeInput}
                    handleCategoryChange={handleCategoryChange} categories={categories}
                    subOptions={subOptions} selectedCategory={selectedCategory}
                    arryOfSub={arryOfSub} satArrayOfSubIds={satArrayOfSubIds}
                />
                <hr />
            </div>
        </div>
    );
};

export default ProductUpdate;
