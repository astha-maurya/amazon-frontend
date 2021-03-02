import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { CartContextProvider } from './contexts/CartContext';
import { cartReducer, cartInitialState } from "./reducers/cartReducer";
import { UserContextProvider } from './contexts/UserContext';
import { userReducer, userInitialState } from './reducers/userReducer';
import { PendingOrderContextProvider } from './contexts/PendingOrderContext';
import { pendingOrderInitialState, pendingOrderReducer } from './reducers/pendingOrderReducer';

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider reducer={userReducer} initialState={userInitialState}>
      <CartContextProvider reducer={cartReducer} initialState={cartInitialState}>
        <PendingOrderContextProvider reducer={pendingOrderReducer} initialState={pendingOrderInitialState}>
          <Router>
            <App />
          </Router>
        </PendingOrderContextProvider>
      </CartContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
