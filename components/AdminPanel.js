import React from 'react';
import style from '../styles/AdminPanel.module.scss';
import AdminReviews from './AdminReviews';
import NewReviews from './NewReviews';
import Products from './Products';
import Timer from './Timer';
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
        </div>
    );
};

export default AdminPanel;