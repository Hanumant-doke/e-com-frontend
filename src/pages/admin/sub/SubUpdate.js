import React, { useEffect, useState } from 'react'
import AdminNav from '../../../Components/nav/AdminNav';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom';
import CategoryForm from '../../../Components/forms/CategoryForm';
import LocalSearch from '../../../Components/forms/LocalSearch';
import { getSub, updateSub } from '../../../functions/sub';
import { getCategories } from '../../../functions/category';
import { Select } from 'antd';

const SubUpdate = () => {
    const { user } = useSelector((state) => ({ ...state }))

    const { slug } = useParams();

    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [parent, setParent] = useState("")

    const navigate = useNavigate();

    useEffect(() => {
        loadCategories()
        loadSub()
    }, [slug])

    const loadCategories = () =>
        getCategories().then((c) => setCategories(c.data))

    const loadSub = () =>
        getSub(slug).then((s) => {
            setName(s.data.name)
            setParent(s.data.parent)
        })

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        updateSub(slug, { name, parent }, user.token)
            .then((res) => {
                setLoading(false)
                setName('')
                toast.success(`"${res.data.name}" is Updated`)
                navigate("/admin/sub")
            })
            .catch((err) => {
                console.log(err);
                setLoading(false)
                if (err.response.status === 400) toast.error(err.response.date)
            })
    }


    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr' }}>
            <div style={{ gridColumn: '1 / 2' }}>
                <AdminNav />
            </div>
            <div style={{ gridColumn: '2 / 3', padding: '30px' }}>
                {loading ? <h2>Loading...</h2> : <h2>Update sub</h2>}
                <div style={{ display: 'flex', flexDirection: 'column', paddingTop: "10px" }}>
                    <label>Parent Category</label>
                    <br />
                    <Select
                        name="category"
                        onChange={(value) => setParent(value)}
                        placeholder="Select Category"
                    >
                        <label value="">Select Category</label>
                        {categories.length > 0 &&
                            categories.map((c) => (
                                <Select.Option key={c._id} value={c._id} selected={c._id === parent}>
                                    {c.name}
                                </Select.Option>
                            ))
                        }
                    </Select>

                </div>
                <br />
                <br />
                <CategoryForm handleSubmit={handleSubmit} setName={setName} name={name} />
                <br />
                <br />
                {/* <LocalSearch keyword={keyword} setKeyword={setKeyword} /> */}
                <hr />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {/* {subs.filter(searched(keyword)).map((s) => (
                        <div key={s._id} style={{ backgroundColor: 'antiquewhite', padding: '10px', marginBottom: '5px', display: 'flex', justifyContent: 'space-between' }}>
                            <span>{s.name}</span>
                            <div style={{ marginRight: "20px" }}>
                                <span style={{ marginRight: "20px" }} onClick={() => handleRemove(s.slug)}><DeleteOutlined /></span>
                                <Link to={`/admin/sub/${s.slug}`}><EditOutlined /></Link>
                            </div>
                        </div>
                    ))} */}
                </div>
            </div>
        </div>
    )
}

export default SubUpdate;