import React, {useMemo, useEffect} from 'react'
import { useProductContext } from '../context/productcontext';
import DataTable from 'react-data-table-component'
import styled from 'styled-components'
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useAuthContext } from '../context/auth_context';
import ImageCell from './ImageCell';
import Swal from 'sweetalert2';


const MyProductsTable = () => {
    const { getSellerProducts, sellerProducts, deleteProduct } = useProductContext();
    const {username} = useAuthContext();
    useEffect(()=>{
      getSellerProducts(username);
  },[])

    const products = sellerProducts;

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
            <FiEdit2
              className="icon edit-icon"
              
            />
            <FiTrash2 
              className="icon delete-icon"
              onClick={() => handleDelete(row.productId)}
              />
          </>
        ),
      },
    ], []);
  
    const handleDelete = (id) => {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this product!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        confirmButtonColor: '#d33',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.isConfirmed) {
          deleteProduct(id)
            .then(() => {
              Swal.fire({
                title: 'Deleted!',
                text: 'Your product has been deleted!',
                icon: 'success',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#E6400B' // This will set the confirm button color to red
              });
              // Here you could also add any additional actions on success (like refreshing the product list)
            })
            .catch(() => {
              Swal.fire({
                title: 'Failed!',
                text: 'There was an issue deleting your product.',
                icon: 'error',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#E6400B' // This will set the confirm button color to red
              });
              // Here you could also add any additional actions on failure
            })
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: 'Cancelled!',
            text: 'Your product is safe.',
            icon: 'success',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#E6400B' // This will set the confirm button color to red
          });
        }
      })
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