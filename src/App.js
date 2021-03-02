import React, { useEffect, useState } from 'react';
import { Switch, Route } from "react-router-dom";
import NavBar from './header/NavBar';
import './App.css';
import Home from './home/Home';
import Checkout from './checkout/Checkout';
import Login from './login/Login';
import { getCurrentUser } from "./actions/session";
import { useUserContext } from "./contexts/UserContext";
import { emptyCart, getCart } from './actions/cart';
import { useCartContext } from './contexts/CartContext';
import Register from './login/Register';
import OrderHistory from './order/OrderHistory';
import ProceedToBuy from './buy/ProceedToBuy';
import LoginRoute from "./utilComponents/LoginRoute";
import PrivateRoute from "./utilComponents/PrivateRoute"
import LoadingNeeded from './utilComponents/LoadingNeeded';
import SearchResult from './search/SearchResult';
import Footer from './footer/Footer';
import CategoryPage from './category/CategoryPage';

function App() {
  const [{ user }, dispatchUser] = useUserContext();
  const [{ cart }, dispatchCart] = useCartContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchInitialData() {
      await getCurrentUser()(dispatchUser);
    };
    fetchInitialData()
      .then(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (user) {
      getCart()(dispatchCart);
    }
    else {
      emptyCart()(dispatchCart);
    }
  }, [user]);

  return (
    <div className="App">
      <LoadingNeeded isComponentLoading={isLoading}>
        <Switch>
          <Route path="/s">
            <NavBar />
            <SearchResult />
          </Route>
          <Route path="/category/:categoryKeyword">
            <NavBar />
            <CategoryPage />
          </Route>
          <Route path="/checkout">
            <NavBar />
            <Checkout />
          </Route>
          <LoginRoute path="/login">
            <Login />
          </LoginRoute>
          <LoginRoute path="/register">
            <Register />
          </LoginRoute>
          <PrivateRoute path="/order-history">
            <NavBar />
            <OrderHistory />
          </PrivateRoute>
          <PrivateRoute path="/buy">
            <ProceedToBuy />
          </PrivateRoute>
          <Route path="/">
            <NavBar />
            <Home />
          </Route>
        </Switch>
        <Footer />
      </LoadingNeeded>
    </div>
  )
}

export default App;