import React,{useEffect,useState} from 'react';
import TemalateReviews from './TemalateReviews';
import style from '../styles/Reviews.module.scss';
const NewReviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('https://landing-generator.onrender.com/get-all-comments')
        .then((res) => res.json())
        .then((res) => setReviews(res))
    },[])

    return (
        <div>
            <div>
                <h2>Нові відгуки</h2>
            </div>
            {reviews.length != 0 ?
                <TemalateReviews reviews={reviews} url='http://localhost:3000/new-reviews/'/>
            :
            <div className={style.loader_wrap}>
                <span className={style.loader}></span>
            </div>}
        </div>
    );
};

export default NewReviews;