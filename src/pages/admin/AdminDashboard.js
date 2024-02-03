import React from 'react';
import AdminNav from "../../Components/nav/AdminNav";

const AdminDashboard = () => {

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr' }}>
            <div style={{ gridColumn: '1 / 2' }}>
                <AdminNav />
            </div>
            <div style={{ gridColumn: '2 / 12', padding: '20px' }}>
                <h4>Admin Dashboard</h4>
            </div>
        </div>
    );
};

export default AdminDashboard;
