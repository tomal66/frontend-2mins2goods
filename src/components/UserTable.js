import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { Modal } from '@mui/material';

const UserTable = () => {

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/user/all');
      const allUsers = response.data;
      const filteredUsers = allUsers.filter((user) => user.role !== 'ROLE_ADMIN');
      setUsers(filteredUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstname} ${user.lastname}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  const handleToggleActiveStatus = async (user) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/user/${user.username}/active`
      );
      const updatedUser = response.data;
      const updatedUsers = users.map((u) =>
        u.username === updatedUser.username ? updatedUser : u
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error toggling active status:', error);
    }
  };

  const columns = [

    {
      name: 'Username',
      selector: 'username',
      sortable: true,
    },
    {
      name: 'Name',
      cell: (row) => `${row.firstname} ${row.lastname}`,
      sortable: true,
    },
    {
        name: 'Cell',
        selector: 'mobile',
        sortable: true,
      },
    {
      name: 'Active Status',
      selector: 'active',
      sortable: true,
      cell: (row) => (row.active ? 'Active' : 'Inactive'),
    },
    {
      name: 'Actions',
      cell: (row) => (
        <>
          <ActionButton onClick={() => handleView(row)}>View</ActionButton>
          <ActionButton
            onClick={() => handleToggleActiveStatus(row)}
            active={row.active}
          >
            Toggle Active
          </ActionButton>
        </>
      ),
    },
  ];

  const customStyles = {
    header: {
      style: {
        backgroundColor: '#f5f5f5',
        fontSize: '2rem', // Update text size for table headers
        fontWeight: 'bold',
      },
    },
    headCells: {
      style: {
        borderBottom: '1px solid #e0e0e0',
        fontSize: '1.5rem',
        fontWeight: 'bold'
      },
    },
    cells: {
      style: {
        fontSize: '1.5rem',
        width: '150px', // Set a fixed width for the cells
        maxWidth: '150px', // Set a maximum width for the cells
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
    },
    rows: {
      style: {
        minHeight: '60px', // override the row height
        '&:hover': {
            backgroundColor: '#f5f5f5',
          },
      },
    },
  };

  return (
    <Wrapper>
        <div className='container'>
        <SearchInput
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearch}
        />
            <DataTable
            title="Users"
            columns={columns}
            data={filteredUsers}
            pagination
            customStyles={customStyles}
            />
        </div>
      
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <ModalContainer>
          {selectedUser && (
            <div>
            <h3>User: {selectedUser.username}</h3>
            <p>
              <strong>First Name:</strong> {selectedUser.firstname}
            </p>
            <p>
              <strong>Last Name:</strong> {selectedUser.lastname}
            </p>
            <p>
              <strong>Mobile:</strong> {selectedUser.mobile}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Role:</strong> {selectedUser.role}
            </p>
            <p>
              <strong>Address:</strong> {selectedUser.address.address}
            </p>
            <p>
              <strong>Country:</strong> {selectedUser.address.country}
            </p>
            <p>
              <strong>Zipcode:</strong> {selectedUser.address.zipcode}
            </p>
            <p>
              <strong>City:</strong> {selectedUser.address.city}
            </p>
            <p>
              <strong>Longitude:</strong> {selectedUser.address.longitude}
            </p>
            <p>
              <strong>Latitude:</strong> {selectedUser.address.latitude}
            </p>
            <p>
              <strong>State:</strong> {selectedUser.address.state}
            </p>
            <p>
              <strong>Active Status:</strong>{' '}
              {selectedUser.active ? 'Active' : 'Inactive'}
            </p>
            {/* Display any additional user information here */}
          </div>
          )}
        </ModalContainer>
      </Modal>
    </Wrapper>
  );
};


const SearchInput = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1.6rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 3px;
  outline: none;
  text-transform: none;
`;

const Wrapper = styled.section`
  padding: 12rem 0;

  .image-wrapper {
  width: 70px;
  height: 50px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-wrapper img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.icon {
  cursor: pointer;
  font-size: 2.2rem;
  margin-right: 1rem;
  transition: color 0.3s ease-in-out;
}

.edit-icon {
  color: grey;
}

.edit-icon:hover {
  color: #E6400B;
}

.delete-icon {
  color: grey;
}

.delete-icon:hover {
  color: #E6400B;
}

`;

const ActionButton = styled.button`
  background-color: #E6400B;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 3px;
`;

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 2rem;
  outline: none;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 500px;

  h3 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 1.6rem;
    margin-bottom: 1rem;
    text-align: left; /* Added to align the order info to the left */
  }
  p strong {
    font-weight: bold;
  }
`;

const UpdateModalContainer = styled(ModalContainer)`
  select {
    display: block;
    width: 100%;
    height: calc(2em + .75rem + 2px); // Increase height
    padding: .375rem .75rem;
    font-size: 1.2rem; // Increase font size
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    margin-top: 1rem;
    margin-bottom: 2rem;
  }

  button {
    background: #E6400B; // Theme orange
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    &:hover {
      background-color: #c53010; // Darken the theme orange on hover
    }
  }
`;

export default UserTable;