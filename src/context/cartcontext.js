import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "../reducer/cartReducer";
import axios from "axios";
import { useAuthContext } from "./auth_context";

const CartContext = createContext();

const initialState = {
  cart: [],
  total_item: "",
  total_price: "",
  shipping_fee: 20,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const{username} = useAuthContext();


  const addToCart = async (productId, amount, product) => {
    try {
      const response = await axios.post('http://localhost:8080/api/cartitem', {
        productId: productId,
        quantity: amount,
        buyerUsername: username
      });
  
      if (response.status === 201) {
        const itemId = response.data.itemId;
  
        dispatch({ type: "ADD_TO_CART", payload: { itemId, productId, amount, product } });
      }
    } catch (error) {
      console.error('There was an error adding the item to the cart:', error);
    }
  };

  
  const fetchProductDetails = async (productId) => {
    const response = await axios.get(`http://localhost:8080/api/product/${productId}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to fetch product details');
    }
  };

  const fetchCartItems = async (username) => {
    const response = await axios.get(`http://localhost:8080/api/cartitem/buyer/${username}`);
    if (response.status === 200) {
      const cartItems = await Promise.all(response.data.map(async (item) => {
        const product = await fetchProductDetails(item.productId);
        return {
          ...item,
          product,
        };
      }));
      dispatch({ type: "LOAD_CART_ITEMS", payload: cartItems });
    }
  };
  
  

  // increment and decrement the product

  // const increment = async (itemId, productId, amount) => {
  //   try {
  //     const updatedCartItem = {
  //       itemId,
  //       amount: amount + 1,
  //       productId,
  //       buyerUsername: state.username
  //     };
  //     const response = await axios.put(`http://localhost:8080/api/cartitem`, updatedCartItem);
  //     if (response.status === 200) {
  //       console.log("Incremented quantity successfully");
  //     }
  //   } catch (error) {
  //     console.error("Error incrementing item quantity:", error);
  //   }
  // };
  
  // const decrement = async (itemId, productId, amount) => {
  //   try {
  //     const updatedCartItem = {
  //       itemId,
  //       amount: amount - 1,
  //       productId,
  //       buyerUsername: state.username
  //     };
  //     const response = await axios.put(`http://localhost:8080/api/cartitem`, updatedCartItem);
  //     if (response.status === 200) {
  //       console.log("Decremented quantity successfully");
  //     }
  //   } catch (error) {
  //     console.error("Error decrementing item quantity:", error);
  //   }
  // };
  

  // const setDecrease = async (itemId, productId, amount) => {
  //   if (amount > 1) {
  //     try {
  //       await decrement(itemId, productId, amount);
  //       dispatch({ type: "SET_DECREMENT", payload: itemId });
  //     } catch (error) {
  //       console.error("Error decrementing item quantity:", error);
  //     }
  //   }
  // };
  
  // const setIncrement = async (itemId, productId, amount, max) => {
  //   if (amount < max) {
  //     try {
  //       await increment(itemId, productId, amount);
  //       dispatch({ type: "SET_INCREMENT", payload: itemId });
  //     } catch (error) {
  //       console.error("Error incrementing item quantity:", error);
  //     }
  //   }
  // };
  

  // to remove the individual item from cart
  const removeItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:8080/api/cartitem/${itemId}`);
      dispatch({ type: "REMOVE_ITEM", payload: itemId });
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // to clear the cart
  const clearCart = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/cartitem/buyer/${username}`);
      dispatch({ type: "CLEAR_CART" });
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };
  

  // to add the data in localStorage
  // get vs set

  useEffect(() => {
    // dispatch({ type: "CART_TOTAL_ITEM" });
    // dispatch({ type: "CART_TOTAL_PRICE" });
    dispatch({ type: "CART_ITEM_PRICE_TOTAL" });

    //localStorage.setItem("2m2gcart", JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    fetchCartItems(username); // replace 'testUser' with actual username
  }, [username]);
  

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        clearCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
