import React, { useEffect, useState } from 'react'
import AdminNav from '../../../Components/nav/AdminNav';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { createCategory, getCategories, removeCategory } from '../../../functions/category';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import CategoryForm from '../../../Components/forms/CategoryForm';
import LocalSearch from '../../../Components/forms/LocalSearch';

const CategoryCreate = () => {
    const { user } = useSelector((state) => ({ ...state }))

    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])

    const [keyword, setKeyword] = useState("")

    useEffect(() => {
        loadCategories()
    }, [])

    const loadCategories = () =>
        getCategories().then((c) =>
            setCategories(c.data))

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        createCategory({ name }, user.token)
            .then((res) => {
                setLoading(false)
                setName('')
                toast.success(`"${res.data.name}" is Created`)
                loadCategories()
            })
            .catch((err) => {
                console.log(err);
                setLoading(false)
                if (err.response.status === 400) toast.error(err.response.date)
            })
    }

    const handleRemove = async (slug) => {
        if (window.confirm("Delete?")) {
            setLoading(true)
            removeCategory(slug, user.token)
                .then((res) => {
                    setLoading(false)
                    toast.error(`${res.data.name} deleted`);
                    loadCategories()
                })
                .catch((err) => {
                    if (err.response.status === 400) {
                        setLoading(false)
                        toast.error(err.response.date)
                    }
                })
        }
    }

    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr' }}>
            <div style={{ gridColumn: '1 / 2' }}>
                <AdminNav />
            </div>
            <div style={{ gridColumn: '2 / 3', padding: '30px' }}>
                {loading ? <h2>Loading...</h2> : <h2>Create category</h2>}
                <CategoryForm handleSubmit={handleSubmit} setName={setName} name={name} />
                <br />
                <br />
                <LocalSearch keyword={keyword} setKeyword={setKeyword} />
                <hr />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {categories.filter(searched(keyword)).map((c) => (
                        <div key={c._id} style={{ backgroundColor: 'antiquewhite', padding: '10px', marginBottom: '5px', display: 'flex', justifyContent: 'space-between' }}>
                            <span>{c.name}</span>
                            <div style={{ marginRight: "20px" }}>
                                <span style={{ marginRight: "20px" }} onClick={() => handleRemove(c.slug)}><DeleteOutlined /></span>
                                <Link to={`/admin/category/${c.slug}`}><EditOutlined /></Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CategoryCreate;