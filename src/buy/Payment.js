import React, { useEffect, useState } from 'react';
import "./Payment.css";
import { useHistory, useParams } from "react-router-dom";
import PaymentForm from './PaymentForm';
import CurrencyFormat from 'react-currency-format';
import { updatePendingOrderPaymentIntent, updatePendingOrderPaymentStatus } from '../actions/pendingOrder';
import LoadingNeeded from '../utilComponents/LoadingNeeded';

export default function Payment() {
    const history = useHistory();
    const { orderId } = useParams();
    const [clientSecret, setClientSecret] = useState("");
    const [order, setOrder] = useState({});
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        updatePendingOrderPaymentIntent(orderId)
            .then((result) => {
                if (result.er) return history.push("/redirect");
                else {
                    setClientSecret(result.res.clientSecret);
                    setOrder(result.res.order);
                    setLoading(false);
                }
            })
        return () => updatePendingOrderPaymentStatus(orderId);
    }, []);

    return (
        <div className="payment">
            <LoadingNeeded isComponentLoading={isLoading}>
                <div className="paymentHeader">
                    <img src="https://images-na.ssl-images-amazon.com/images/G/31/checkout/payselect/completePayment._CB134655375_.gif" />
                </div>
                <div className="paymentContent">
                    <h1>Complete Payment</h1>
                    <p>Enter Card Details to complete the payment.</p>
                    <CurrencyFormat
                        renderText={(value) => (
                            <p>
                                Order Total: <strong> {value} </strong>
                            </p>
                        )}
                        decimalScale={2}
                        displayType={"text"}
                        value={order.orderTotal}
                        thousandSeparator={true}
                        prefix={"₹"}
                    />
                    <PaymentForm clientSecret={clientSecret} order={order} />
                    <div>This is a test payment. Use Card Number 4242 4242 4242 4242 for Successful Payment. This test card number work with any CVC, postal code and future expiry date.</div>
                </div>
                <div className="paymentDivider"></div>
            </LoadingNeeded>
        </div>
    );
}


