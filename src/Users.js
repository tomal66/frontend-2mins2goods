import React from 'react'
import UserTable from './components/UserTable';
import styled from 'styled-components';
const Users = () => {
  return (
    <Wrapper>
      <UserTable/>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 80vh;
  background-color: ${({ theme }) => theme.colors.bg};
`;

export default Users