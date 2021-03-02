import React from 'react';
import { useCartContext } from '../contexts/CartContext';
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";
import { getCartTotal, cartSize } from '../reducers/cartReducer';
import CurrencyFormat from "react-currency-format";
import { Link } from 'react-router-dom';

export default function Checkout() {
    const [{ cart }, dispatch] = useCartContext();
    return (
        <div className="checkout" >
            <div className="checkoutHeader">
                <p>Pay faster for all your shopping needs <span>with Amazon Pay balance</span> </p>
                <p>Get Instant refund on cancellations | Zero payment failures</p>
            </div>
            <div className="checkoutBlock">
                {cart.length === 0 ? (
                    <div className="checkoutCartEmpty">
                        <img
                            src="https://m.media-amazon.com/images/G/31/cart/empty/kettle-desaturated._CB424694257_.svg"
                            alt="emptyCart"
                        />
                        <div>
                            <div>Your Shopping Cart is Empty.</div>
                            <div>
                                <Link to="/">Shop Now!</Link>
                            </div>
                        </div>
                    </div>
                ) : (
                        <>
                            <div className="checkoutLeft">
                                <div className="checkoutCart">
                                    <h2 className="checkoutCartTitle">Shopping Cart:</h2>
                                    {cart.map(item => (
                                        <CheckoutProduct
                                            key={item.product._id}
                                            _id={item.product._id}
                                            title={item.product.title}
                                            price={item.product.price}
                                            rating={item.product.rating}
                                            brand={item.product.brand}
                                            image={item.product.image}
                                            quantity={item.quantity}
                                        />
                                    ))}
                                    <div className="checkoutCartSubtotal">
                                        <CurrencyFormat
                                            renderText={(value) => (
                                                <>
                                                    <p>
                                                        Subtotal({cartSize(cart)} items): <strong> {value} </strong>
                                                    </p>
                                                </>
                                            )}
                                            decimalScale={2}
                                            displayType={"text"}
                                            value={getCartTotal(cart)}
                                            thousandSeparator={true}
                                            prefix={"₹"}
                                            fixedDecimalScale={true}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="checkoutRight">
                                <img src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png" />
                                <Subtotal />
                            </div>
                        </>
                    )}
            </div>
        </div>
    );
}