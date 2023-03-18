import React from 'react';
import global from '../styles/Global.module.scss'
const Layout = ({ children }) => {
    return (
        <div className={global.container}>
            {children}
        </div>
    );
};

export default Layout;