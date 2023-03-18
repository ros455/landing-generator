import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import style from '../../styles/AddReviews.module.scss';
const AddReview = () => {
    const router = useRouter();
    const inputFileRef = React.useRef(null);

    const [selectedFile, setSelectedFile] = useState(null);
    const [name, setName] = useState('');
    const [rating, setRating] = useState(null);
    const [description, setDescription] = useState(null);
    const [date, setDate] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('imageUrl', selectedFile );
            formData.append('name', name);
            formData.append('rating', rating);
            formData.append('description', description);
            formData.append('date', date);
            const response = await fetch('http://localhost:4444/create-comment', {
                method: 'POST',
                body: formData
            });

            router.push('http://localhost:3000');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={style.add_reviews_wrapper}>
            <div className={style.add_reviews_block}>
                <p>Виберіть фото</p>
                <input type='file'
                    hidden
                    ref={inputFileRef}
                    onChange={(e) => setSelectedFile(e.target.files[0])} />
                <button className={style.add_reviews_photo_button}
                onClick={() => inputFileRef.current.click()}>Завантажити фото</button>
                <p>Вкажіть імя</p>
                <input className={style.add_reviews_input} type='text' onChange={(e) => setName(e.target.value)} />
                <p>Ваш коментар</p>
                <textarea className={style.add_reviews_textarea} onChange={(e) => setDescription(e.target.value)} />
                <p>Поставте оцінку (не быліше 5)</p>
                <input className={style.add_reviews_input} type='number'
                    onChange={(e) => setRating(e.target.value > 5 || e.target.value < 1  ? 5 : e.target.value )} />
                <p>Вкажіть дату:</p>
                <input type='date' onChange={(e) => setDate(e.target.value)} />
               <div className={style.add_reviews_submit_button_wrap}>
               <button className={style.add_reviews_submit_button} onClick={handleSubmit}>Створити відгук</button>
               </div>
            </div>
        </div>
    );
};

export default AddReview;