import styled from "styled-components";
import {BiHealth} from "react-icons/bi"
import {FiMonitor} from "react-icons/fi"
import {ImHome} from "react-icons/im"
import {GiDress} from "react-icons/gi"
import {MdSportsFootball} from "react-icons/md"
import {AiFillCar} from "react-icons/ai"
import {GiBlackBook} from "react-icons/gi"
import {CgGym} from "react-icons/cg"
import { NavLink } from "react-router-dom";
import { useFilterContext } from "../context/filter_context";

const HomeCategories = () => {
  const {updateFilterValue} = useFilterContext();
  return (
    <Wrapper>
        <div className="container">
        <h2>Browse by Categories</h2>
            <div className="grid grid-four-column">
                <div className="services-2">
                <div className="services-colum-2">
                <NavLink to={`/products`}>
                    <div
                    name="category"
                    value={"Electronics"}
                    onClick={updateFilterValue}>
                    <FiMonitor className="icon" />
                    <h3>Electronics</h3>
                    </div>
                    </NavLink>
                </div>
                <div className="services-colum-2">
                    <NavLink to="/products">
                    <div
                    name="category"
                    value="Health & Beauty"
                    onClick={updateFilterValue}>
                        <BiHealth className="icon" />
                        <h3>Health & Beauty</h3>
                    </div>
                    </NavLink>
                </div>
                </div>

                <div className="services-2">
                <div className="services-colum-2">
                    <NavLink to="/products">
                    <div
                    name="category"
                    value="Home & Garden"
                    onClick={updateFilterValue}>
                        <ImHome className="icon" />
                        <h3>Home & Garden</h3>
                    </div>
                    </NavLink>
                </div>
                <div className="services-colum-2">
                    <NavLink to="/products">
                    <div
                    name="category"
                    value="Clothing"
                    onClick={updateFilterValue}>
                        <GiDress className="icon" />
                        <h3>Clothing</h3>
                    </div>
                    </NavLink>
                </div>
                </div>

                <div className="services-2">
                <div className="services-colum-2">
                    <NavLink to="/products">
                    <div
                    name="category"
                    value="Sports & Outdoors"
                    onClick={updateFilterValue}>
                        <MdSportsFootball className="icon" />
                        <h3>Sports & Outdoors</h3>
                    </div>
                    </NavLink>
                </div>
                <div className="services-colum-2">
                    <NavLink to="/products">
                    <div
                    name="category"
                    value="Automotive"
                    onClick={updateFilterValue}>
                        <AiFillCar className="icon" />
                        <h3>Automotive</h3>
                    </div>
                    </NavLink>
                </div>
                </div>

                <div className="services-2">
                <div className="services-colum-2">
                    <NavLink to="/products">
                    <div
                    name="category"
                    value="Books & Media"
                    onClick={updateFilterValue}>
                        <GiBlackBook className="icon" />
                        <h3>Books & Media</h3>
                    </div>
                    </NavLink>
                
                </div>
                <div className="services-colum-2">
                    <NavLink to="/products">
                    <div
                    name="category"
                    value="Toys & Hobbies"
                    onClick={updateFilterValue}>
                        <CgGym className="icon" />
                        <h3>Toys & Hobbies</h3>
                    </div>
                    </NavLink>
                </div>
                </div>

            </div>
        </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 9rem 0;

  .grid {
    gap: 4.8rem;
  }

  .services-1,
  .services-2,
  .services-3 {
    width: auto;
    height: 30rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    background: ${({ theme }) => theme.colors.bg};
    text-align: center;
    border-radius: 2rem;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  }

  .services-2 {
    gap: 4rem;
    background-color: transparent;
    box-shadow: none;

    .services-colum-2 {
      background: ${({ theme }) => theme.colors.bg};
      display: flex;
      flex-direction: row;
      flex: 1;
      justify-content: center;
      align-items: center;
      border-radius: 2rem;
      box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
      transition: all 0.2s ease;

      div {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        padding: 10px;
      }
    }

    .services-colum-2:hover {
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
        transform: scale(1.1);
    }
    
    .services-colum-2:active {
        box-shadow: none;
        transform: scale(0.9);
      }

  }

  h2 {
    text-align: center;
    text-transform: none;
    color: ${({ theme }) => theme.colors.text};
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 3rem;
  }

  h3 {
    margin-top: 1.4rem;
    font-size: 2rem;
  }

  .icon {
    /* font-size: rem; */
    width: 8rem;
    height: 8rem;
    padding: 2rem;
    border-radius: 50%;
    background-color: #fff;
    color: #E6400B;
  }
`;

export default HomeCategories