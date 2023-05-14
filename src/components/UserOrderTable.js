import React, {useMemo, useEffect, useState} from 'react'
import { useOrderContext } from '../context/order_context'; // change to use the order context
import DataTable from 'react-data-table-component'
import styled from 'styled-components'
import { AiFillEye, AiFillStar } from 'react-icons/ai'
import { useAuthContext } from '../context/auth_context';
import ImageCell from './ImageCell'; // assuming you also have image cell for order's product image
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useProductContext } from '../context/productcontext';
import { Modal, Button } from '@mui/material';
import { useUserContext } from '../context/user_context';
import { TiCancel }from 'react-icons/ti'

const UserOrderTable = () => {
    const { fetchOrders, userOrders, fetchOrderById, cancelOrderItem } = useOrderContext(); // change to use the order context
    const {username} = useAuthContext();
    const { fetchProduct } = useProductContext();
    const [orders, setOrders] = useState([]); // New state for processed orders data
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false); // State to control the visibility of the modal
    const [showUpdateModal, setShowUpdateModal] = useState(false); // State to control the visibility of the update modal
    const [selectedStatus, setSelectedStatus] = useState(""); // State to store the selected status
    const { fetchUserByUsername } = useUserContext();
  
    // Function to handle "View" button click
    const handleView = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };
    
    const handleCancel = async (orderItem) => {
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: 'You are about to cancel the order item.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, cancel it!',
          cancelButtonText: 'No, keep it'
        });
    
        if (result.isConfirmed) {
          await cancelOrderItem(orderItem.itemId);
          await fetchOrders(username);
        }
      };
      

    
    useEffect(()=>{
      fetchOrders(username);
    },[username])

    useEffect(() => {
        // Fetch product details for each order
        const fetchProductDetails = async () => {
            const ordersWithProductDetails = await Promise.all(
              userOrders.map(async (order) => {
                const product = await fetchProduct(order.productId);
                const orderDetails = await fetchOrderById(order.orderId);
          
                // Fetch the user by username
                const seller = await fetchUserByUsername(product.sellerUsername);
          
                return {
                  ...order,
                  product,
                  orderDetails,
                  seller, // Add the fetched user to the order object
                };
              })
            );
            setOrders(ordersWithProductDetails);
          };
          
          
        fetchProductDetails();
      }, [userOrders, fetchProduct]);

    const nav = useNavigate();

    const columns = useMemo(() => [
      {
        name: "Product Image",
        cell: (row) => <ImageCell imageId={row.product.images[0]} />, // Use a separate ImageCell component
      },
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
                {(row.status === "Processing" || row.status === "Pending") && (
                <TiCancel
                    className="icon edit-icon"
                    onClick={() => handleCancel(row)}
                />
                )}
                {row.status === "Delivered" && (
                <AiFillStar
                    className="icon edit-icon"
                    onClick={() => handleView(row)}
                />
                )}
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
          <DataTable
            title="Orders"
            columns={columns}
            data={orders}
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
                    {selectedOrder.deliveryMethod !== "cod" && (
                    <>
                        <p>
                        <strong>Address:</strong>{" "}
                        {selectedOrder.seller.address.address}
                        </p>
                        <p>
                        <strong>City:</strong> {selectedOrder.seller.address.city}
                        </p>
                    </>
                    )}
                    <p>
                    <strong>Mobile:</strong>{" "}
                    {selectedOrder.seller.mobile}
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



export default UserOrderTable
