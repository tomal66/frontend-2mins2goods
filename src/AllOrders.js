import React from 'react'
import AllOrdersTable from './components/AllOrdersTable';
import styled from 'styled-components';

const AllOrders = () => {
  return (
    <Wrapper>
      <AllOrdersTable/>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 80vh;
  background-color: ${({ theme }) => theme.colors.bg};
`;


export default AllOrders