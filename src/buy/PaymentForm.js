import React from "react";
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement
} from "@stripe/react-stripe-js";
import "./PaymentForm.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import ErrorOutlineRounded from "@material-ui/icons/ErrorOutlineRounded"

const elementOptions =
{
    style: {
        base: {
            fontSize: "18px",
            color: "#424770",
            letterSpacing: "0.025em",
            fontFamily: "Source Code Pro, monospace",
            "::placeholder": {
                color: "#aab7c4"
            }
        },
        invalid: {
            color: "#9e2146"
        }
    }
};

function RedirectOnPaymentSuccess() {
    const history = useHistory();
    const [count, setCount] = useState(3);
    useEffect(() => {
        const redirectInterval = setInterval(() => setCount((count) => count - 1), 1000);
        return () => clearInterval(redirectInterval);
    }, []);

    if (count == 0)
        history.push('/');

    return (
        <div className="paymentSuccessfulBox">
            <div className="paymentSuccessfulBoxTick">
                ✓
            </div>
            <div className="paymentSuccessfulBoxHeading">
                Payment successful
            </div>
            <div className="paymentSuccessfulBoxCount">
                Redirecting in ...{count}
            </div>
        </div>
    )
}

const PaymentForm = ({ order, clientSecret }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isPayDisabled, setPayDisabled] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState("unpaid");
    const [error, setError] = useState("");

    const handleSubmit = async event => {
        event.preventDefault();
        setPayDisabled(true);
        setError("");

        if (!stripe || !elements) {
            setPayDisabled(false);
            return;
        }

        setPaymentStatus("processing");

        const payload = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardNumberElement)
        });
        const cardElement = elements.getElement(CardNumberElement);
        stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: order.shippingAddress.name,
                    address: {
                        line1: order.shippingAddress.line1,
                        line2: order.shippingAddress.line2,
                        city: order.shippingAddress.city,
                        state: order.shippingAddress.state,
                        postal_code: order.shippingAddress.pinCode
                    }
                }
            }
        })
            .then((result) => {
                if (result.error) {
                    setError(result.error.message);
                    setPayDisabled(false);
                    setPaymentStatus("unpaid");
                } else {
                    if (result.paymentIntent.status === 'succeeded')
                        setPaymentStatus("paid");
                }
            })
    };

    return (
        <>
            <div className={`${error ? "" : "hidden"} paymentFormErrorContainer`}>
                <div>
                    <ErrorOutlineRounded className="paymentFormErrorSymbol" />
                    <p>There was a problem</p>
                </div>
                <span>{error}</span>
            </div>
            {paymentStatus === "paid" ? <RedirectOnPaymentSuccess /> :
                <form onSubmit={handleSubmit} className="paymentForm">
                    <label>
                        Card number
                        <CardNumberElement
                            options={elementOptions}
                        />
                    </label>
                    <label>
                        Expiration date
                        <CardExpiryElement
                            options={elementOptions}
                        />
                    </label>
                    <label>
                        CVC
                        <CardCvcElement
                            options={elementOptions}
                        />
                    </label>
                    <button type="submit" disabled={!stripe || isPayDisabled}>
                        Pay
                    </button>
                    <div className={`paymentFormLoading ${paymentStatus === "processing" ? "" : "hidden"}`}>
                        <img src="https://images-na.ssl-images-amazon.com/images/G/01/amazonui/loading/loading-4x._V391853216_.gif" />
                    </div>
                </form>}
        </>
    );
};

export default PaymentForm;
