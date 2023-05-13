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
  const { username } = useAuthContext();

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
    const response = await axios.get(`http://localhost:8080/api/order/buyer/${username}`);
    if (response.status === 200) {
      dispatch({ type: "LOAD_ORDERS", payload: response.data });
    }
  };

  useEffect(() => {
    fetchOrders(username);
  }, [username]);

  return (
    <OrderContext.Provider
      value={{
        ...state,
        createOrder,
      }}>
      {children}
    </OrderContext.Provider>
  );
};

const useOrderContext = () => {
  return useContext(OrderContext);
};

export { OrderProvider, useOrderContext };