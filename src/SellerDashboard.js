import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { IoIosCube } from "react-icons/io";
import { RiShoppingBasket2Line } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import SellerDashboardItems from "./components/SellerDashboardItems";

const SellerDashboard = () => {
  return (
    <Wrapper>
      <SellerDashboardItems/>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 70vh;
`;



export default SellerDashboard;
