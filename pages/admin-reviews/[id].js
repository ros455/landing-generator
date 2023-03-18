import React, { useState } from 'react';
import Image from 'next/legacy/image';
import style from '../../styles/Reviews.module.scss';
import { useRouter } from 'next/router';
export const getStaticPaths = async () => {
  const res = await fetch(`http://localhost:4444/get-all-admin-comments`);
  const data = await res.json();

  const paths = data.map((review) => {
    return {
      params: { id: `${review._id}` }
    }
  });

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async (context) => {

  const { id } = context.params;

  const res = await fetch(`http://localhost:4444/get-admin-comment/${id}`);
  const data = await res.json();

  return {
    props: { review: data }
  }
}

const AdminReview = ({ review }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleDelete = () => {
    const defaultUrl = window.location.href; // замініть на фактичний URL
    const id = defaultUrl.split('/').pop(); // отримати останній елемент URL (ID)

    const url = `http://localhost:4444/remove-comment/${id}`;
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    };
    fetch(url, options)
    router.push('http://localhost:3000/');
  }

  const handleEdit = () => {
    setIsOpen(true);
    setImageUrl(review.imageUrl);
    setName(review.name);
    setRating(review.rating);
    setDescription(review.description);
    setDate(review.date);
  }
  const editFetchFunc = () => {
    const defaultUrl = window.location.href; // замініть на фактичний URL
    const id = defaultUrl.split('/').pop(); // отримати останній елемент URL (ID)

    const url = `http://localhost:4444/update-comment/${id}`;
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": name,
        "description": description,
        "rating": rating,
        "date": date
      })
    };
    fetch(url, options)
    setIsOpen(false);
    // window.location.reload();
  }
  const onClickRemoveImage = async (event) => {
    setImageFile('');
    setImageUrl('');
  };
  const saveUpdateImage = async () => {
    try {
      const defaultUrl = window.location.href; // замініть на фактичний URL
      const id = defaultUrl.split('/').pop(); // отримати останній елемент URL (ID)
      if (imageFile == '') {

        const formData = new FormData();
        formData.append('imageUrl', '');
        const response = await fetch(`http://localhost:4444/update-image/${id}`, {
          method: 'PATCH',
          body: formData
        });
        const data = await response.json();

      } else {
        const formData = new FormData();
        formData.append('imageUrl', imageFile);
        const response = await fetch(`http://localhost:4444/update-image/${id}`, {
          method: 'PATCH',
          body: formData
        });
        const data = await response.json();

      }
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  const handleFileChange = async (event) => {
    setImageFile(event.target.files[0]);
  };

  return (
    <div className={style.main_review_block}>
      <div className={style.review_block}>
        <div className={style.image_wrap}>
        {review.imageUrl 
          ?           
          <Image
            src={`${review.imageUrl}`}
            alt={`${review.imageUrl}`}
            width='100'
            height='100'
            layout="responsive"
            objectFit="cover"
            className={style.image_item}
          /> 
          : 
          <></>}
        </div>
        <div>
          <h1>{review.name}</h1>
          <p>{review.date}</p>
          <h1>Рейтинг: {review.rating}</h1>
          <h1 className={style.review_desc}>Опис: {review.description}</h1>
        </div>
      </div>
      <div>
        {isOpen && (
          <div className={style.image_wrap}>
            <div>
              {review.imageUrl 
              ?
              <Image
              src={`${review.imageUrl}`}
              alt={`${review.imageUrl}`}
              width='100'
              height='100'
              layout="responsive"
              objectFit="cover"
              className={style.image_item}
            />  
            :
            <></>}
            </div>
            <div>
              {imageUrl ?
                <button onClick={onClickRemoveImage}>Видалити фото</button>
                :
                <>
                  <input type='file' onChange={handleFileChange} />
                  <button onClick={saveUpdateImage}>Зберегти </button>
                  <div>
                  </div>
                </>
              }
            </div>

            <p>Вкажіть імя</p>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
            <p>Ваш коментар</p>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            <p>Поставте оцінку</p>
            <input type='number' value={rating} onChange={(e) => setRating(e.target.value)} />
            <p>Вкажіть дату:</p>
            <input type='date' value={date} onChange={(e) => setDate(e.target.value)} />
            <div>
              <button onClick={() => setIsOpen(false)}>Закрити</button>
              <button onClick={editFetchFunc}>Підтвердити</button>
            </div>
          </div>
        )}
      </div>
      <div className={style.button_block}>
        {isOpen ? 
        <></> : 
          <> <button onClick={handleDelete}>Видалити</button>
          <button onClick={handleEdit}>Редагувати</button></>}
      </div>
    </div>
  );
};

export default AdminReview;