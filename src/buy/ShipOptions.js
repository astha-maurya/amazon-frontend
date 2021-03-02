import React, { useEffect, useState } from 'react';
import CurrencyFormat from "react-currency-format"
import "./ShipOptions.css";
import { useHistory } from "react-router-dom";
import { useCartContext } from '../contexts/CartContext';
import { usePendingOrderContext } from '../contexts/PendingOrderContext';
import { updatePendingOrderShipOption } from '../actions/pendingOrder';


export default function ShipOptions() {
    const [{ cart }, dispatch] = useCartContext();
    const [{ pendingOrder }, dispatchPendingOrder] = usePendingOrderContext();
    const [selectedDeliveryOption, setSelectedDeliveryOption] = useState(() => pendingOrder.delivery || "standard")
    const history = useHistory();

    var d = new Date();
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const onContinue = async () => {
        const { res, er } = await updatePendingOrderShipOption(selectedDeliveryOption)(dispatchPendingOrder);
        if (res) history.push("/buy/placeorder");
    }

    return (
        <div className="shipOptionWrapper">
            <div className="shipOption">
                <div className="shipOptionHeader">
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/x-locale/checkout/checkout-spc-ship-banner._CB485947700_.gif" />
                </div>
                <div className="shipOptionHeader">
                    <h1> Choose your delivery options</h1>
                    <div className="shipOptionContinueWrapper">
                        <button className="shipOptionContinueButton" onClick={onContinue}>Continue</button>
                    </div>
                </div>
                <div className="shipOptionLineDivider"></div>
                <div className="shipOptionContent">
                    <div className="shipOptionContentLeft">
                        <h2>Shipment</h2>
                        <div>
                            <h3>Shipping from Amazon</h3>
                            <img src="https://images-na.ssl-images-amazon.com/images/G/31/marketing/fba/fba-badge_18px._V384100965_.png" />
                        </div>
                        <div className="shipOptionContentAddress">
                            <p> {pendingOrder.shippingAddress.name} </p>
                            <p> {pendingOrder.shippingAddress.line1} </p>
                            <p> {pendingOrder.shippingAddress.line2} </p>
                            <p> {pendingOrder.shippingAddress.city}, {pendingOrder.shippingAddress.state}, {pendingOrder.shippingAddress.pinCode} </p>
                            <p> India </p>
                            <p>Phone: {pendingOrder.shippingAddress.mobileNumber}</p>
                        </div>
                        <div className="shipOptionContentOrderList">

                            {
                                <ul>
                                    {pendingOrder.items.map((i) =>
                                    (<li className="shipOptionContentOrderListItem">
                                        <span>
                                            {i.product.title}
                                        </span>
                                        <span>
                                            {`-${i.product.brand}`}
                                        </span>
                                        <br />
                                        <CurrencyFormat
                                            renderText={(value) => (
                                                <p>
                                                    <strong> {value} </strong> <span>-Quantity: {i.quantity}</span>
                                                </p>
                                            )}
                                            decimalScale={2}
                                            displayType={"text"}
                                            value={i.product.price}
                                            thousandSeparator={true}
                                            prefix={"₹"}
                                            fixedDecimalScale={true}
                                        />
                                    </li>))}
                                </ul>
                            }

                        </div>
                    </div>
                    <div className="shipOptionContentRight">
                        <h3>Choose a delivery Speed</h3>
                        <input type="radio" id="shipSpeedStandard" name="shipSpeed" value="standard" checked={selectedDeliveryOption === "standard" ? true : false} onChange={() => setSelectedDeliveryOption("standard")} />
                        <label htmlFor="shipSpeedStandard"> 5-6 days <span>- FREE delivery for eligible orders</span></label><br />
                        <input type="radio" id="shipSpeedTwoDay" name="shipSpeed" value="express" checked={selectedDeliveryOption === "express" ? true : false} onChange={() => setSelectedDeliveryOption("express")} />
                        <label htmlFor="shipSpeedTwoDay"> By {days[(d.getDay() + 2) % 7]} <span>- Two-Days delivery at ₹80.00</span></label><br />
                        <input type="radio" id="shipSpeedOneDay" name="shipSpeed" value="one-day" checked={selectedDeliveryOption === "one-day" ? true : false} onChange={() => setSelectedDeliveryOption("one-day")} />
                        <label htmlFor="shipSpeedOneDay"> Tomorrow by 9pm <span>- One-Day delivery at ₹100.00</span></label><br /><br />
                        <button type="submit"></button>
                    </div>
                </div>
                <div className="shipOptionLineDivider"></div>
                <div className="shipOptionContinueWrapper">
                    <button className="shipOptionContinueButton" onClick={onContinue}>Continue</button>
                </div>
                <div className="shipOptionShadowDivider"></div>
            </div>
        </div>
    );
}