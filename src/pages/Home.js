import React from 'react';
import TyperWriterText from '../Components/cards/TyperWriterText';
import NewArrivals from '../Components/home/NewArrivals'
import BestSeller from '../Components/home/BestSeller';
import CategoryList from '../Components/category/CategoryList';
import SubList from '../Components/sub/SubList';

const Home = () => {
    return (
        <>
            <div style={{ backgroundColor: "lightgray", padding: '30px' }}>
                <TyperWriterText text={['Letest Product', 'New Arrivals', 'Best Sellers ']} />
            </div>
            <div style={{ backgroundColor: "lightgray", textAlign: "center", padding: '10px', marginTop: "20px" }}>
                <h3>New Arrivals</h3>
            </div>
            <NewArrivals /><br /><br />
            <div style={{ backgroundColor: "lightgray", textAlign: "center", padding: '10px', marginTop: "20px" }}>
                <h3>Best Sellers</h3>
            </div>
            <BestSeller /><br /><br />

            <div style={{ backgroundColor: "lightgray", textAlign: "center", padding: '10px', marginTop: "20px" }}>
                <h3>Category List</h3>
            </div>
            <CategoryList /><br /><br />

            <div style={{ backgroundColor: "lightgray", textAlign: "center", padding: '10px', marginTop: "20px" }}>
                <h3>Subs category List</h3>
            </div>
            <SubList /><br /><br />

        </>
    )
}

export default Home
