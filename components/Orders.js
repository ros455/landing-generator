import React, { useEffect, useState } from 'react';
import style from '../styles/Order.module.scss';
import Link from 'next/link';
const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [sortOrders, setSortOrders] = useState([]);

    useEffect(() => {
        fetch('https://landing-generator.onrender.com/get-all-order')
            .then((res) => res.json())
            .then((res) => setOrders(res))
    }, [])

    useEffect(() => {
        const newArr = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setSortOrders([...newArr]);
    },[orders])

    return (
        <div>
            <h2>Замовлення</h2>
            <div>
                {sortOrders.length != 0
                    ?
                    <>
                        <div className={style.order_block}>
                            <p className={style.order_title}>Назва товару</p>
                            <p className={style.order_title}>Колір</p>
                            <p className={style.order_title}>Ціна</p>
                        </div>
                        {sortOrders.map((el) => (
                            <Link href={`order/${el._id}`} key={el._id} className={style.order_block}>
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