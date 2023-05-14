import React, {useMemo, useEffect, useState} from 'react'
import { useOrderContext } from '../context/order_context'; // change to use the order context
import DataTable from 'react-data-table-component'
import styled from 'styled-components'
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { AiFillEye } from 'react-icons/ai'
import { useAuthContext } from '../context/auth_context';
import ImageCell from './ImageCell'; // assuming you also have image cell for order's product image
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useProductContext } from '../context/productcontext';
import { Modal, Button } from '@mui/material';
import { useUserContext } from '../context/user_context';

const MyOrdersTable = () => {
    const { fetchSellerOrders, sellerOrders, fetchOrderById, updateOrderItem } = useOrderContext(); // change to use the order context
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

    const handleStatusUpdate = async () => {
        try {
          // Call the updateOrderItem function with the selected order and the new status
          const orderItemDto = {
            itemId: selectedOrder.itemId,
            quantity: selectedOrder.quantity,
            orderId: selectedOrder.orderId,
            productId: selectedOrder.productId,
            status: selectedStatus,
            deliveryMethod: selectedOrder.deliveryMethod
          }
          await updateOrderItem(orderItemDto); 
          setShowUpdateModal(false);
          Swal.fire({
            title: 'Updated!',
            text: 'The order status has been updated!',
            icon: 'success',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#E6400B'
          });

          // Reload orders after successful update
          fetchSellerOrders(username);
      
        } catch (error) {
          Swal.fire({
            title: 'Failed!',
            text: 'There was an issue updating the order status.',
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#E6400B'
          });
        }
      };
      
      

    
    useEffect(()=>{
      fetchSellerOrders(username);
    },[username])

    useEffect(() => {
        // Fetch product details for each order
        const fetchProductDetails = async () => {
            const ordersWithProductDetails = await Promise.all(
              sellerOrders.map(async (order) => {
                const product = await fetchProduct(order.productId);
                const orderDetails = await fetchOrderById(order.orderId);
          
                // Fetch the user by username
                const user = await fetchUserByUsername(orderDetails.buyerUsername);
          
                return {
                  ...order,
                  product,
                  orderDetails,
                  user, // Add the fetched user to the order object
                };
              })
            );
            setOrders(ordersWithProductDetails);
          };
          
          
        fetchProductDetails();
      }, [sellerOrders, fetchProduct]);

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
        name: 'Actions',
        cell: row => (
        <>
            <AiFillEye
              className="icon edit-icon"
              onClick={() => handleView(row)}
            />
            <FiEdit2
              className="icon edit-icon"
              onClick={() => { setSelectedOrder(row); setShowUpdateModal(true); }}
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
                    {/* Existing code */}
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
                    <strong>Buyer:</strong>{" "}
                    {selectedOrder.user.firstname + " " + selectedOrder.user.lastname}
                    </p>
                    {selectedOrder.deliveryMethod !== "pickup" && (
                    <>
                        <p>
                        <strong>Address:</strong>{" "}
                        {selectedOrder.user.address.address}
                        </p>
                        <p>
                        <strong>City:</strong> {selectedOrder.user.address.city}
                        </p>
                    </>
                    )}
                    <p>
                    <strong>Mobile:</strong>{" "}
                    {selectedOrder.user.mobile}
                    </p>
                </div>
                )}
            </ModalContainer>
        </Modal>

        {/* {Modal for update status} */}
        <Modal
        open={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        aria-labelledby="modal-title-update"
        aria-describedby="modal-description-update"
        >
            <UpdateModalContainer>
            {selectedOrder && (
                <div id="modal-description-update">
                <h3>Update Order Status</h3>
                <p>
                    <strong>Order ID:</strong> {selectedOrder.orderId}
                </p>
                <select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}>
                    <option value="">Select status</option>
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    {selectedOrder.deliveryMethod === "pickup" ? (
                    <option value="Ready">Ready</option>
                    ) : (
                    <>
                        <option value="Shipped">Shipped</option>
                    </>
                    )}
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
                <button onClick={handleStatusUpdate}>Update Status</button>
                </div>
            )}
            </UpdateModalContainer>

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



export default MyOrdersTable
