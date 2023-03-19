import React,{useState,useEffect} from 'react';
import Link from 'next/link';
import style from '../styles/Reviews.module.scss';
const TemalateReviews = ({ reviews, url }) => {
    return (
        <div>
            <div className={style.display_reviews}>
                <p className={style.review_title}>Імя</p>
                <p className={style.review_title}>Дата</p>
                <p className={style.review_title}>Оцінка</p>
            </div>
            {reviews &&
                reviews.map((el, idx) => (
                    <div key={idx}>
                        <Link href={`${url}${el._id}`} className={style.display_reviews}>
                            <p> {el.name}</p>
                            <p> {new Date(el.createdAt).toISOString().slice(0, 10)}</p>
                            <p> {el.rating}</p>
                        </Link>
                    </div>
                ))}
        </div>
    );
};

export default TemalateReviews;