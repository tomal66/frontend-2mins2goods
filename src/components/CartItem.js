import React, { useState } from "react";
import FormatPrice from "../helpers/FormatPrice";
import CartAmountToggle from "./CartAmountToggle";
import { FaTrash } from "react-icons/fa";
import { useCartContext } from "../context/cartcontext";
import ImageCell from "./ImageCell";
import { useNavigate } from "react-router-dom";

const CartItem = ({ itemId, productId, title, image, price, amount, max }) => {
  const { removeItem, setDecrease, setIncrement } = useCartContext();
  const nav = useNavigate();

  const shortTitle = title.length > 25 ? title.substring(0, 25) + '...' : title;

  const goToProduct = (productId) => {
    nav(`/singleproduct/${productId}`);
  }

  return (
    <div className="cart_heading grid grid-five-column">
      <div className="cart-image--name" onClick={()=>goToProduct(productId)}>
        <ImageCell imageId={image}/>
        <div>
          <p>{shortTitle}</p>
        </div>
      </div>
      {/* price   */}
      <div className="cart-hide">
        <p>
          <FormatPrice price={price} />
        </p>
      </div>

      {/* Quantity  */}
      <CartAmountToggle
        amount={amount}
        showButtons={false}
        setDecrease={() => setDecrease()}
        setIncrease={() => setIncrement()}
      />

      {/* //Subtotal */}
      <div className="cart-hide">
        <p>
          <FormatPrice price={price * amount} />
        </p>
      </div>

      <div>
        <FaTrash className="remove_icon" onClick={async () => await removeItem(itemId)} />
      </div>
    </div>
  );
};

export default CartItem;
