import { useState, useEffect } from "react";
import { useProductContext } from "../context/productcontext";

const ImageCell = ({ imageId }) => {
  const { fetchImage } = useProductContext();
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const imageURL = await fetchImage(imageId);
        setImageSrc(imageURL);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    if (imageId) {
      fetchImageData();
    }
  }, [imageId, fetchImage]);

  return (
    <div className="image-wrapper">
      {imageSrc ? (
        <img src={imageSrc} alt={`Product image ${imageId}`} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ImageCell