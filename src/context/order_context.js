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
    console.log(orderDto);
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

  const updateOrderItem = async (orderItemDto) => {
    try {
      console.log('Sending request:', orderItemDto);
      axios.put('http://localhost:8080/api/orders/item', orderItemDto)
        .then(response => {
          console.log('Response:', response);
          if (response.status === 200) {
            dispatch({ type: "UPDATE_ORDER_ITEM", payload: response.data });
          }
        })
        .catch(error => {
          console.error('Error from axios:', error);
        });
    } catch (error) {
      console.error('There was an error updating the order item:', error);
    }
};
  const cancelOrderItem = async (itemId) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/orders/${itemId}/cancel`);
      if (response.status === 200) {
        dispatch({ type: "CANCEL_ORDER_ITEM", payload: response.data });
      }
    } catch (error) {
      console.error("There was an error cancelling the order item:", error);
    }
  };


  useEffect(() => {
    if(username && role === 'ROLE_USER'){
      fetchOrders(username);
    } else if(username && role === 'ROLE_SELLER') {
      fetchSellerOrders(username);
    }
  }, [username, role]);

  useEffect(() => {
    console.log(state.userOrders)
  }, [state.userOrders]);

  

  return (
    <OrderContext.Provider
      value={{
        ...state,
        createOrder,
        fetchSellerOrders,
        fetchOrderById, updateOrderItem, fetchOrders,
        cancelOrderItem
      }}>
      {children}
    </OrderContext.Provider>
  );
};

const useOrderContext = () => {
  return useContext(OrderContext);
};

export { OrderProvider, useOrderContext };