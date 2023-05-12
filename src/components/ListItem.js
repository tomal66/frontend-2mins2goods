import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import FormatPrice from "../helpers/FormatPrice";
import { useProductContext } from "../context/productcontext";
import { Button } from "../styles/Button";

const ListItem = (curElem) => {
    const { productId, title, images, price, category, description } = curElem;
    const { fetchImage } = useProductContext();
    const [imageSrc, setImageSrc] = useState(null);

    const shortTitle = title.length > 30 ? title.substring(0, 30) + '...' : title;

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

    return (
      <div className="card grid grid-two-column">
        <figure>
          <img src={imageSrc} alt={shortTitle} />
        </figure>

        <div className="card-data">
          <h3>{shortTitle}</h3>
          <p>
            <FormatPrice price={price} />
          </p>
          <p>{description.slice(0, 90)}...</p>

          <NavLink to={`/singleproduct/${productId}`} className="btn-main">
            <Button className="btn">Read More</Button>
          </NavLink>
        </div>
      </div>
    );
};

export default ListItem;
