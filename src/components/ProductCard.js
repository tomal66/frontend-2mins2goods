import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import FormatPrice from "../helpers/FormatPrice";
import { useProductContext } from "../context/productcontext";

const ProductCard = (curElem) => {
  const { productId, title, images, price, category } = curElem;
  const { fetchImage } = useProductContext();
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const imageURL = await fetchImage(images[0]);
        setImageSrc(imageURL);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    if (images[0]) {
      fetchImageData();
    }
  }, [images[0], fetchImage]);

  const shortTitle = title.length > 12 ? title.substring(0, 12) + '...' : title;
  return (
    <NavLink to={`/singleproduct/${productId}`}>
      <div className="card">
        <figure> 
          <img src={imageSrc} alt={images[0]} />
          <figcaption className="caption">{category}</figcaption>
        </figure>

        <div className="card-data">
          <div className="card-data-flex">
            <h3>{shortTitle}</h3>
            <p className="card-data--price">{<FormatPrice price={price} />}</p>
          </div>
        </div>
      </div>
    </NavLink>
  );
};



export default ProductCard;