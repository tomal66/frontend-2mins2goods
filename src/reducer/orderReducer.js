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
        orders: action.payload,
      };
    }
  
    return state;
  };
  
  export default orderReducer;