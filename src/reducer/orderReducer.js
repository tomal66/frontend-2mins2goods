const orderReducer = (state, action) => {
    if (action.type === "CREATE_ORDER") {
      return {
        ...state,
        userOrders: [...state.userOrders, action.payload],
      };
    }
  
    if (action.type === "LOAD_ORDERS") {
      return {
        ...state,
        userOrders: action.payload,
      };
    }

    if (action.type === "LOAD_SELLER_ORDERS") {
      return {
        ...state,
        sellerOrders: action.payload,
      };
    }

    if (action.type === "UPDATE_ORDER_ITEM") {
      const updatedSellerOrders = state.sellerOrders.map((order) => 
        order.id === action.payload.id ? action.payload : order
      );
      return {
        ...state,
        sellerOrders: updatedSellerOrders,
      };
    }

    if (action.type === "CANCEL_ORDER_ITEM") {
      const updatedOrders = state.userOrders.map((order) => 
        order.id === action.payload.id ? action.payload : order
      );
      return {
        ...state,
        userOrders: updatedOrders,
      };
    }
  
    return state;
  };
  
  export default orderReducer;