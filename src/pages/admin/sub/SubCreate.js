import React, { useEffect, useState } from 'react'
import AdminNav from '../../../Components/nav/AdminNav';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import CategoryForm from '../../../Components/forms/CategoryForm';
import LocalSearch from '../../../Components/forms/LocalSearch';
import { createSub, getSubs, removeSub } from '../../../functions/sub';
import { getCategories } from '../../../functions/category';
import { Select } from 'antd';

const SubCreate = () => {
    const { user } = useSelector((state) => ({ ...state }))

    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState("")
    const [keyword, setKeyword] = useState("")
    const [subs, setSubs] = useState([])

    useEffect(() => {
        loadCategories()
        loadSubs()
    }, [])

    const loadCategories = () =>
        getCategories().then((c) => {
            setCategories(c.data)
        })

    const loadSubs = () =>
        getSubs().then((s) => {
            setSubs(s.data)
        })

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        createSub({ name, parent: category }, user.token)
            .then((res) => {
                setLoading(false)
                setName('')
                toast.success(`"${res.data.name}" is Created`)
                loadSubs()
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
            removeSub(slug, user.token)
                .then((res) => {
                    setLoading(false)
                    toast.success(`${res.data.name} deleted`);
                    loadSubs()
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
                {loading ? <h2>Loading...</h2> : <h2>Create sub</h2>}
                <div style={{ display: 'flex', flexDirection: 'column', paddingTop: "10px" }}>
                    <label>Parent Category</label>
                    <br />
                    <Select
                        name="category"
                        onChange={(value) => setCategory(value)}
                        placeholder="Select Category"
                    >
                        <label value="">Select Category</label>
                        {categories.filter(searched(keyword)).map((c) => (
                            <Select.Option key={c._id} value={c._id}>
                                {c.name}
                            </Select.Option>
                        ))}
                    </Select>

                </div>
                <br />
                <br />
                <CategoryForm handleSubmit={handleSubmit} setName={setName} name={name} />
                <br />
                <br />
                <LocalSearch keyword={keyword} setKeyword={setKeyword} />
                <hr />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {subs.filter(searched(keyword)).map((s) => (
                        <div key={s._id} style={{ backgroundColor: 'antiquewhite', padding: '10px', marginBottom: '5px', display: 'flex', justifyContent: 'space-between' }}>
                            <span>{s.name}</span>
                            <div style={{ marginRight: "20px" }}>
                                <span style={{ marginRight: "20px" }} onClick={() => handleRemove(s.slug)}><DeleteOutlined /></span>
                                <Link to={`/admin/sub/${s.slug}`}><EditOutlined /></Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SubCreate;