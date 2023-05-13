import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";


const CartAmountToggle = ({ amount, setDecrease, setIncrease, showButtons = true }) => {
  return (
    <div className="cart-button">
      <div className="amount-toggle">
        {showButtons && (
          <button onClick={() => setDecrease()}>
            <FaMinus />
          </button>
        )}
        <div className="amount-style">{amount}</div>
        {showButtons && (
          <button onClick={() => setIncrease()}>
            <FaPlus />
          </button>
        )}
      </div>
    </div>
  );
};

export default CartAmountToggle;
