import React from 'react';
import TemplateDetailReview from '../../components/TemplateDetailReview';
export const getStaticPaths = async () => {
  const res = await fetch(`https://landing-generator.onrender.com/get-all-admin-comments`);
  const data = await res.json();

  const paths = data.map((review) => {
    return {
      params: { id: `${review?._id}` }
    }
  });

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async (context) => {

  const { id } = context.params;

  const res = await fetch(`https://landing-generator.onrender.com/get-admin-comment/${id}`);
  const data = await res.json();

  return {
    props: { review: data }
  }
}

const AdminReview = ({ review }) => {
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