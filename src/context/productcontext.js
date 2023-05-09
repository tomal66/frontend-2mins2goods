import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/productreducer";

const AppContext = createContext();

const API = "https://api.pujakaitem.com/api/products";
const ADD_PRODUCT_API = "http://localhost:8080/api/product/add";

const inialState = {
    isLoading: false,
    isError: false,
    products:[],
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
      
      
      

    useEffect(()=>{
        getProducts(API);
    },[])

    return (
    <AppContext.Provider value={{...state, getSingleProduct, addProduct}}>
        {children}
    </AppContext.Provider>
    )
  };

// custom hooks
const useProductContext = () => {
    return useContext(AppContext);
  };
  

export { AppProvider, AppContext, useProductContext };

