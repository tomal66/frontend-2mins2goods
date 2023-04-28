const authReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        localStorage.setItem("accessToken", action.payload.accessToken);
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload.user,
          error: null,
        };
      case "LOGOUT":
        localStorage.removeItem("accessToken");
        return {
          ...state,
          isAuthenticated: false,
          user: null,
        };
      case "AUTH_ERROR":
        localStorage.setItem("accessToken", null);
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  