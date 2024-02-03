import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Input from 'antd/es/input/Input';
import { Grid } from '@mui/material';

export default function Search() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { search } = useSelector((state) => ({ ...state }))
    const { text } = search;

    const handleChange = (e) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: e.target.value }
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        navigate(`/shop?${text}`)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Grid container>
                    <Grid>
                        <Input
                            type='search'
                            value={text}
                            placeholder='Search'
                            onChange={handleChange}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid>
                        <SearchOutlined onClick={handleSubmit} style={{ cursor: 'pointer', marginLeft: 15 }} />
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}
