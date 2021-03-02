import React, { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link, useHistory } from "react-router-dom";
import { getOrderHistory } from '../actions/orderHistory';
import "./OrderBlock.css";

function OrderBlock({ order }) {
    const { _id, shippingAddress, created, status, items, orderTotal } = order;
    const history = useHistory();
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const creationTime = new Date(created);

    const retryPayment = () => {
        history.push(`/buy/payment/${_id}`)
    }

    return (
        <div className="orderBlock">
            <div className="orderBlockHeader">
                <div className="orderBlockPlacedDate">
                    <div>ORDER PLACED</div>
                    <div> {`${creationTime.getDate()} ${month[creationTime.getMonth()]} ${creationTime.getFullYear()}`} </div>
                </div>
                <div className="orderBlockTotal">
                    <div>TOTAL</div>
                    <div> ₹{orderTotal} </div>
                </div>
                <div className="orderBlockShipTo">
                    <div>SHIP TO</div>
                    <div> {shippingAddress.name} </div>
                </div>
                <div className="orderBlockId">
                    <div>ORDER ID</div>
                    <div> {_id} </div>
                </div>
            </div>
            <div className="orderBlockContent">
                <div className="orderBlockStatus">
                    {status === "payment-pending" ?
                        <h3>Payment Pending</h3> :
                        (status === "payment-failed" ?
                            <h3 className="orderBlockStatusPaymentFailed">Payment Failed</h3> :
                            <h3 className="orderBlockStatusProcessing">Processing</h3>)}
                    {status === "payment-failed" ?
                        <button onClick={retryPayment}>Retry Payment</button> : ""}
                </div>
                <div className="orderBlockProductsFlex">
                    {
                        order.items.map((item) =>
                            <div className="orderBlockProduct">
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
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default OrderBlock;