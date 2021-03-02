import * as apiUtil from "../apiUtil/cart";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const GET_CART = "GET_CART";
export const UPDATE_QUANTITY = "UPDATE_QUANTITY";

const addAction = (product) => ({
    type: ADD_TO_CART,
    product
});

const removeAction = (product) => ({
    type: REMOVE_FROM_CART,
    product
});

const getAction = (cart) => ({
    type: GET_CART,
    cart
});

const updateAction = (product, change) => ({
    type: UPDATE_QUANTITY,
    product,
    change
})

export const addToCart = (product) => async (dispatch) => {
    try {
        const response = await apiUtil.addToCart(product);

        if (response.statusText === "OK")
            dispatch(addAction(product));
    } catch (er) {
        console.log(er);
    }
}

export const removeFromCart = (product) => async (dispatch) => {
    try {
        const response = await apiUtil.removeFromCart(product);

        if (response.statusText === "OK")
            dispatch(removeAction(product));
    } catch (er) {
        console.log(er);
    }
}

export const updateQuantityInCart = (product, quantity, change) => async (dispatch) => {
    try {
        const response = await apiUtil.updateQuantityInCart(product, quantity);

        if (response.statusText === "OK")
            dispatch(updateAction(product, change));
    } catch (er) {
        console.log(er);
    }
}

export const getCart = () => async (dispatch) => {
    try {
        const response = await apiUtil.getCart();

        if (response.statusText === "OK")
            dispatch(getAction(response.data));
    } catch (er) {
        console.log(er);
    }
}

export const emptyCart = () => async (dispatch) => {
    dispatch(getAction([]));
}