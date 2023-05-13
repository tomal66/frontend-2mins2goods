import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "./auth_context";
import orderReducer from "../reducer/orderReducer";

const OrderContext = createContext();

const initialOrderState = {
  userOrders: [],
  sellerOrders: [],
};

const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialOrderState);
  const { username, role } = useAuthContext();

  const createOrder = async (orderDto) => {
    try {
      const response = await axios.post('http://localhost:8080/api/orders', orderDto);
      if (response.status === 201) {
        dispatch({ type: "CREATE_ORDER", payload: response.data });
      }
    } catch (error) {
      console.error('There was an error creating the order:', error);
    }
  };

  const fetchOrders = async (username) => {
    const response = await axios.get(`http://localhost:8080/api/orders/user/${username}`);
    if (response.status === 200) {
      dispatch({ type: "LOAD_ORDERS", payload: response.data });
    }
  };

  const fetchSellerOrders = async (username) => {
    const response = await axios.get(`http://localhost:8080/api/orders/seller/${username}`);
    if (response.status === 200) {
      dispatch({ type: "LOAD_SELLER_ORDERS", payload: response.data });
    }
  };

  const fetchOrderById = async (orderId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/orders/${orderId}`);
      if (response.status === 200) {
        return response.data; // Return the fetched order
      }
    } catch (error) {
      console.error("There was an error fetching the order:", error);
    }
  };

  useEffect(() => {
    if(username && role === 'ROLE_USER'){
      fetchOrders(username);
    } else if(username && role === 'ROLE_SELLER') {
      fetchSellerOrders(username);
    }
  }, [username, role]);

  

  return (
    <OrderContext.Provider
      value={{
        ...state,
        createOrder,
        fetchSellerOrders,
        fetchOrderById
      }}>
      {children}
    </OrderContext.Provider>
  );
};

const useOrderContext = () => {
  return useContext(OrderContext);
};

export { OrderProvider, useOrderContext };