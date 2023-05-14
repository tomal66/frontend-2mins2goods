import styled from "styled-components";
import { useCartContext } from "./context/cartcontext";
import CartItem from "./components/CartItem";
import { NavLink } from "react-router-dom";
import { Button } from "./styles/Button";
import FormatPrice from "./helpers/FormatPrice";
import NoProduct from "./components/NoProduct";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useAuthContext } from "./context/auth_context";
import { useOrderContext } from "./context/order_context";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, clearCart, total_price, shipping_fee ,fetchCartItems } = useCartContext();
  const { username } = useAuthContext();
  const multipleSellers = new Set(cart.map(item => item.seller)).size > 1;
  const { createOrder } = useOrderContext();
  const [deliveryOption, setDeliveryOption] = useState('pickup'); // default option
  const nav = useNavigate();

  const handleDeliveryOptionChange = (e) => {

    if (multipleSellers && e.target.value === 'cod') {
      Swal.fire({
        title: 'Unavailable!',
        text: 'Cash on Delivery is not available for products from multiple sellers.',
        icon: 'warning',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#E6400B',
      })
      
      return;
    }
    setDeliveryOption(e.target.value);
  }
  

  if (cart.length === 0) {
    const data = {
      prompt: "No item in cart",
    }
    return (
      <NoProduct myData={data}/>
    );
  }

  const placeOrder = async() => {
    const orderDTO = {
      orderItems: cart.map(item => ({
        quantity: item.amount,
        productId: item.productId,
        status: 'Pending',
      })),
      deliveryMethod: deliveryOption,
      // subtotal: total_price,
      // platformFee: shipping_fee,
      total: shipping_fee + total_price,
      buyerUsername: username
      // add other necessary order details, e.g., customer information
    };
    
    // Here you would typically send this DTO to your server or another process
    await createOrder(orderDTO);
    Swal.fire({
      title: 'Success!',
      text: 'Your order has been placed!',
      icon: 'success',
      confirmButtonColor: '#E6400B',
      confirmButtonText: 'Back to Home',
      }).then((result) => {
          if (result.isConfirmed) {
              fetchCartItems(username);
              nav('/'); // redirect to home
          }
    });
  }

  return (
    <Wrapper>
      <div className="container">
        <div className="cart_heading grid grid-five-column">
          <p>Item</p>
          <p className="cart-hide">Price</p>
          <p>Quantity</p>
          <p className="cart-hide">Subtotal</p>
          <p>Remove</p>
        </div>
        <hr />
        <div className="cart-item">
          {cart.map((curElem) => {
            return <CartItem key={curElem.id} {...curElem} />;
          })}
        </div>
        <hr />
        <div className="cart-two-button">
          <NavLink to="/products">
            <Button> continue Shopping </Button>
          </NavLink>
          <Button className="btn btn-clear" onClick={clearCart}>
            clear cart
          </Button>
        </div>
        <div className="order-section">
          <DeliveryOptionCard>
            <h4>Delivery Options:</h4>
            <div>
              <input
                type="radio"
                id="cash-on-delivery"
                name="delivery-option"
                value="cod"
                checked={deliveryOption === 'cod'}
                onChange={handleDeliveryOptionChange}
              />
              <label htmlFor="cash-on-delivery">Cash on Delivery</label>
            </div>
            <div>
              <input
                type="radio"
                id="pickup"
                name="delivery-option"
                value="pickup"
                checked={deliveryOption === 'pickup'}
                onChange={handleDeliveryOptionChange}
              />
              <label htmlFor="pickup">Pickup</label>
            </div>
          </DeliveryOptionCard>
          {/* order total_amount */}
        <div className="order-total--amount">
          <div className="order-total--subdata">
            <div>
              <p>subtotal:</p>
              <p>
                <FormatPrice price={total_price} />
              </p>
            </div>
            <div>
              <p>platform fee:</p>
              <p>
                <FormatPrice price={shipping_fee} />
              </p>
            </div>
            <hr />
            <div>
              <p>order total:</p>
              <p>
                <FormatPrice price={shipping_fee + total_price} />
              </p>
            </div>
            <Button className="btn" onClick={placeOrder}>
            Place Order
          </Button>
          </div>
          
        </div>
        </div>
      </div>
    </Wrapper>
  );
};

