import React, { useEffect, useState } from 'react';
import style from '../styles/Products.module.scss';
const Products = () => {
    const [products, setProducts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [currentId, setCurrentId] = useState('');

    const [title, setTitle] = useState('');
    const [color, setColor] = useState('');
    const [price, setPrice] = useState('');
    const [availability, setAvilability] = useState('');

    useEffect(() => {
        fetch('http://localhost:4444/get-all-products')
            .then((res) => res.json())
            .then((res) => setProducts(res))
    }, [])

    const editFunc = (id) => {
        setCurrentId(id);
        setIsOpen(true);
        const comment = products.find(el => el._id === id);
        if (comment) {
            setTitle(comment.title);
            setColor(comment.color);
            setPrice(comment.price);
            setAvilability(comment.availability);
        }
    }

    const onSubmit = () => {
        const url = `http://localhost:4444/update-product/${currentId}`;
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "title": title,
                "color": color,
                "price": price,
                "availability": availability
            })
        };
        fetch(url, options)
        setIsOpen(false);
        window.location.reload();
    }

    return (
        <div>
            <div>
                <h2>Товари</h2>
            </div>
            {isOpen && 
            <div className={style.block_edit}>
                <input type='text' value={title} onChange={(e) => setTitle(e.target.value)}/>
                <input type='text' value={color} onChange={(e) => setColor(e.target.value)}/>
                <input type='text' value={price} onChange={(e) => setPrice(e.target.value)}/>
                    <select value={availability} onChange={(e) => setAvilability(e.target.value)}>
                        <option value="В наявності">В наявності</option>
                        <option value="Не має в наявності">Не має в наявності</option>
                    </select>
                <div className={style.edit_button_block}>
                <button className={style.product_close_button} onClick={() => setIsOpen(false)}>Закрити</button>
                <button className={style.product_button} onClick={onSubmit}>Зберегти</button>
                </div>
            </div>}
            <div>
                <table className={style.table}>
                    <thead>
                        <tr className={style.tr}>
                            <th>Назва товару</th>
                            <th>Колір</th>
                            <th>Ціна</th>
                            <th>Наявність</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.map((el) => (
                            <tr className={style.tr} key={el._id}>
                                <td>{el.title}</td>
                                <td>{el.color}</td>
                                <td>{el.price}</td>
                                <td>{el.availability}</td>
                                <td><button className={style.product_button} onClick={() => editFunc(el._id)}>Редагувати</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Products;