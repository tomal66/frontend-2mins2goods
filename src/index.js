import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppProvider } from './context/productcontext';
import { FilterContextProvider } from './context/filter_context';
import {CartProvider} from './context/cartcontext'
import { AuthProvider } from './context/auth_context';
import { OrderProvider } from './context/order_context';
import { UserProvider } from './context/user_context';



ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <AppProvider>
          <OrderProvider>
            <FilterContextProvider>
              <CartProvider>
                <App />
              </CartProvider>
            </FilterContextProvider>
          </OrderProvider>
        </AppProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
reportWebVitals();
