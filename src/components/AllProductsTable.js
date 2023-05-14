import React, {useMemo, useEffect, useState} from 'react'
import { AiFillEye} from 'react-icons/ai'
import DataTable from 'react-data-table-component'
import styled from 'styled-components'
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useAuthContext } from '../context/auth_context';
import ImageCell from './ImageCell';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AllProductsTable = () => {

    const [products, setProducts] = useState([]); // Initialize state for products
    const [search, setSearch] = useState(""); // Add this line

    useEffect(() => {
        axios.get('http://localhost:8080/api/product/all')
          .then(response => {
            setProducts(response.data); // Set the products data
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }, []);

    // Filter products based on search
    const filteredProducts = products.filter(
        product =>
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase())
    );

  const nav = useNavigate();
  const handleView = (id) => {
    nav(`/singleProduct/${id}`);
  };

    const columns = useMemo(() => [
      {
        name: "Image",
        cell: (row) => <ImageCell imageId={row.images[0]} />, // Use a separate ImageCell component
      },
      
      {
        name: 'Product ID',
        selector: 'productId',
        sortable: true,
      },
      {
        name: 'Title',
        selector: 'title',
        sortable: true,
      },
      {
        name: 'Category',
        selector: 'category',
        sortable: true,
      },
      {
        name: 'Unit Price',
        selector: 'price',
        sortable: true,
      },
      {
        name: 'Stock',
        selector: 'quantity',
        sortable: true,
      },
      {
        name: 'Actions',
        cell: row => (
        <>
            <AiFillEye
              className="icon edit-icon"
              onClick={() => handleView(row.productId)}
            />
            
          </>
        ),
      },
    ], []);
  
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
        <div className="container"> 
        <SearchInput
          type="text"
          placeholder="Search products"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
          <DataTable
            title="Products"
            columns={columns}
            data={filteredProducts}
            pagination
            customStyles={customStyles}
          />
        </div>
      </Wrapper>
    );
}

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

export default AllProductsTable