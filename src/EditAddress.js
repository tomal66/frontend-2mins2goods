import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuthContext } from './context/auth_context';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {useUserContext} from './context/user_context';
import useGeoLocation from './helpers/useGeoLocation';

const EditAddress = () => {
  const { register, isAuthenticated, error } = useAuthContext();
  const nav = useNavigate();

  const [address, setAddress] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState(''); 
  const [country, setCountry] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const location = useGeoLocation();

  const [message, setMessage] = useState('');

  const {user, updateUserAddress} = useUserContext();

  useEffect(() => {
    if (user) {
        setAddress(user.address.address);
        setZipcode(user.address.zipcode);
        setCity(user.address.city)
        setState(user.address.state)
        setCountry(user.address.country)
        setLatitude(user.address.latitude)
        setLongitude(user.address.longitude)
    }
  }, [user]);

  const isLocationLoaded = () => {
    return location.loaded;
  };

  useEffect(() => {
    setMessage('');
    if (location.loaded && !location.error) {
    }
  }, [location]);
  



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (location.loaded && !location.error) {
        setLatitude(location.coordinates.lat);
        setLongitude(location.coordinates.long);
    }
    try {
        
        await updateUserAddress(user.username, {
            address: address,
            country: country,
            zipcode: zipcode,
            city: city,
            longitude: longitude,
            latitude: latitude,
            state: state
          });
      Swal.fire({
        title: 'Updated!',
        text: 'Your profile has been updated.',
        icon: 'success',
        confirmButtonColor: '#E6400B', // change the button color here
        confirmButtonText: 'Okay'
      }).then((result) => {
        if (result.isConfirmed) {
          nav('/'); // navigate to home page
        }
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'There was an error updating your profile.',
        icon: 'error',
        confirmButtonColor: '#d33', // change the button color here
        confirmButtonText: 'Okay'
      });
    }
  };
  
  
  
  useEffect(() => {
    if(error){
      setMessage("Username already taken!")
    }
  }, [error, setMessage])

  useEffect(() => {
    setMessage('');
  }, []);


  return (
    <Wrapper>
      <Container>
        <Title>Edit Address</Title>
        {
          message && (
            <Alert>
              {message}
            </Alert>
          )
        }

        <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              id="address"
              name="address"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <Input
          type="text"
          id="zipcode"
          name="zipcode"
          placeholder="Zipcode"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
          required
        />
        <Input
          type="text"
          id="city"
          name="city"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <Input
          type="text"
          id="state"
          name="state"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
        <Input
          type="text"
          id="country"
          name="country"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
        <Input
          type="text"
          id="latitude"
          name="latitude"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          required
          readOnly
        />
        <Input
          type="text"
          id="longitude"
          name="longitude"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          required
          readonly
        />
        <Button type="submit">Update</Button>
      </Form>

  </Container>
</Wrapper>
  );
}


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

export default EditAddress