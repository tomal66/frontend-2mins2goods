const ProductReducer = (state, action) => {
  
    switch (action.type) {
      case "SET_LOADING":
        return {
          ...state,
          isLoading: true,
        };
  
      case "SET_API_DATA":
        const sortedData = action.payload.sort((a, b) => {
          return b.productId - a.productId; // sort in descending order of productId
        });
      
        const featureData = sortedData.slice(0, 3); // take the first three items
      
  
        return {
          ...state,
          isLoading: false,
          products: action.payload,
          featureProducts: featureData,
        };
  
      case "API_ERROR":
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
  
      case "SET_SINGLE_LOADING":
        return {
          ...state,
          isSingleLoading: true,
        };
  
      case "SET_SINGLE_PRODUCT":
        return {
          ...state,
          isSingleLoading: false,
          singleProduct: action.payload,
        }; 
  
      case "SET_SINGLE_ERROR":
        return {
          ...state,
          isSingleLoading: false,
          isError: true,
        };

      case "ADD_PRODUCT":
        return {
          ...state,
          products: [...state.products, action.payload],
        };
        
      case "SET_SELLER_PRODUCTS":
        return {
          ...state,
          sellerProducts: action.payload,
        };

      case "EDIT_PRODUCT":
        const updatedProducts = state.products.map(product => 
            product.id === action.payload.productId ? action.payload.updatedProduct : product
        );
        return { ...state, products: updatedProducts };

      case "DELETE_PRODUCT":
        return {
          ...state,
          sellerProducts: state.sellerProducts.filter(
            (product) => product.productId !== action.payload
          ),
        };
        
      default:
        return state;
    }
  };
  
  export default ProductReducer;
  