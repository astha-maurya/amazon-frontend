import React, { useState } from 'react';
import StarBorder from "@material-ui/icons/StarBorder";
import Star from "@material-ui/icons/Star";
import "./CheckoutProduct.css";
import { removeFromCart, updateQuantityInCart } from "../actions/cart";
import { useCartContext } from "../contexts/CartContext"
import LoadingNeeded from '../utilComponents/LoadingNeeded';

export default function CheckoutProduct({ _id, title, image, price, rating, brand, quantity }) {
    const [isLoading, setLoading] = useState(false);
    const [{ cart }, dispatchCart] = useCartContext();
    const [quantityOption, setQuantityOption] = useState(quantity);
    const [quantityInputType, setQuantityInputType] = useState(quantity < 10 ? "dropdown" : "textbox");
    const product = {
        _id, title, image, price, rating, brand
    };

    const quantityHandlerDropdown = (e) => {
        const newQuantity = e.target.value;
        if (newQuantity == 10) setQuantityInputType("textbox");
        else {
            const change = newQuantity - quantity;
            setQuantityOption(newQuantity);
            setLoading(true);
            updateQuantityInCart(product, newQuantity, change)(dispatchCart)
                .then(() => setLoading(false));
        }
    }

    const quantityHandlerInputText = (e) => {
        const newQuantity = e.target.value;
        if (newQuantity.match(/^[1-9]/) || newQuantity == "") {
            setQuantityOption(newQuantity);
        }
    }

    const quantityHandlerInputSubmit = () => {
        const newQuantity = String(quantityOption);
        if (newQuantity.match(/^[0-9]/)) {
            setLoading(true);
            updateQuantityInCart(product, quantityOption, parseInt(quantityOption) - quantity)(dispatchCart)
                .then(() => setLoading(false));
        }
        else setQuantityOption(quantity);
        if (quantityOption < 10) setQuantityInputType("dropdown");
    }

    const onDelete = () => {
        setLoading(true);
        removeFromCart(product)(dispatchCart);
    }

    return (
        <div className="checkoutProduct">
            <LoadingNeeded isComponentLoading={isLoading} overlay={true}>
                <img className="checkoutProductImage" src={image} />
                <div className="checkoutProductInfo">
                    <p className="checkoutProductTitle">{title} <span>By {brand}</span></p>
                    <div className="checkoutProductRating">
                        {
                            Array(rating)
                                .fill()
                                .map(v => <p className="checkoutProductRatingStar"> <Star /> </p>)
                        }
                        {
                            Array(5 - rating)
                                .fill()
                                .map(v => <p className="checkoutProductRatingStar"> <StarBorder /> </p>)
                        }
                    </div>

                    <div className={`checkoutProductQuantityDropdown ${quantityInputType === "dropdown" ? "" : "hidden"}`}>
                        <span>Qty :</span>
                        <select className="checkoutProductQuantityDropdownOptions" onChange={quantityHandlerDropdown} value={quantityOption}>
                            {
                                Array(11)
                                    .fill()
                                    .map((v, i) => <option value={i}> {i} {i == 10 ? "+" : ""} </option>)
                            }
                        </select>
                    </div>
                    <div className={`checkoutProductQuantityInput ${quantityInputType === "textbox" ? "" : "hidden"}`}>
                        <input min={0} onChange={quantityHandlerInputText} value={quantityOption} />
                        <button onClick={quantityHandlerInputSubmit}>Update</button>
                    </div>
                    <span className="checkoutProductSeperator">|</span>
                    <button onClick={onDelete}>Delete</button>
                </div>
                <div className="checkoutProductPrice">
                    <small>₹</small>{price}
                </div>
            </LoadingNeeded>
        </div>
    );
}