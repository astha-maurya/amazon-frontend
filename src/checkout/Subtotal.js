import React from 'react';
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useCartContext } from '../contexts/CartContext';
import { getCartTotal, cartSize } from '../reducers/cartReducer';
import { Link, useHistory } from "react-router-dom";
import { usePendingOrderContext } from '../contexts/PendingOrderContext';
import { createPendingOrder } from '../actions/pendingOrder';

function Subtotal() {
    const [{ cart }, dispatchCart] = useCartContext();
    const [{ pendingOrder }, dispatchPendingOrder] = usePendingOrderContext();
    const history = useHistory();

    const onContinue = async () => {
        const { res, er } = await createPendingOrder()(dispatchPendingOrder);
        if (res) history.push('/buy/shipaddressselect');
    }

    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal({cartSize(cart)} items): <strong> {value} </strong>
                        </p>
                        <small className="subtotalGift">
                            <input type="checkbox" /> This item contains a gift.
                        </small>
                    </>
                )}
                decimalScale={2}
                displayType={"text"}
                value={getCartTotal(cart)}
                thousandSeparator={true}
                prefix={"₹"}
                fixedDecimalScale={true}
            />
            <div>
                <button className="proceedToBuyButton" onClick={onContinue}>Proceed to Checkout</button>
            </div>
        </div>
    );
}

export default Subtotal;