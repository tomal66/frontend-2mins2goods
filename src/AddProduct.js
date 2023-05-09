import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useProductContext } from './context/productcontext';
import { useAuthContext } from './context/auth_context';
import useGeoLocation from './helpers/useGeoLocation';

const AddProduct = () => {
    const nav = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [images, setImages] = useState([]);
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const { addProduct } = useProductContext();
    const {username} = useAuthContext();
    const location = useGeoLocation();

    useEffect(() => {
        if (location.loaded && !location.error) {
          setLatitude(location.coordinates.lat);
          setLongitude(location.coordinates.long);
        }
      }, [location, setLatitude, setLongitude]);

  
    const handleSubmit = async (e) => {
      e.preventDefault();

      const productData = {
        title,
        description,
        price,
        quantity,
        latitude,
        longitude,
        sellerUsername: username,
        category,
      };

      console.log(productData);
      try{
        await addProduct(productData, images);
        Swal.fire({
            title: 'Success',
            text: 'Product Added!',
            icon: 'success',
            confirmButtonColor: '#E6400B',
            confirmButtonText: 'Done',
            heightAuto: true,
          }).then((result) => {
            if (result.isConfirmed) {
              nav('/seller-dashboard'); // Replace '/' with the desired path
            }
          });
      } catch(error){
        Swal.fire({
            title: 'Error',
            text: 'Failed to add product',
            icon: 'error',
            confirmButtonText: 'Try Again',
            heightAuto: true,
          });
      }
      //nav('/');
    };
  
    const handleNext = () => {
      if (title && description && price && quantity && category) {
        setCurrentStep(2);
      } else {
        alert('Please fill in all the required fields');
      }
    };
  
    const handleImageChange = (e, index) => {
      const newImages = [...images];
      newImages[index] = e.target.files[0];
      setImages(newImages);
    };
  
    return (
      <Wrapper>
        <Container>
          <Title>Add Product</Title>
  
          {currentStep === 1 && (
            <Form onSubmit={(e) => {
              e.preventDefault();
              handleNext();
            }}>
                <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <Label htmlFor="desctiption">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                />
                <Label htmlFor="price">Unit Price</Label>
              <Input
                type="number"
                id="price"
                name="price"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                type="number"
                id="quantity"
                name="quantity"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
              <Label htmlFor="category">Category</Label>
              <Select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                >
                <option value="">Select a category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Home & Garden">Home & Garden</option>
                <option value="Sports & Outdoors">Sports & Outdoors</option>
                <option value="Health & Beauty">Health & Beauty</option>
                <option value="Toys & Hobbies">Toys & Hobbies</option>
                <option value="Automotive">Automotive</option>
                <option value="Books & Media">Books & Media</option>
            </Select>
              <Button type="submit">Next</Button>
            </Form>
          )}
  
          {currentStep === 2 && (
            <Form onSubmit={handleSubmit}>
                <Label htmlFor="desctiption">Images</Label>
              {Array.from({ length: 4 }, (_, index) => (
                <Input
                  key={index}
                  type="file"
                  id={`image-${index}`}
                  name={`image-${index}`}
                  onChange={(e) => handleImageChange(e, index)}
                  required
                />
              ))}
              <Button type="submit">Add Product</Button>
            </Form>
          )}
  
          <Options>
            {currentStep === 1 && (
              <Option onClick={() => nav('/')}>Cancel</Option>
            )}
            {currentStep === 2 && (
              <Option onClick={() => setCurrentStep(1)}>Back</Option>
            )}
          </Options>
        </Container>
        </Wrapper>
);
};

const Select = styled.select`
  display: block;
  width: 100%;
  padding: 1rem;
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 3px;
  margin-bottom: 1rem;
  outline: none;
  text-transform: none;
  &:focus {
    border-color: ${({ theme }) => theme.colors.helper};
  }
`;

const Textarea = styled.textarea`
  display: block;
  width: 100%;
  padding: 1rem;
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 3px;
  margin-bottom: 1rem;
  outline: none;
  text-transform: none;
  resize: vertical; // Allows vertical resizing of textarea
  min-height: 150px; // Adjust height as needed

  &:focus {
    border-color: ${({ theme }) => theme.colors.helper};
  }
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  margin-bottom: 0.5rem;
  align-self: flex-start;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.bg};
`;

const Alert = styled.div`
  width: 100%;
  padding: 1rem;
  background-color: #f8d7da;
  color: #721c24;
  text-align: center;
  border: 1px solid #f5c6cb;
  border-radius: 3px;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 4rem;
  background-color: #fff;
  border-radius: 15px;
  margin-top: 10rem;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
`;

const Title = styled.h1`
  font-size: 24px;
  color: #474747;
  text-align: center;
  margin-bottom: 3rem;
`;

const Form = styled.form`
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  display: block;
  width: 100%;
padding: 1rem;
font-size: 16px;
border: 1px solid ${({ theme }) => theme.colors.border};
border-radius: 3px;
margin-bottom: 1rem;
outline: none;
text-transform: none;
&:focus {
border-color: ${({ theme }) => theme.colors.helper};
}
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 0.75rem;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.btn};
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;

  &:hover,
  &:active {
    box-shadow: 0 2rem 2rem 0 rgb(132 144 255 / 30%);
    box-shadow: ${({ theme }) => theme.colors.shadowSupport};
    transform: scale(0.96);
  }

`;

const Options = styled.div`
    margin-top: 3rem; 
    display: flex; 
    justify-content: center;
`;

const Option = styled.a`
font-size: 14px;
color: ${({ theme }) => theme.colors.helper};
text-decoration: none;
cursor: pointer;

&:hover {
text-decoration: underline;
}
`;

export default AddProduct