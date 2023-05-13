import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "../reducer/cartReducer";
import axios from "axios";
import { useAuthContext } from "./auth_context";

const CartContext = createContext();

const initialState = {
  cart: [],
  total_item: "",
  total_price: "",
  shipping_fee: 50,
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

  const setDecrease = (id) => {
    dispatch({ type: "SET_DECREMENT", payload: id });
  };

  const setIncrement = (id) => {
    dispatch({ type: "SET_INCREMENT", payload: id });
  };

  // to remove the individual item from cart
  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  // to clear the cart
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
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
        setDecrease,
        setIncrement,
      }}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
