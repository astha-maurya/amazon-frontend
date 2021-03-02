import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
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
import Address from './buy/Address';
import Payment from './buy/Payment';
import ShipOptions from "./buy/ShipOptions";
import PlaceOrder from './buy/PlaceOrder';
import OrderHistory from './order/OrderHistory';
import { getPendingOrder } from './actions/pendingOrder';
import { usePendingOrderContext } from './contexts/PendingOrderContext';
import ProceedToBuy from './buy/ProceedToBuy';
import LoginRoute from "./utilComponents/LoginRoute";
import PrivateRoute from "./utilComponents/PrivateRoute"
import LoadingNeeded from './utilComponents/LoadingNeeded';
import SearchResult from './search/SearchResult';
import Footer from './footer/Footer';
import CategoryPage from './category/CategoryPage';

const stripePromise = loadStripe("pk_test_51I2bfoDmScG2O9pbF7Rc1TJHPuJB3peOivMEHF8XsuKab5RVJA2rKJHYGXjNgFk5wJ3bBIgvie0QBH7zEdQvM9in00UaDZwJJY");

function App() {
  const [{ user }, dispatchUser] = useUserContext();
  const [{ cart }, dispatchCart] = useCartContext();
  const [{ pendingOrder }, dispatchPendingOrder] = usePendingOrderContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchInitialData() {
      await getCurrentUser()(dispatchUser);
      // if (currentUser) await getCart()(dispatchCart);
    };
    fetchInitialData()
      .then(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    console.log("in APP .............. cart n pending order");
    if (user) {
      getCart()(dispatchCart);
      // getPendingOrder()(dispatchPendingOrder);
    }
    else {
      emptyCart()(dispatchCart);
    }
  }, [user]);

  useEffect(() => console.log("rerender app"));

  return (
    // isLoading ?
    //   <h1>LOADING</h1> :
    // {/* // <Router> */}
    <div className="App">
      <LoadingNeeded isComponentLoading={isLoading}>
        <Switch>
          {/* <Route exact path="/">
            <NavBar />
            <Home />
          </Route> */}
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
          {/* <Route path="/order-history"
            render={() => user ?
              (<>
                <NavBar />
                <OrderHistory />
              </>) :
              <Redirect
                to={{
                  pathname: "/",
                  // state: { from: location }
                }}
              />}
          /> */}
          {/* <PrivateRoute path="/buy/shipaddressselect">
              < Address />
            </PrivateRoute>
            <PrivateRoute path="/buy/shipoptionselect">
              <ShipOptions />
            </PrivateRoute>
            <PrivateRoute path="/buy/placeorder">
              <PlaceOrder />
            </PrivateRoute>
            <PrivateRoute path="/buy/payment">
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </PrivateRoute> */}
          {/* <Route path="/buy"
            render={() => user ? <ProceedToCheckout /> :
              <Redirect
                to={{
                  pathname: "/",
                  // state: { from: location }
                }}
              />}
          /> */}
          <PrivateRoute path="/order-history">
            <NavBar />
            <OrderHistory />
          </PrivateRoute>
          <PrivateRoute path="/buy">
            {/* <Router> */}
            <ProceedToBuy />
            {/* </Router> */}
          </PrivateRoute>
          <Route path="/">
            <NavBar />
            <Home />
          </Route>
        </Switch>
        <Footer />
      </LoadingNeeded>

    </div>
    // {/* // </Router> */}
  )
}

export default App;