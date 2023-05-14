import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useProductContext } from "./context/productcontext";
import PageNavigation from "./components/PageNavigation";
import MyImage from "./components/MyImage";
import { Container } from "./styles/Container";
import FormatPrice from "./helpers/FormatPrice";
import { MdSecurity } from "react-icons/md";
import { TbTruckDelivery, TbReplace} from "react-icons/tb";
import {RiCustomerService2Fill} from 'react-icons/ri'
import Star from "./components/Star";
import AddToCart from "./components/AddToCart";
import Loading from "./styles/Loading";
import axios from "axios";
import { Modal } from "@mui/material";
import {BsBoxSeamFill} from 'react-icons/bs'
import Review from "./components/Review";
import { useAuthContext } from "./context/auth_context";

const API = "http://localhost:8080/api/product";

const SingleProduct = () => {
  const { getSingleProduct, isSingleLoading, singleProduct, fetchImage } =
    useProductContext();

  const { id } = useParams();
  const { role } = useAuthContext();
  const {
    productId,
    title,
    description,
    price,
    quantity,
    category,
    sellerUsername,
    images,
  } = singleProduct;

  const [imageUrls, setImageUrls] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);



  async function fetchProductReviewData(productId) {
    try {
      // Fetch average rating
      const averageRatingResponse = await axios.get(`http://localhost:8080/api/reviews/averageRating/${productId}`);
      const averageRating = averageRatingResponse.data || 0;
  
      // Fetch total reviews
      const totalReviewsResponse = await axios.get(`http://localhost:8080/api/reviews/totalReviews/${productId}`);
      const totalReviews = totalReviewsResponse.data || 0;
  
      // Fetch reviews
      const reviewsResponse = await axios.get(`http://localhost:8080/api/reviews/product/${productId}`);
      const reviews = reviewsResponse.data || [];
  
      // Update state
      setAverageRating(averageRating);
      setTotalReviews(totalReviews);
      setReviews(reviews);
    } catch (error) {
      console.error("Error fetching product review data:", error);
    }
  }

  const fetchImageUrls = async (imageIds) => {
    try {
      const urls = await Promise.all(imageIds.map(async (imageId) => {
        return await fetchImage(imageId);
      }));
      setImageUrls(urls);
    } catch (error) {
      console.error("Error fetching image URLs:", error);
    }
  };

  const handleStarClick = () => {
    console.log("clicked")
    setModalOpen(true);
  };
  useEffect(() => {
    getSingleProduct(`${API}/${id}`);
  }, []);

  
  useEffect(() => {
    if (singleProduct && singleProduct.productId) {
        fetchProductReviewData(singleProduct.productId);
    }
  }, [singleProduct]);

  useEffect(() => {
    if (images) {
      fetchImageUrls(images);
    }

  }, [images]);

  if (isSingleLoading) {
    return <div className="page_loading"><Loading/></div>;
  }

  return (
    <Wrapper>
      <PageNavigation title={productId} />
      <Container className="container">
        <div className="grid grid-two-column">
          {/* product Images  */}
          <div className="product_images">
            <MyImage imgs={imageUrls} />
          </div>

          {/* product dAta  */}
          <div className="product-data">
            <h2>{title}</h2>
            <div onClick={totalReviews > 0 ? handleStarClick : null}>
              <Star stars={averageRating} reviews={totalReviews}/>
            </div>
            

            <p className="product-data-price">
              Price: <FormatPrice price={price} />
            </p>
            <p>{description}</p>
            <div className="product-data-warranty">
              
            <div className="product-warranty-data">
                <TbTruckDelivery className="warranty-icon" />
                <p>Home Delivered </p>
              </div>

              <div className="product-warranty-data">
                <BsBoxSeamFill className="warranty-icon" />
                <p>Pickup Available</p>
              </div>

              <div className="product-warranty-data">
                <TbReplace className="warranty-icon" />
                <p>Easy Return</p>
              </div>

              <div className="product-warranty-data">
                <RiCustomerService2Fill className="warranty-icon" />
                <p>Customer Support </p>
              </div>
            </div>

            <div className="product-data-info">
              <p>
                Available:
                <span> {quantity > 0 ? "In Stock" : "Not Available"}</span>
              </p>
              <p>
                ID : <span> {productId} </span>
              </p>
              <p>
                Seller : <span> {sellerUsername} </span>
              </p>
            </div>
            <hr />
            {role !== 'ROLE_SELLER' && role !== 'ROLE_ADMIN' && quantity > 0 && <AddToCart product={singleProduct} />}
          </div>
        </div>

        {/* Review Modal */}
        <Modal
            open={isModalOpen}
            onClose={() => setModalOpen(false)}
            aria-labelledby="review-modal-title"
            aria-describedby="review-modal-description"
        >
            <ModalContainer>
                <h3 id="review-modal-title">Reviews</h3>
                {reviews.map((review) => (
                  <Review key={review.reviewId} review={review} />
                ))}

            </ModalContainer>
        </Modal>
        


      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    padding: 9rem 0;
  }

  .product_images {
    display: flex;
    align-items: center;
  }

  .product-data {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2rem;

    .product-data-warranty {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      margin-bottom: 1rem;

      .product-warranty-data {
        text-align: center;

        .warranty-icon {
          background-color: rgba(220, 220, 220, 0.5);
          border-radius: 50%;
          width: 4rem;
          height: 4rem;
          padding: 0.6rem;
        }
        p {
          font-size: 1.4rem;
          padding-top: 0.4rem;
        }
      }
    }

    .product-data-price {
      font-weight: bold;
    }
    .product-data-real-price {
      color: ${({ theme }) => theme.colors.btn};
    }
    .product-data-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-size: 1.8rem;

      span {
        font-weight: bold;
      }
    }

    hr {
      max-width: 100%;
      width: 90%;
      /* height: 0.2rem; */
      border: 0.1rem solid #000;
      color: red;
    }
  }

  .product-images {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .page_loading {
    font-size: 3.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 0 2.4rem;
  }
`;

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 2rem;
  outline: none;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 500px;
  height: 50vh; // adjusts the height to be 80% of the viewport height
  overflow-y: auto; // enables scrolling on the y-axis

  h3 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 1.6rem;
    margin-bottom: 1rem;
    text-align: left; /* Added to align the order info to the left */
  }
  p strong {
    font-weight: bold;
  }
`;

export default SingleProduct;
