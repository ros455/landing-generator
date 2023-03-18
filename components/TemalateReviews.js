import React from 'react';
import Link from 'next/link';
import style from '../styles/Reviews.module.scss';
const TemalateReviews = ({ reviews, url }) => {
    return (
        <div>
            {reviews &&
                reviews.map((el, idx) => (
                    <div key={idx}>
                        <Link href={`${url}${el._id}`} className={style.display_reviews}>
                            <p>Імя: {el.name}</p>
                            <p>Дата: {new Date(el.createdAt).toISOString().slice(0, 10)}</p>
                            <p>Оцінка: {el.rating}</p>
                        </Link>
                    </div>
                ))}
        </div>
    );
};

export default TemalateReviews;