import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";
import NoProduct from "./NoProduct"

const ProductList = () => {
  const { filter_products, grid_view } = useFilterContext();

  if(filter_products.length===0)
  {
    return <NoProduct/>;
  }

  if (grid_view === true) {
    return <GridView products={filter_products} />;
  }

  if (grid_view === false) {
    return <ListView products={filter_products} />;
  }
};

export default ProductList;