const EmptyDiv = styled.div`
  display: grid;
  place-items: center;
  height: 50vh;

  h3 {
    font-size: 4.2rem;
    text-transform: capitalize;
    font-weight: 300;
  }
`;

const DeliveryOptionCard = styled.div`
  background: #fafafa; // match with other cards
  border: 0.1rem solid #f0f0f0;
  padding: 3.2rem;
  margin-right: 1rem;
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  width: 45%; // adjust width
  height: 20rem; // adjust height

  h4 {
    margin-bottom: 0.5rem;
    font-size: 2.4rem;
    font-weight: 600;
  }

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  label {
    font-size: 1.4rem;
  }
`;


const Wrapper = styled.section`
  padding: 9rem 0;

  .grid-four-column {
    grid-template-columns: repeat(4, 1fr);
  }

  .grid-five-column {
    grid-template-columns: repeat(4, 1fr) 0.3fr;
    text-align: center;
    align-items: center;
  }
  .cart-heading {
    text-align: center;
    text-transform: uppercase;
  }
  hr {
    margin-top: 1rem;
  }
  .cart-item {
    padding: 3.2rem 0;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
  }

  .cart-user--profile {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1.2rem;
    margin-bottom: 5.4rem;

    img {
      width: 8rem;
      height: 8rem;
      border-radius: 50%;
    }
    h2 {
      font-size: 2.4rem;
    }
  }
  .cart-user--name {
    text-transform: capitalize;
  }
  .cart-image--name {
    /* background-color: red; */
    align-items: center;
    display: grid;
    gap: 1rem;
    grid-template-columns: 0.4fr 1fr;
    text-transform: capitalize;
    text-align: left;
    img {
      max-width: 5rem;
      height: 5rem;
      object-fit: contain;
      color: transparent;
    }

    .color-div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 1rem;

      .color-style {
        width: 1.4rem;
        height: 1.4rem;

        border-radius: 50%;
      }
    }
  }

  .cart-two-button {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;

    .btn-clear {
      background-color: #e74c3c;
    }
  }

  .amount-toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.4rem;
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

  .remove_icon {
    font-size: 1.6rem;
    color: #e74c3c;
    cursor: pointer;
  }
  
  .order-section {
    display: flex;
    justify-content: space-between;
    margin: 4.8rem 0;
  }

  .order-total--amount {
    width: 100%;
    margin: 4.8rem 0;
    text-transform: capitalize;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;

    .order-total--subdata {
      border: 0.1rem solid #f0f0f0;
      display: flex;
      flex-direction: column;
      gap: 1.8rem;
      padding: 3.2rem;
    }
    div {
      display: flex;
      gap: 3.2rem;
      justify-content: space-between;
    }

    div:last-child {
      background-color: #fafafa;
    }

    div p:last-child {
      font-weight: bold;
      color: ${({ theme }) => theme.colors.heading};
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-five-column {
      grid-template-columns: 1.5fr 1fr 0.5fr;
    }
    .cart-hide {
      display: none;
    }

    .cart-two-button {
      margin-top: 2rem;
      display: flex;
      justify-content: space-between;
      gap: 2.2rem;
    }

    .order-total--amount {
      width: 100%;
      text-transform: capitalize;
      justify-content: flex-start;
      align-items: flex-start;

      .btn2 {
      margin: 2rem 0;
      background-color: rgb(0 0 0 / 0%);
      border: 0.1rem solid #E6400B;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #E6400B;

      &:hover {
        background-color: #E6400B;
      }

      &:hover a {
        color: #fff;
      }
      a {
        color: #E6400B;
        font-size: 1.4rem;
      }
    }

      .order-total--subdata {
        width: 100%;
        border: 0.1rem solid #f0f0f0;
        display: flex;
        flex-direction: column;
        gap: 1.8rem;
        padding: 3.2rem;
      }
    }
  }
`;

export default Cart;
