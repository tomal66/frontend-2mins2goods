import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FiShoppingCart } from "react-icons/fi";
import { CgMenu, CgClose } from "react-icons/cg";
import { useCartContext } from "../context/cartcontext";
import { Button } from "../styles/Button";
import { useAuthContext } from "../context/auth_context";
import { FaUserAlt } from "react-icons/fa";


const AdminNav = () => {

    const [menuIcon, setMenuIcon] = useState();
    const {isAuthenticated, logout} = useAuthContext(); 
    const [showDropDown, setShowDropDown] = useState(false);
    const nav = useNavigate();

    const handleDropdownToggle = () => {
      setShowDropDown(!showDropDown);
    };

  return (
    <Nav>
      <div className={menuIcon ? "navbar active" : "navbar"}>
        <ul className="navbar-lists">
          <li>
            <NavLink
              to="/admin-dashboard"
              className="navbar-link "
              onClick={() => setMenuIcon(false)}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/users"
              className="navbar-link "
              onClick={() => setMenuIcon(false)}>
              Users
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/allProducts"
              className="navbar-link "
              onClick={() => setMenuIcon(false)}>
              Products
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/allOrders"
              className="navbar-link "
              onClick={() => setMenuIcon(false)}>
              Orders
            </NavLink>
          </li>

          {isAuthenticated ? (
            <li>
              <DropDownContainer>
                <ProfileIcon
                  onClick={handleDropdownToggle}
                  //onMouseLeave={() => setShowDropDown(false)}
                />
                <DropDownMenu show={showDropDown}>
                    <DropDownItem
                      onClick={() => {
                        logout();
                        nav("/");
                        handleDropdownToggle();
                      }}
                      onMouseEnter={() => setShowDropDown(true)}
                      onMouseLeave={() => setShowDropDown(false)}
                  >
                    Logout
                  </DropDownItem>
                </DropDownMenu>
              </DropDownContainer>
              {/* <Button className="user-logout" onClick={logout}>
                Logout
              </Button> */}
            </li>
          ) : (
            <li>
              <NavLink to="/login">
                <Button className="user-login">Login</Button>
              </NavLink>
            </li>
          )}
          
        </ul>

        {/* two button for open and close of menu */}
        <div className="mobile-navbar-btn">
          <CgMenu
            name="menu-outline"
            className="mobile-nav-icon"
            onClick={() => setMenuIcon(true)}
          />
          <CgClose
            name="close-outline"
            className="mobile-nav-icon close-outline"
            onClick={() => setMenuIcon(false)}
          />
        </div>
      </div>
    </Nav>
  )
}

const ProfileIcon = styled(FaUserAlt)`
        cursor: pointer;
        font-size: 1.8rem;
        color: ${({ theme }) => theme.colors.black};
        transition: color 0.3s linear;

        &:hover,
        &:active {
          color: ${({ theme }) => theme.colors.helper};
      }`;

      const DropDownItem = styled.a`
        display: block;
        border-radius: 1rem;
        padding: 8px 16px;
        text-decoration: none;
        font-size: 1.4rem;
        color: ${({ theme }) => theme.colors.black};
        transition: background-color 0.3s linear, color 0.3s linear;
        cursor: pointer;

        &:hover,
        &:active {
          background-color: ${({ theme }) => theme.colors.helper};
          color: #ffffff;
        }
    `;
    const DropDownContainer = styled.div`
      position: relative;
      display: inline-block;
    `;

    const DropDownMenu = styled.div`
      display: ${({ show }) => (show ? "block" : "none")};
      position: absolute;
      min-width: 115px;
      background-color: ${({ theme }) => theme.colors.white};
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
      padding: 0.2rem;
      border-radius: 1rem;
      top: 150%; // Adjusted the position
      left: 50%; // Adjusted the position
      transform: translateX(-50%); // Adjusted the position
      z-index: 1000;

      // Added ::before and ::after pseudo-elements
      ::before,
      ::after {
        content: '';
        position: absolute;
        top: -6px;
        left: 50%;
        transform: translateX(-50%);
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
      }

      ::before {
        border-bottom: 6px solid ${({ theme }) => theme.colors.white};
        z-index: 2;
      }

      ::after {
        border-bottom: 6px solid rgba(0, 0, 0, 0.2);
        top: -7px;
        z-index: 1;
      }

      &:hover {
        display: block;
      }
    `;



    const Nav = styled.nav`
      .navbar-lists {
        display: flex;
        gap: 4.8rem;
        align-items: center;
  
        .navbar-link {
          &:link,
          &:visited {
            display: inline-block;
            text-decoration: none;
            font-size: 1.8rem;
            font-weight: 500;
            text-transform: uppercase;
            color: ${({ theme }) => theme.colors.black};
            transition: color 0.3s linear;
          }
  
          &:hover,
          &:active {
            color: ${({ theme }) => theme.colors.helper};
          }
        }
      }
  
      .mobile-navbar-btn {
        display: none;
        background-color: transparent;
        cursor: pointer;
        border: none;
      }
  
      .mobile-nav-icon[name="close-outline"] {
        display: none;
      }
  
      .close-outline {
        display: none;
      }
  
      .cart-trolley--link {
        position: relative;
  
        .cart-trolley {
          position: relative;
          font-size: 3.2rem;
        }
  
        .cart-total--item {
          width: 2.4rem;
          height: 2.4rem;
          position: absolute;
          background-color: #000;
          color: #fff;
          border-radius: 50%;
          display: grid;
          place-items: center;
          top: -20%;
          left: 70%;
          font-size: 1.5rem;
          background-color: ${({ theme }) => theme.colors.helper};
        }
      }
  
      .user-login--name {
        text-transform: capitalize;
      }
  
      .user-logout,
      .user-login {
        font-size: 1.4rem;
        padding: 0.8rem 1.4rem;
      }
  
      @media (max-width: ${({ theme }) => theme.media.mobile}) {
        .mobile-navbar-btn {
          display: inline-block;
          z-index: 9999;
          border: ${({ theme }) => theme.colors.black};
  
          .mobile-nav-icon {
            font-size: 4.2rem;
            color: ${({ theme }) => theme.colors.black};
          }
        }
  
        .active .mobile-nav-icon {
          display: none;
          font-size: 4.2rem;
          position: absolute;
          top: 30%;
          right: 10%;
          color: ${({ theme }) => theme.colors.black};
          z-index: 9999;
        }
  
        .active .close-outline {
          display: inline-block;
        }
  
        .navbar-lists {
          width: 100vw;
          height: 100vh;
          position: absolute;
          top: 0;
          left: 0;
          background-color: #fff;
  
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
  
          visibility: hidden;
          opacity: 0;
          transform: translateX(100%);
          /* transform-origin: top; */
          transition: all 3s linear;
        }
  
        .active .navbar-lists {
          visibility: visible;
          opacity: 1;
          transform: translateX(0);
          z-index: 999;
          transform-origin: right;
          transition: all 3s linear;
  
          .navbar-link {
            font-size: 4.2rem;
          }
        }
        .cart-trolley--link {
          position: relative;
  
          .cart-trolley {
            position: relative;
            font-size: 5.2rem;
          }
  
          .cart-total--item {
            width: 4.2rem;
            height: 4.2rem;
            font-size: 2rem;
            color: #fff;
          }
        }
  
        .user-logout,
        .user-login {
          font-size: 2.2rem;
          padding: 0.8rem 1.4rem;
        }
      }
    `;

export default AdminNav