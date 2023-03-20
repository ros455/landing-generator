import React,{useState, useEffect} from 'react';
import TemplateDetailReview from '../../components/TemplateDetailReview';

const AdminReview = () => {
  const [review, setReview] = useState([]);
  useEffect(() => {
    const defaultUrl = window.location.href; // замініть на фактичний URL
    const id = defaultUrl.split('/').pop(); // отримати останній елемент URL (ID)
    const url = `https://landing-generator.onrender.com/get-admin-comment/${id}`
    fetch(url)
    .then((res) => res.json())
    .then((res) => setReview(res))
  },[])
  return (
    <TemplateDetailReview 
    review={review}
    deleteUrl='https://landing-generator.onrender.com/remove-comment/'
    updateReviewUrl = 'https://landing-generator.onrender.com/update-admin-comment/'
    updateImageUrl = 'https://landing-generator.onrender.com/update-admin-image/'
    userReview = {false}
    />
  );
};

export default AdminReview;