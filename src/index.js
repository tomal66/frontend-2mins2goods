import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppProvider } from './context/productcontext';
import { FilterContextProvider } from './context/filter_context';
import {CartProvider} from './context/cartcontext'
import { AuthProvider } from './context/auth_context';



ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <AuthProvider>
        <FilterContextProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FilterContextProvider>
      </AuthProvider>
    
  </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
reportWebVitals();
