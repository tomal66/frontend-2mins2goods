import { useState } from "react";
import styled from "styled-components";
import CartAmountToggle from "./CartAmountToggle";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../styles/Button";
import { useCartContext } from "../context/cartcontext";
import { useAuthContext } from "../context/auth_context";
import Swal from "sweetalert2";

const AddToCart = ({ product }) => {
  const { addToCart, cart } = useCartContext();
  const { isAuthenticated } = useAuthContext(); 

  const { productId, quantity } = product;

  const [amount, setAmount] = useState(1);
  const nav = useNavigate();

  const setDecrease = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };

  const setIncrease = () => {
    amount < quantity ? setAmount(amount + 1) : setAmount(quantity);
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      try{
        addToCart(productId, amount, product);
        console.log(cart);
        Swal.fire({
          title: 'Added to Cart',
          text: 'Your item has been added to the cart.',
          icon: 'success',
          showCancelButton: true,
          confirmButtonColor: '#E6400B',
          cancelButtonColor: '#d33',
          confirmButtonText: 'View Cart',
          cancelButtonText: 'Continue Shopping'
          }).then((result) => {
              if (result.isConfirmed) {
                  nav('/cart'); // redirect to cart page
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                  nav('/products'); // redirect to products page
              }
        });
      } catch(error){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'There was an error adding the item to the cart. Please try again.',
        });
      }
    
    } else {
      Swal.fire({
        title: 'Please login first!',
        text: 'You need to login before adding items to the cart.',
        icon: 'warning',
        confirmButtonText: 'Go to Login',
        confirmButtonColor: '#E6400B',
        cancelButtonText: 'Cancel',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          nav("/login"); // redirect to login page
        }
      });
    }
  };

  return (
    <Wrapper>

      {/* add to cart  */}
      <CartAmountToggle
        amount={amount}
        setDecrease={setDecrease}
        setIncrease={setIncrease}
      />
      <Button className="btn" onClick={handleAddToCart}>Add To Cart</Button>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .colors p {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  /* we can use it as a global one too  */
  .amount-toggle {
    margin-top: 3rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.4rem;

    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }

    .amount-style {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.btn};
    }
  }
`;
export default AddToCart;
