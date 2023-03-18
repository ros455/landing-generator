import React,{useEffect,useState} from 'react';
import TemalateReviews from './TemalateReviews';

const NewReviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4444/get-all-comments')
        .then((res) => res.json())
        .then((res) => setReviews(res))
    },[])

    return (
        <div>
            <div>
                <h2>Нові відгуки</h2>
            </div>
            <TemalateReviews reviews={reviews} url='http://localhost:3000/new-reviews/'/>
        </div>
    );
};

export default NewReviews;