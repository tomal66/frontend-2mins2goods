import React, { useEffect, useState } from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";
import NoProduct from "./NoProduct"
import { Pagination } from "@mui/material";
import { useLocation } from "react-router-dom";

const ProductList = () => { 
  const { filter_products, grid_view } = useFilterContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(6);
  const lastProductIndex = currentPage*productsPerPage;
  const firstProductIndex = lastProductIndex-productsPerPage;
  const currentProducts = filter_products.slice(firstProductIndex, lastProductIndex);

  
  useEffect(() => {
    console.log(filter_products);
  }, []);

  if(currentProducts.length===0)
  {
    const data = {
      prompt: "No products found",
    }
    return <NoProduct myData={data}/>;
  }

  if (grid_view === true) {
    return (
      <>
        <GridView products={currentProducts} />
        <Pagination 
          count={Math.ceil(filter_products.length/productsPerPage)} 
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
        />
      </>
    
    );
  }

  if (grid_view === false) {
    return (
      <>
        <ListView products={currentProducts} />
        <Pagination 
          count={Math.ceil(filter_products.length/productsPerPage)} 
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
        />
      </>
    
    );
  }
};

export default ProductList;
