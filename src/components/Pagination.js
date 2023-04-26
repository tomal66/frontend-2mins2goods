import React from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const PaginationButton = styled.button`
  border: none;
  background-color: ${(props) => (props.active ? '#E6400B' : 'white')};
  color: ${(props) => (props.active ? 'white' : 'black')};
  font-size: 1rem;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.active ? '#E6400B' : '#f1f1f1')};
  }
`;

const Pagination = ({ count, productsPerPage, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(count / productsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  return (
    <PaginationContainer>
      <PaginationButton onClick={handleFirstPage}>First</PaginationButton>
      <PaginationButton onClick={handlePrevPage}>Prev</PaginationButton>
      {pageNumbers.map((page) => (
        <PaginationButton
          key={page}
          active={currentPage === page}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </PaginationButton>
      ))}
      <PaginationButton onClick={handleNextPage}>Next</PaginationButton>
      <PaginationButton onClick={handleLastPage}>Last</PaginationButton>
    </PaginationContainer>
  );
};

export default Pagination;
