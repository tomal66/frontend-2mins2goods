import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/productreducer";
import { useAuthContext } from "./auth_context";

const AppContext = createContext();

const API = "https://api.pujakaitem.com/api/products";
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



    const getProducts = async(url) => {
        dispatch({type: "SET_LOADING"});
        try {
            const res = await axios.get(url);
            const products = await res.data;
            dispatch({ type: "SET_API_DATA", payload: products });
        } catch (error) {
            dispatch({type: "API_ERROR"});
        }
    }

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
      
      
      
      

    useEffect(()=>{
        getProducts(API);
    },[])

    return (
    <AppContext.Provider value={{...state, getSingleProduct, addProduct, getSellerProducts, fetchImage, deleteProduct}}>
        {children}
    </AppContext.Provider>
    )
  };

// custom hooks
const useProductContext = () => {
    return useContext(AppContext);
  };
  

export { AppProvider, AppContext, useProductContext };

