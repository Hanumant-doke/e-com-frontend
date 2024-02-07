import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getProductsByCount, fetchProductByFilter } from '../functions/product';
import { getSubs } from "../functions/sub"
import { Grid } from '@mui/material';
import ProductCard from '../Components/cards/ProductCard';
import { Checkbox, Menu, Radio, Slider } from 'antd'
import { DollarOutlined, DownSquareOutlined, StarOutlined } from '@ant-design/icons';
import { getCategories } from '../functions/category';
import Star from '../Components/forms/Star';

export default function Shop() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [price, setPrice] = useState([0, 0])
    const [ok, setOk] = useState(false);
    const [categories, setCategories] = useState([])
    const [categoryIds, setCategoryIds] = useState([])
    const [star, setStar] = useState("")
    const [subs, setSubs] = useState([])
    const [sub, setSub] = useState("")
    const [brand, setBrand] = useState("");
    const [brands, setBrands] = useState(["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"])
    const [color, setColor] = useState("")
    const [colors, setColors] = useState(["Black", "Brown", "Silver", "White", "Blue"])
    const [shipping, setShipping] = useState("")

    let dispatch = useDispatch();
    let { search } = useSelector((state) => ({ ...state }));
    const { text } = search;

    useEffect(() => {
        loadAllProducts()
        getCategories().then((res) => setCategories(res.data))
        getSubs().then((res) => setSubs(res.data))
    }, [])

    const loadAllProducts = () => {
        getProductsByCount(12).then((p) => {
            setProducts(p.data);
            setLoading(false)
        })
    }

    useEffect(() => {
        const delayed = setTimeout(() => {
            fetchProducts({ query: text });
            if (!text) {
                loadAllProducts();
            }
        }, 300)
        return () => clearTimeout(delayed);
    }, [text])

    const fetchProducts = (arg) => {
        fetchProductByFilter(arg).then((res) => {
            setProducts(res.data);
        })
    }

    useEffect(() => {
        console.log("ok to request");
        fetchProducts({ price });
    }, [ok])

    const handeleSlider = (value) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" }
        })
        setCategoryIds([])
        setPrice(value);
        setStar("")
        setBrand("")
        setColor("")
        setShipping("")
        setTimeout(() => {
            setOk(!ok)
        }, 300);
    }

    const showCategories = () => categories.map((c) => <div key={c._id}>
        <Checkbox onChange={handleCheck} value={c._id} name='category'
            checked={categoryIds.includes(c._id)}>
            {c.name}
        </Checkbox>
        <br />
    </div>)

    const handleCheck = (e) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" }
        })
        setPrice([0, 0]);
        setStar("")
        setSub("")
        setColor("")
        let inTheState = [...categoryIds];
        let justChecked = e.target.value
        let foundInTheState = inTheState.indexOf(justChecked)

        if (foundInTheState === -1) {
            inTheState.push(justChecked);
        } else {
            inTheState.splice(foundInTheState, 1);
        }
        setCategoryIds(inTheState);
        fetchProducts({ category: inTheState })
    }

    const handleStarClick = (num) => {
        console.log(num);
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" }
        })
        setPrice([0, 0]);
        setCategoryIds([])
        setStar(num)
        setSub("")
        setBrand("")
        setColor("")
        setShipping("")
        fetchProducts({ stars: num })
    }
    const showStars = () => (
        <div style={{ paddingBottom: '2px' }}>
            <Star starClick={handleStarClick} numberOfStars={5} />
            <Star starClick={handleStarClick} numberOfStars={4} />
            <Star starClick={handleStarClick} numberOfStars={3} />
            <Star starClick={handleStarClick} numberOfStars={2} />
            <Star starClick={handleStarClick} numberOfStars={1} />
        </div>
    )


    const showSubs = () => subs.map((s) => (
        <div
            key={s._id}
            onClick={() => handleSub(s)}
            className='badge badge-secondary p-1 m-1'
            style={{ cursor: "pointer", marginLeft: "10px", color: "black" }}

        >
            {s.name}
        </div>
    ));

    const handleSub = (sub) => {
        // console.log("Sub", sub);
        setSub(sub)
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" }
        })
        setPrice([0, 0]);
        setCategoryIds([])
        setStar("")
        setBrand("")
        setColor("")
        setShipping("")
        fetchProducts({ sub });
    }

    const showBrands = () => brands.map((b) => (
        <Radio
            key={b}
            value={b} name={b} checked={b === brand} onChange={handleBrand}
            style={{ paddingRight: 50, paddingLeft: 30, margin: 2 }}
        >
            {b}
        </Radio>
    ));

    const handleBrand = (e) => {
        setSub("")
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" }
        })
        setPrice([0, 0]);
        setCategoryIds([])
        setStar("")
        setColor("")
        setShipping("")
        setBrand(e.target.value)
        fetchProducts({ brand: e.target.value });
    }

    const showColors = () => colors.map((c) => (
        <Radio
            key={c}
            value={c} name={c} checked={c === color}
            onChange={handleColur} style={{ paddingRight: 60, paddingLeft: 30, margin: 2 }}
        >
            {c}
        </Radio>
    ));
    const handleColur = (e) => {
        setSub("")
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" }
        })
        setPrice([0, 0]);
        setCategoryIds([])
        setStar("")
        setBrand("")
        setShipping("")
        setColor(e.target.value)
        fetchProducts({ color: e.target.value });
    }

    const showShipping = () => (
        <>
            <Checkbox
                style={{ paddingRight: 80, paddingLeft: 30, margin: 2 }}
                onChange={handleShippingChange}
                value="Yes"
                checked={shipping === "Yes"}
            >Yes</Checkbox>
            <Checkbox
                style={{ paddingRight: 60, paddingLeft: 30, margin: 2, paddingBottom: 20 }}
                onChange={handleShippingChange}
                value="No"
                checked={shipping === "No"}
            >No</Checkbox>
        </>
    )

    const handleShippingChange = (e) => {
        setSub("")
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" }
        })
        setPrice([0, 0]);
        setCategoryIds([])
        setStar("")
        setBrand("")
        setColor("")
        setShipping(e.target.value)
        fetchProducts({ shipping: e.target.value });
    }

    return (
        <div>
            <Grid container spacing={2} padding={2}>
                <Grid item xs={3}>
                    <h4>Search Filter Menu</h4>
                    <hr />
                    <Menu defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7"]} mode='inline' style={{ overflowY: 'auto', maxHeight: '500px' }} >
                        <Menu.SubMenu key="1" title={<span className='h6'><DollarOutlined />Price</span>}>
                            <div style={{ margin: 10 }}>
                                <Slider tipFormatter={(v) => `$${v}`} range
                                    value={price}
                                    onChange={handeleSlider}
                                    max="159997"
                                />
                            </div>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="2" title={<span className='h6'><DownSquareOutlined />Categories</span>}>
                            <div>
                                {showCategories()}
                            </div>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="3" title={<span className='h6'><StarOutlined />Rating</span>}>
                            <div>
                                {showStars()}
                            </div>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="4" title={<span className='h6'><DownSquareOutlined />Sub Categories</span>}>
                            <div>
                                {showSubs()}
                            </div>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="5" title={<span className='h6'><DownSquareOutlined />Brands</span>}>
                            <div>
                                {showBrands()}
                            </div>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="6" title={<span className='h6'><DownSquareOutlined />Color</span>}>
                            <div>
                                {showColors()}
                            </div>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="7" title={<span className='h6'><DownSquareOutlined />Shipping</span>}>
                            <div>
                                {showShipping()}
                            </div>
                        </Menu.SubMenu>
                    </Menu>
                </Grid>
                <Grid item xs={8}>
                    {loading ? (
                        <h4 className='text-danger'>Loading.....</h4>
                    ) : (
                        <h4 className='text-danger'>Products</h4>
                    )}
                    {products.length < 1 && <p>No products found</p>}

                    <Grid container spacing={2}>
                        {products.map((p) => (
                            <Grid item xs={12} sm={6} md={4} key={p._id}>
                                <ProductCard product={p} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}
