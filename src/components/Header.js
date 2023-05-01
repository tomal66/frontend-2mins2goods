import React from 'react'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Nav from './Nav';
import SellerNav from './SellerNav';
import { useAuthContext } from '../context/auth_context';

const Header = () => {
  const { role } = useAuthContext();

  return (
    <MainHeader>
        <NavLink to="/">
        <img src="./images/logo.png" alt="2mins2goods" />
      </NavLink>
      {role === "ROLE_SELLER" ? <SellerNav /> : <Nav />}
    </MainHeader>
  )
}

const MainHeader = styled.header`
  padding: 0 4.8rem;
  height: 10rem;
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .logo {
    height: 5rem;
  }
`;

export default Header