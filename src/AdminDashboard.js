import React from 'react'
import styled from 'styled-components';
import AdminDashboardItems from './components/AdminDashboardItems';

const AdminDashboard = () => {
  return (
    <Wrapper>
      <AdminDashboardItems/>
    </Wrapper>
  );
  }

const Wrapper = styled.div`
  min-height: 70vh;
`;

export default AdminDashboard