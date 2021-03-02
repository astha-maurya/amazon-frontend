import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Address from './Address';
import Payment from './Payment';
import PlaceOrder from './PlaceOrder';
import ShipOptions from './ShipOptions';
import { Elements } from '@stripe/react-stripe-js';
import { getPendingOrder } from '../actions/pendingOrder';
import LoadingNeeded from '../utilComponents/LoadingNeeded';
import { usePendingOrderContext } from '../contexts/PendingOrderContext';

const stripePromise = loadStripe("pk_test_51I2bfoDmScG2O9pbF7Rc1TJHPuJB3peOivMEHF8XsuKab5RVJA2rKJHYGXjNgFk5wJ3bBIgvie0QBH7zEdQvM9in00UaDZwJJY");

function ProceedToBuy() {
    const [isLoading, setLoading] = useState(true);
    const [{ pendingOrder }, dispatchPendingOrder] = usePendingOrderContext();
    useEffect(() => {
        getPendingOrder()(dispatchPendingOrder)
            .then(() => setLoading(false));
        console.log("fetching");
    }, []);

    const { createdOn, shippingAddress, delivery } = pendingOrder;

    return (
        <LoadingNeeded isComponentLoading={isLoading}>
            <Switch>
                <Route path="/buy/shipaddressselect">
                    {createdOn ? < Address /> : <Redirect to="/redirect" />}
                </Route>
                <Route path="/buy/shipoptionselect">
                    {shippingAddress ? <ShipOptions /> : <Redirect to="/redirect" />}
                </Route>
                <Route path="/buy/placeorder">
                    {delivery ? <PlaceOrder /> : <Redirect to="/redirect" />}
                </Route>
                <Route path="/buy/payment/:orderId">
                    <Elements stripe={stripePromise}>
                        <Payment />
                    </Elements>
                </Route>
                <Route path="/buy"
                    render={() =>
                        <Redirect to="/redirect" />} />
            </Switch>
        </LoadingNeeded>
    )
}

export default ProceedToBuy;