import React, { useState } from "react";
import {FaUserAlt} from "react-icons/fa"
import styled from "styled-components";

const DropDownContainer = styled.div`
  position: relative;
  display: inline-block;

  .profile-icon{
    position: relative;
    font-size: 2.2rem;
  }
`;


const DropDownMenu = styled.div`
  display: ${({ show }) => (show ? "block" : "none")};
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 4px;
  padding: 8px 0;
`;

const MenuItem = styled.a`
  display: block;
  padding: 8px 16px;
  text-decoration: none;
  color: #333;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const DropDownProfile = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <DropDownContainer>
      <FaUserAlt className="profile-icon" onClick={toggleMenu}/>
      <DropDownMenu show={showMenu}>
        <MenuItem href="#edit-profile">Edit Profile</MenuItem>
        <MenuItem href="#orders">Orders</MenuItem>
        <MenuItem href="#logout">Logout</MenuItem>
      </DropDownMenu>
    </DropDownContainer>
  );
};

export default DropDownProfile;
