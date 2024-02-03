import React, { useEffect, useState } from 'react';
import AdminNav from '../../../Components/nav/AdminNav';
import { Button, Input } from 'antd';
import { toast } from 'react-toastify';
import { getCategory, updateCategory } from '../../../functions/category';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import CategoryForm from '../../../Components/forms/CategoryForm';

const CategoryUpdate = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const { slug } = useParams(); // Use the useParams hook to get the slug

    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        loadCategory();
    }, []);

    const loadCategory = () =>
        getCategory(slug).then((c) => setName(c.data.name));

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        updateCategory(slug, { name }, user.token)
            .then((res) => {
                setLoading(false);
                setName('');
                toast.success(`"${res.data.name}" is Updated`);
                navigate("/admin/category");
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data); // Fix typo here: err.response.data
            });
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr' }}>
            <div style={{ gridColumn: '1 / 2' }}>
                <AdminNav />
            </div>
            <div style={{ gridColumn: '2 / 3', padding: '30px' }}>
                {loading ? <h2>Loading...</h2> : <h2>Category Update Page</h2>}
                <CategoryForm handleSubmit={handleSubmit} setName={setName} name={name} />
                <hr />
            </div>
        </div>
    );
};

export default CategoryUpdate;
