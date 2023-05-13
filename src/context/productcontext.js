import axios from "axios";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import reducer from "../reducer/productreducer";
import { useAuthContext } from "./auth_context";
import useGeoLocation from "../helpers/useGeoLocation";
import { useUserContext } from "./user_context";

const AppContext = createContext();

const API = "http://localhost:8080/api/product/nearby";
const ADD_PRODUCT_API = "http://localhost:8080/api/product/add";
const SELLER_PRODUCTS_API = "http://localhost:8080/api/product/seller"

const inialState = {
    isLoading: false,
    isError: false,
    products:[],
    sellerProducts: [],
    featureProducts:[],
    isSingleLoading: false, 
    singleProduct: {}, 
}

const AppProvider = ({ children }) => {
 
    const [state, dispatch] = useReducer(reducer, inialState);
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const location = useGeoLocation();
    const { username } = useAuthContext(); // Get the username from AuthContext
    const { user } = useUserContext(); // Get the user data from UserContext
  
  

    useEffect(() => {
      if (username && user) { // If user is logged in, get their saved location
        setLatitude(user.address.latitude);
        setLongitude(user.address.longitude);
        console.log(user);
      } else if (location.loaded && !location.error) { // If user is not logged in, get their current location
        setLatitude(location.coordinates.lat);
        setLongitude(location.coordinates.long);
      }
    }, [location, username, user, setLatitude, setLongitude]);



    const getProducts = async(url, latitude, longitude) => {
      dispatch({type: "SET_LOADING"});
      try {
          const res = await axios.get(`${url}?latitude=${latitude}&longitude=${longitude}`);
          const products = await res.data;
          
          dispatch({ type: "SET_API_DATA", payload: products });
      } catch (error) {
          dispatch({type: "API_ERROR"});
      }
    };
  

    //Single Product API call
    const getSingleProduct = async (url) => {
        dispatch({ type: "SET_SINGLE_LOADING" });
        try {
          const res = await axios.get(url);
          const singleProduct = await res.data;
          dispatch({ type: "SET_SINGLE_PRODUCT", payload: singleProduct });
        } catch (error) {
          dispatch({ type: "SET_SINGLE_ERROR" });
        }
      };

      const addProduct = async (productData, images) => {
        try {
          const formData = new FormData();
      
          formData.append('product', new Blob([JSON.stringify(productData)], { type: 'application/json' }));
      
          images.forEach((image, index) => {
            formData.append(`images`, image);
          });
      
          await axios.post(ADD_PRODUCT_API, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
      
          dispatch({ type: "ADD_PRODUCT", payload: productData });
        } catch (error) {
          console.error("Error adding product:", error);
        }
      };

    const editProduct = async (productId, updatedProductData) => {
      try {
          const response = await axios.put(`http://localhost:8080/api/product/${productId}`, updatedProductData);
    
          dispatch({ type: "EDIT_PRODUCT", payload: {productId, updatedProduct: response.data} });
      } catch (error) {
          console.error("Error editing product:", error);
      }

    };
    

      const deleteProduct = async (productId) => {
        try {
          await axios.delete(`http://localhost:8080/api/product/${productId}`);
      
          dispatch({ type: "DELETE_PRODUCT", payload: productId });
        } catch (error) {
          console.error("Error deleting product:", error);
        }
      };
      
      
      const getSellerProducts = async (seller) => {
        try {
          const response = await axios.get(SELLER_PRODUCTS_API, {
            params: { seller },
          });
      
          dispatch({ type: "SET_SELLER_PRODUCTS", payload: response.data });
        } catch (error) {
          console.error("Error getting seller's products:", error);
        }
      };

      const fetchImage = async (imageId) => {
        try {
          const response = await axios.get("http://localhost:8080/api/image/download", {
            params: { imageId },
            responseType: "blob",
          });
          const imageURL = URL.createObjectURL(response.data);
          return imageURL;
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      };

      const fetchProduct = async (productId) => {
        try {
          const response = await axios.get(`http://localhost:8080/api/product/${productId}`);
          return response.data;
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };
      
      
      useEffect(() => {
        if (latitude && longitude) {
            getProducts(API, latitude, longitude);
        }
    }, [latitude, longitude]);
    

    return (
    <AppContext.Provider value={{...state, getSingleProduct, addProduct, getSellerProducts, fetchImage, deleteProduct, editProduct, fetchProduct}}>
        {children}
    </AppContext.Provider>
    )
  };

// custom hooks
const useProductContext = () => {
    return useContext(AppContext);
  };
  

export { AppProvider, AppContext, useProductContext };

