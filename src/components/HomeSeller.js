import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles/Button";

const HomeSeller = () => {
  return (
    <Wrapper>
      <div className="container">
        <div className="grid grid-two-column">
          {/* our homepage image  */}
          <div className="hero-section-image">
            <figure>
              <img
                src="images/seller.jpg"
                alt="seller-photo"
                className="img-style"
              />
            </figure>
          </div>

          <div className="hero-section-data">
            <p className="intro-data">Have something to sell? </p>
            <h1> Become a Seller </h1>
            <p>
              Find customers in your area
            </p>
            <NavLink to="/seller-register">
              <Button>Get Started</Button>
            </NavLink>
          </div>

        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 12rem 0;
  background-color: #ecf7ef;

  img {
    min-width: 10rem;
    height: 10rem;
  }

  .hero-section-data {
    p {
      margin: 2rem 0;
    }

    h1 {
      text-transform: capitalize;
      font-weight: bold;
    }

    .intro-data {
      color: #e6400b;
      margin-bottom: 0;
    }
  }

  .hero-section-image {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;

  }
  figure {
    position: relative;

    &::after {
      content: "";
      width: 60%;
      height: 80%;
      background-color: #EDBB99;
      position: absolute;
      left: 25%;
      top: -3rem;
      z-index: -1;
      border-radius: 20px;
    }
  }
  .img-style {
    width: 80%;
    height: auto;
    border-radius: 20px;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid {
      gap: 10rem;
    }

    figure::after {
      content: "";
      width: 50%;
      height: 100%;
      left: 0;
      top: 10%;
      /* bottom: 10%; */
      background-color: rgba(81, 56, 238, 0.4);
    }
  }
`;

export default HomeSeller