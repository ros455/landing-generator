import React from 'react';
import global from '../../styles/admin/Global.module.scss';
const Layout = ({ children }) => {
    return (
        <div className={global.container}>
            {children}
        </div>
    );
};

export default Layout;