import React, { useEffect, useState } from 'react';
import style from '../styles/Reviews.module.scss'
import { useRouter } from 'next/router';
import TemalateReviews from './TemalateReviews';
const AdminReviews = () => {
    const [reviews, setReviews] = useState([]);
    const router = useRouter();
    useEffect(() => {
        fetch('https://landing-generator.onrender.com/get-all-admin-comments')
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
            </div>
            {reviews.length != 0 ?
                <>
                    <div className={style.add_review_button_wrapper}>
                        <button className={style.add_review_button} onClick={redirectFunc}>Додати відгук </button>
                    </div>
                    <TemalateReviews reviews={reviews} url='http://localhost:3000/admin-reviews/' />
                </>
            :
            <div className={style.loader_wrap}>
                <span className={style.loader}></span>
            </div>}
        </div>
    );
};

export default AdminReviews;