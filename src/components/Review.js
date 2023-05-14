import React from 'react';
import styled from 'styled-components';
import Star from "./Star";

const Review = ({ review }) => {
  const { comment, rating, username } = review;

  return (
    <ReviewWrapper>
      <div className="review-header">
        <h4 className="username">{username}</h4>
        <Star className="star-rating" stars={rating} />
      </div>
      <p className="comment">{comment}</p>
    </ReviewWrapper>
  );
};

const ReviewWrapper = styled.div`
  width: 300px; 
  background-color: #fafafa;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  
  .review-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .username {
    font-weight: bold;
    font-size: 1.5rem;
    color: #333;
  }

  .star-rating {
    font-size: 0.8rem; /* this should help decrease the size of the stars */
  }

  .comment {
    font-size: 1.5rem;
    color: #666;
    line-height: 1.6;
  }
`;

export default Review;
