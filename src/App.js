import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Product from './Product';
import SingleProduct from './SingleProduct';
import Cart from './Cart';
import ErrorPage from './ErrorPage';
import { GlobalStyle } from './GlobalStyle';
import { ThemeProvider } from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './Login';
import Register from './Register';
import Layout from './components/Layout';
import Unauthorized from './Unauthorized';
import RequireAuth from './helpers/RequireAuth';
import SellerDashboard from './SellerDashboard';
import AdminDashboard from './AdminDashboard';
import MyProducts from './MyProducts';
import Orders from './Orders'
import SellerRegister from './SellerRegister';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import Checkout from './Checkout';
import UserOrders from './UserOrders';
import EditProfile from './EditProfile';
import EditAddress from './EditAddress';
import Users from './Users';
import AllProducts from './AllProducts';
import AllOrders from './AllOrders';


function App() {
  
  const theme = {
    colors: {
      heading: "rgb(24 24 29)",
      text: "rgba(29 ,29, 29, .8)",
      white: "#fff",
      black: " #212529",
      helper: "#E6400B",

      bg: "#F6F8FA",
      footer_bg: "#0a1435",
      btn: "#E6400B",
      border: "#E6400B",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
    },
  };


  return ( 
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle/>
        <Header/>
        <Routes>
        <Route path="/" element={<Layout />}>
 
          {/* Public Routes */}
          <Route path="/" element={<Home/>}/>
          
          <Route path="/singleproduct/:id" element={<SingleProduct/>}/>
          
          <Route path="/products" element={<Product/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/seller-register" element={<SellerRegister/>}/>
          <Route path="/unauthorized" element={<Unauthorized/>}/>
          <Route path="*" element={<ErrorPage/>}/>

          <Route element={<RequireAuth allowedRole={"ROLE_USER"} />}>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/checkout" element={<Checkout/>}/>
            <Route path="/myOrders" element={<UserOrders/>}/>
            <Route path="/edit-user-profile" element={<EditProfile/>}/>
            <Route path="/edit-user-address" element={<EditAddress/>}/>
          </Route>

          <Route element={<RequireAuth allowedRole={"ROLE_SELLER"} />}>
            <Route path="/seller-dashboard" element={<SellerDashboard />} />
            <Route path="/my-products" element={<MyProducts />} />
            <Route path="/add-products" element={<AddProduct />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/edit-seller-profile" element={<EditProfile/>}/>
            <Route path="/edit-seller-address" element={<EditAddress/>}/>
          </Route>

          <Route element={<RequireAuth allowedRole={"ROLE_ADMIN"} />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/allProducts" element={<AllProducts />} />
            <Route path="/allOrders" element={<AllOrders />} />
          </Route>

        </Route>
          
        </Routes>
        <Footer/>
      </Router>
    </ThemeProvider>
   );
}

export default App;
