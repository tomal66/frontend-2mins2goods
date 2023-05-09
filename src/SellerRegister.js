import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuthContext } from './context/auth_context';
import { NavLink, useNavigate } from 'react-router-dom';
import useGeoLocation from './helpers/useGeoLocation';

const SellerRegister = () => {
  const { register, isAuthenticated, error } = useAuthContext();
  const nav = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      nav("/");
    }
  }, [isAuthenticated, nav]);

  const [currentStep, setCurrentStep] = useState(1);
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('ROLE_SELLER');
  const [address, setAddress] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const location = useGeoLocation();

  const [message, setMessage] = useState('');

  const doPasswordsMatch = () => {
    return password === confirmPassword;
  };

  const isLocationLoaded = () => {
    return location.loaded;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (doPasswordsMatch()) {

      if(isLocationLoaded){
        register(username, firstname, lastname, password, mobile, email, role, address, zipcode, city, state, country, latitude, longitude);
        console.log('Username:', username, 'Firstname:', firstname, 'Lastname:', lastname, 'Password:', password, 'Mobile:', mobile, 'Email:', email);
      }
      else{
        setMessage("Can't retrieve your location!");
      }
      
    } else {
      // Error alert message if the passwords don't match
      setMessage("Passwords do not match!")
    }
  };

  const handleNext = () => {
    if (username && email && password && password.length >= 8 && doPasswordsMatch()) {
      setCurrentStep(2);
      setMessage("");
    } else {
      // Error alert message if any of the required fields are missing or invalid
      if (!username) setMessage("Please enter a username!");
      else if (!email) setMessage("Please enter an email address!");
      else if (!password) setMessage("Please enter a password!");
      else if (password.length < 8) setMessage("Password must be at least 8 characters long!");
      else if (!doPasswordsMatch()) setMessage("Passwords do not match!");
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

  useEffect(() => {
    setMessage('');
    if (location.loaded && !location.error) {
      setLatitude(location.coordinates.lat);
      setLongitude(location.coordinates.long);
    }
  }, [location, setLatitude, setLongitude]);

  useEffect(() => {
    if (isAuthenticated) {
      nav("/seller-dashboard");
    }
  }, [isAuthenticated, nav]);

  return (
    <Wrapper>
      <Container>
        <Title>Register - Seller</Title>
        {
          message && (
            <Alert>
              {message}
            </Alert>
          )
        }

        {currentStep === 1 && (
          <Form onSubmit={(e) => {
            e.preventDefault();
            handleNext();
          }}>
            <Input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input
              type="text"
              id="firstname"
              name="firstname"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
            <Input
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button type="submit">Next</Button>
          </Form>
        )}

        {currentStep === 2 && (
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
        <Button type="submit">Register</Button>
      </Form>
    )}

    <Options>
      {currentStep === 1 && (
        <Option onClick={() => nav("/login")}>Already have an account? Sign In</Option>
      )}
      {currentStep === 2 && (
        <Option onClick={() => setCurrentStep(1)}>Back</Option>
      )}
    </Options>
  </Container>
</Wrapper>
  );
};

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

export default SellerRegister;
