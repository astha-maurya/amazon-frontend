import React, { useState } from 'react';
import CurrencyFormat from "react-currency-format"
import "./PlaceOrder.css";
import { useHistory } from "react-router-dom";
import { useCartContext } from '../contexts/CartContext';
import { usePendingOrderContext } from '../contexts/PendingOrderContext';
import { updatePendingOrderPlace } from '../actions/pendingOrder';
import { emptyCart } from '../actions/cart';


export default function PlaceOrder() {
    const [{ cart }, dispatchCart] = useCartContext();
    const [{ pendingOrder }, dispatchPendingOrder] = usePendingOrderContext();
    const history = useHistory();

    const onContinue = async () => {
        let { res, er } = await updatePendingOrderPlace()(dispatchPendingOrder);
        if (res) {
            emptyCart()(dispatchCart);
            history.push(`/buy/payment/${res.orderId}`);
        }
    }

    return (
        <div className="placeOrderWrapper">
            <div className="placeOrder">
                <div className="placeOrderHeader">
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/x-locale/checkout/confirm-banner._CB485949149_.gif" />
                </div>
                <div className="placeOrderHeader">
                    <h1> Review your order</h1>
                    <p>By placing your order, you agree to Amazon's privacy notice and conditions of use.</p>
                </div>
                <div className="placeOrderContent">
                    <div className="placeOrderContentLeft">
                        <div className="placeOrderContentTop">
                            <h3>Shipping Address</h3>
                            <div className="placeOrderContentAddress">
                                <p> {pendingOrder.shippingAddress.name} </p>
                                <p> {pendingOrder.shippingAddress.line1} </p>
                                <p> {pendingOrder.shippingAddress.line2} </p>
                                <p> {pendingOrder.shippingAddress.city}, {pendingOrder.shippingAddress.state}, {pendingOrder.shippingAddress.pinCode} </p>
                                <p> India </p>
                                <p>Phone: {pendingOrder.shippingAddress.mobileNumber}</p>
                            </div>
                        </div>
                        <div className="placeOrderContentBottom">
                            <div>
                                <h3>Shipping from Amazon</h3>
                                <img src="https://images-na.ssl-images-amazon.com/images/G/31/marketing/fba/fba-badge_18px._V384100965_.png" />
                            </div>
                            <div className="placeOrderContentOrderListItem">
                                {
                                    pendingOrder.items.map((item) => <div>
                                        <div>
                                            <img src={item.product.image} />
                                        </div>
                                        <div>
                                            <p> {item.product.title} </p>
                                            <p> {`by ${item.product.brand}`} </p>
                                            <CurrencyFormat
                                                renderText={(value) => (
                                                    <p>
                                                        <strong> {value} </strong>
                                                        <br />
                                                        <span>Quantity: {item.quantity}</span>
                                                    </p>
                                                )}
                                                decimalScale={2}
                                                displayType={"text"}
                                                value={item.product.price}
                                                thousandSeparator={true}
                                                prefix={"₹"}
                                                fixedDecimalScale={true}
                                            />
                                        </div>
                                    </div>)
                                }
                            </div>
                        </div>

                    </div>
                    <div className="placeOrderContentRight">
                        <div>
                            <button onClick={onContinue}>Place Your Order and Pay</button>
                            <h5>Order Summary</h5>
                            <p><span>Items:</span> <CurrencyFormat
                                decimalScale={2}
                                displayType={"text"}
                                value={pendingOrder.itemsTotal}
                                thousandSeparator={true}
                                prefix={"₹"}
                                fixedDecimalScale={true}
                            />
                            </p>
                            <p><span>Delivery:</span> <CurrencyFormat
                                decimalScale={2}
                                displayType={"text"}
                                value={pendingOrder.deliveryCharges}
                                thousandSeparator={true}
                                prefix={"₹"}
                                fixedDecimalScale={true}
                            />
                            </p>
                            <p><span>Gift:</span> ₹0.00 </p>
                            <div className="placeOrderLineDivider"></div>
                            <h4><span>Order Total:</span> <CurrencyFormat
                                decimalScale={2}
                                displayType={"text"}
                                value={pendingOrder.orderTotal}
                                thousandSeparator={true}
                                prefix={"₹"}
                                fixedDecimalScale={true}
                            /></h4>
                            <div className="placeOrderLineDivider"></div>
                        </div>
                    </div>
                </div>
                <div className="placeOrderShadowDivider"></div>
            </div>
        </div>
    );
}