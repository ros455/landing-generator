import React from 'react';
import style from '../../styles/admin/AdminPanel.module.scss';
import AdminReviews from './AdminReviews';
import NewReviews from './NewReviews';
import Orders from './Orders';
import Products from './Products';
import Timer from './AdminTimer';
const AdminPanel = () => {
    return (
        <div>
            <div className={style.title_block}>
                <p className={style.title}>Назва сайту</p>
            </div>
            <Timer/>
            <NewReviews/>
            <AdminReviews/>
            <Products/>
            <Orders/>
        </div>
    );
};

export default AdminPanel;