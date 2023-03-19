import React from 'react';
import TemplateDetailReview from '../../components/TemplateDetailReview';

export const getStaticPaths = async () => {
  const res = await fetch(`https://landing-generator.onrender.com/get-all-comments`);
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

  const res = await fetch(`https://landing-generator.onrender.com/get-comment/${id}`);
  const data = await res.json();

  return {
    props: { review: data }
  }
}

const NewReview = ({ review }) => {
  return (
    <TemplateDetailReview 
    review={review}
    deleteUrl='https://landing-generator.onrender.com/remove-user-comment/'
    updateReviewUrl = 'https://landing-generator.onrender.com/update-user-comment/'
    updateImageUrl = 'https://landing-generator.onrender.com/update-user-image/'
    userReview = {true}
    />
  );
};

export default NewReview;