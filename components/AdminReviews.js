import React, { useEffect, useState } from 'react';
import style from '../styles/Reviews.module.scss'
import Link from 'next/link';
import { useRouter } from 'next/router';
import TemalateReviews from './TemalateReviews';
const AdminReviews = () => {
    const [reviews, setReviews] = useState([]);
    const router = useRouter();
    useEffect(() => {
        fetch('http://localhost:4444/get-all-admin-comments')
            .then((res) => res.json())
            .then((res) => setReviews(res))
    }, [])

    const redirectFunc = () => {
        router.push('http://localhost:3000/admin-reviews');
    }
    return (
        <div>
            <div>
                <h2>Відгуки на сайті</h2>
               <div className={style.add_review_button_wrapper }>
               <button className={style.add_review_button} onClick={redirectFunc}>Додати відгук </button>
               </div>
            </div>
            <TemalateReviews reviews={reviews} url='http://localhost:3000/admin-reviews/'/>
        </div>
    );
};

export default AdminReviews;