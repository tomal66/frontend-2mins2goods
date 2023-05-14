import React from 'react'
import MyOrdersTable from './components/MyOrdersTable'
import styled from 'styled-components'

const Orders = () => {
  return (
    <Wrapper>
      <MyOrdersTable/>
    </Wrapper>
    
  )
}

const Wrapper = styled.div`
  min-height: 80vh;
  background-color: ${({ theme }) => theme.colors.bg};
`;

export default Orders