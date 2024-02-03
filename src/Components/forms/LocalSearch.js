import { Input } from 'antd';
import React from 'react'

const LocalSearch = ({ keyword, setKeyword }) => {

    const handleSearchChange = (e) => {
        e.preventDefault()
        setKeyword(e.target.value.toLowerCase())
    }
    return (
        <div>
            <Input type='search'
                placeholder='filter'
                value={keyword}
                onChange={handleSearchChange} />
        </div>
    )
}

export default LocalSearch;