import axios from "axios";
import { createContext, useContext, useReducer, useState } from "react";
import authReducer from "../reducer/authReducer";

const AuthContext = createContext();

const API = "http://localhost:8080/api/auth/";

const inialState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, inialState);

  const register = async (username, firstname, lastname, password, mobile, email) => {
    try {
      const response = await axios.post(API + "register", {
        username,
        firstname,
        lastname,
        password,
        mobile,
        email,
      });
  
      if (response.data) {
        await login(username, password); // Add 'await' before calling login
      }
  
      return response.data;
    } catch (error) {
      console.log(error.response.data); // Log the error response data
      dispatch({ type: "AUTH_ERROR", payload: error });
    }
  };
  

  const login = async (username, password) => {
    try {
      const response = await axios.post(API + "login", {
        username,
        password,
      });

      if (response.data.accessToken) {
        dispatch({
          type: "LOGIN",
          payload: {
            user: response.data.user,
            accessToken: response.data.accessToken,
          },
        });
      }

      return response.data;
    } catch (error) {
      console.log(error.response.data);
      dispatch({ type: "AUTH_ERROR", payload: error });
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider, AuthContext, useAuthContext };
