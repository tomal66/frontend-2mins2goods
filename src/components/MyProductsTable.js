import React, {useMemo} from 'react'
import { useProductContext } from '../context/productcontext';
import DataTable from 'react-data-table-component'
import styled from 'styled-components'
import { FiEdit2, FiTrash2 } from 'react-icons/fi';


const MyProductsTable = () => {
    const { products } = useProductContext();
  
    const columns = useMemo(() => [
        {
            name: 'Image',
            cell: row => (
              <div className="image-wrapper">
                <img src={row.image} alt={row.name} />
              </div>
            ),
        },
      {
        name: 'Product ID',
        selector: 'id',
        sortable: true,
      },
      {
        name: 'Product Name',
        selector: 'name',
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
        selector: 'stock',
        sortable: true,
      },
      {
        name: 'Actions',
        cell: row => (
        <>
            <FiEdit2
              className="icon edit-icon"
              
            />
            <FiTrash2 className="icon delete-icon" />
          </>
        ),
      },
    ], []);
  
    const handleDelete = (id) => {
      // Implement your delete product logic here
    };

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
            fontSize: '1.5rem'
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
          <DataTable
            title="Products"
            columns={columns}
            data={products}
            pagination
            customStyles={customStyles}
          />
        </div>
      </Wrapper>
    );
}

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

export default MyProductsTable