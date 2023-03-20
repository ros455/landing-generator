import React,{useEffect,useState} from 'react';
import TemalateReviews from './TemalateReviews';
import Loader from '../components/Loader.js';
const NewReviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('https://lending-generator-server.herokuapp.com/get-all-comments')
        .then((res) => res.json())
        .then((res) => setReviews(res))
    },[])

    return (
        <div>
            <div>
                <h2>Нові відгуки</h2>
            </div>
            {reviews.length != 0 ?
                <TemalateReviews reviews={reviews} url='new-reviews/'/>
            :
            <Loader/>
            }
        </div>
    );
};

export default NewReviews;