import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuthContext } from './context/auth_context';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {useUserContext} from './context/user_context';

const EditProfile = () => {
  const { register, isAuthenticated, error } = useAuthContext();
  const nav = useNavigate();

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');

  const [message, setMessage] = useState('');

  const {user, updateUser} = useUserContext();

  useEffect(() => {
    if (user) {
      setFirstname(user.firstname || '');
      setLastname(user.lastname || '');
      setEmail(user.email || '');
      setMobile(user.mobile || '');
    }
  }, [user]);
  



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser({
        username: user.username,
        firstname: firstname,
        lastname: lastname,
        mobile: mobile,
        email: email,
        role: user.role, // Make sure this value is set appropriately
        address: user.address,
        active: user.active // This might need to be dynamic based on your application
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
        <Title>Edit Profile</Title>
        {
          message && (
            <Alert>
              {message}
            </Alert>
          )
        }

          <Form onSubmit={(e) => {
            handleSubmit(e);
          }}>
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
              type="tel"
              id="mobile"
              name="mobile"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
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

export default EditProfile