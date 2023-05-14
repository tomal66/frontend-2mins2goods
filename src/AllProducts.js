import React from 'react'
import styled from 'styled-components'
import AllProductsTable from './components/AllProductsTable';

const AllProducts = () => {
  return (
    <Wrapper>
      <AllProductsTable/>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 80vh;
  background-color: ${({ theme }) => theme.colors.bg};
`;

export default AllProducts