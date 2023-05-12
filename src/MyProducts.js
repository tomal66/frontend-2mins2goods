import React from 'react'
import MyProductsTable from './components/MyProductsTable'
import styled from 'styled-components'

const MyProducts = () => {
  return (
    <Wrapper>
      <MyProductsTable/>
    </Wrapper>
    
    
  )
}

const Wrapper = styled.div`
  min-height: 80vh;
  background-color: ${({ theme }) => theme.colors.bg};
`;

export default MyProducts