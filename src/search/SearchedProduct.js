import React from 'react';
import { Link } from "react-router-dom";
import "./SearchedProduct.css";
import StarBorder from "@material-ui/icons/StarBorder";
import Star from "@material-ui/icons/Star";
import { useCartContext } from "../contexts/CartContext";
import { addToCart } from "../actions/cart";

function SearchedProduct({ info }) {
    const [{ cart }, dispatchCart] = useCartContext();
    const { title, image, price, rating, brand, _id } = info;
    const product = {
        title, image, price, rating, brand, _id
    };

    return (
        <div className="searchedProduct">
            <div>
                <div>
                    <img src={image} />
                </div>
            </div>
            <div className="searchedProductInfo">
                <p className="searchedProductBrand">{brand}</p>
                <p className="searchedProductTitle">{title}</p>
                <p className="searchedProductPrice">
                    <small>₹</small>
                    <strong>{price}</strong>
                </p>
                <div className="searchedProductRating">
                    {
                        Array(rating)
                            .fill()
                            .map(v => <p className="searchedProductRatingStar"> <Star /> </p>)
                    }
                    {
                        Array(5 - rating)
                            .fill()
                            .map(v => <p className="searchedProductRatingStar"> <StarBorder /> </p>)
                    }
                </div>
            </div>
            <button onClick={() => addToCart(product)(dispatchCart)}>Add to Cart</button>
        </div>
    );
}

export default SearchedProduct;