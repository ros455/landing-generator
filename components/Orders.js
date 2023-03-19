import React, { useEffect, useState } from 'react';
import style from '../styles/Order.module.scss';
import Link from 'next/link';
const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('https://landing-generator.onrender.com/get-all-order')
            .then((res) => res.json())
            .then((res) => setOrders(res))
    }, [])

    return (
        <div>
            <h2>Замовлення</h2>
            <div>
                {orders.length != 0
                    ?
                    <>
                        <div className={style.order_block}>
                            <p className={style.order_title}>Назва товару</p>
                            <p className={style.order_title}>Колір</p>
                            <p className={style.order_title}>Ціна</p>
                        </div>
                        {orders.map((el) => (
                            <Link href={`http://localhost:3000/order/${el._id}`} key={el._id} className={style.order_block}>
                                <p>{el.title}</p>
                                <p>{el.color}</p>
                                <p>{el.price}</p>
                            </Link>
                        ))}
                    </>
                    :
                    <div className={style.loader_wrap}>
                        <span className={style.loader}></span>
                    </div>
                }
            </div>
        </div>
    );
};

export default Orders;