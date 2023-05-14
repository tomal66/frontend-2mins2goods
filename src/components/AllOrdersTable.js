import React, {useMemo, useEffect, useState} from 'react'
import { useOrderContext } from '../context/order_context'; // change to use the order context
import DataTable from 'react-data-table-component'
import styled from 'styled-components'
import { AiFillEye} from 'react-icons/ai'
import { useAuthContext } from '../context/auth_context';
import ImageCell from './ImageCell'; // assuming you also have image cell for order's product image
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useProductContext } from '../context/productcontext';
import { Modal, Button } from '@mui/material';
import { useUserContext } from '../context/user_context';
import axios from 'axios';

const AllOrdersTable = () => {
    const { fetchOrderById} = useOrderContext(); // change to use the order context
    const {username} = useAuthContext();
    const { fetchProduct} = useProductContext();
    const [orders, setOrders] = useState([]); // New state for processed orders data
    const [fetchedOrders, setFetchedOrders] = useState([]); // New state for processed orders data
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false); // State to control the visibility of the modal
    const { fetchUserByUsername } = useUserContext();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
      };
      
      const filteredOrders = orders.filter((order) => {
        return order.product.title.toLowerCase().includes(searchQuery.toLowerCase());
      });
      
    useEffect(() => {
        fetchAllOrders();
      }, []);
    
      const fetchAllOrders = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/orders/all');
          setFetchedOrders(response.data);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };

    // Function to handle "View" button click
    const handleView = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };
      

    const fetchProductDetails = async () => {
        if (fetchedOrders.length === 0) {
            return;
        }
    
        const ordersWithProductDetails = await Promise.all(
            fetchedOrders.map(async (order) => {
                const product = await fetchProduct(order.productId);
                const orderDetails = await fetchOrderById(order.orderId);
                const seller = await fetchUserByUsername(product.sellerUsername);
                const buyer = await fetchUserByUsername(orderDetails.buyerUsername);
    
                return {
                    ...order,
                    product,
                    orderDetails,
                    seller,
                    buyer
                };
            })
        );
    
        setOrders(ordersWithProductDetails);
    };
    
    useEffect(() => {
        fetchProductDetails();
    }, [fetchedOrders, fetchProduct]);

    const nav = useNavigate();

    const columns = useMemo(() => [
      {
        name: 'Order ID',
        selector: 'orderId',
        sortable: true,
      },
      {
        name: 'Title',
        selector: row => row.product.title,
        sortable: true,
      },
      {
        name: 'Status',
        selector: 'status',
        sortable: true,
      },
      {
        name: 'Delivery Method',
        selector: 'deliveryMethod',
        sortable: true,
      },
      {
        name: 'Price',
        selector: row => row.product.price*row.quantity,
        sortable: true,
      },
      {
        name: 'Actions',
        cell: row => (
            <>
                <AiFillEye
                className="icon edit-icon"
                onClick={() => handleView(row)}
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
        placeholder="Search orders..."
        value={searchQuery}
        onChange={handleSearch}
        />

          <DataTable
            title="Orders"
            columns={columns}
            data={filteredOrders}
            pagination
            customStyles={customStyles}
          />
        </div>
        {/* Modal component for View order*/}
        <Modal
            open={showModal}
            onClose={() => setShowModal(false)}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <ModalContainer>
                {/* Existing code */}
                
                {selectedOrder && (
                <div id="modal-description">
                    {/* Display the order information here */}
                    {}
                    <h3>Order #{selectedOrder.orderId}</h3>
                    <p>
                    <strong>Status:</strong> {selectedOrder.status}
                    </p>
                    <p>
                    <strong>Quantity:</strong> {selectedOrder.quantity}
                    </p>
                    <p>
                    <strong>Delivery:</strong> {selectedOrder.deliveryMethod}
                    </p>
                    <p>
                    <strong>Created:</strong>{" "}
                    {new Date(selectedOrder.orderDetails.createdAt).toLocaleString(undefined, {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        timeZoneName: "short",
                    })}
                    </p>
                    <p>
                    <strong>Updated:</strong>{" "}
                    {new Date(selectedOrder.orderDetails.updatedAt).toLocaleString(undefined, {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        timeZoneName: "short",
                    })}
                    </p>
                    <p>
                    <strong>Seller:</strong>{" "}
                    {selectedOrder.seller.firstname + " " + selectedOrder.seller.lastname}
                    </p>
                    <p>
                    <strong>Seller Mobile:</strong>{" "}
                    {selectedOrder.seller.mobile}
                    </p>
                    <p>
                    <strong>Buyer:</strong>{" "}
                    {selectedOrder.buyer.firstname + " " + selectedOrder.buyer.lastname}
                    </p>
                    <p>
                    <strong>Buyer Mobile:</strong>{" "}
                    {selectedOrder.buyer.mobile}
                    </p>
                    
                </div>
                )}
            </ModalContainer>
        </Modal>        
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

const SearchInput = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1.6rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 3px;
  outline: none;
  text-transform: none;
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

  .review-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.review-form-field {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 1.5rem;
}


.review-form-field input,
.review-form-field textarea {
  width: 300px; /* Adjust this value to fit your design */
  resize: vertical; /* This allows the textarea to be resized vertically only */
  padding: 2%;
  font-size: 2rem;
  margin-top: 0.5rem;
}

.review-form-field textarea {
  min-height: 100px;
  text-transform: none;
}


.review-form-field input:focus,
.review-form-field textarea:focus {
  border-color: #E6400B;
  outline: none; /* Remove the default browser outline */
}


.review-form-submit {
  background: #E6400B;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  margin: 0 auto; 
}

.review-form-submit:hover {
  background-color: #c53010;
}

`;




export default AllOrdersTable
