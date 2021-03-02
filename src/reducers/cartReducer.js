import { ADD_TO_CART, REMOVE_FROM_CART, GET_CART, UPDATE_QUANTITY } from "../actions/cart";

export const cartInitialState = {
    cart: []
}

const organiseCart = (cart, product, change) => {
    let flag = 1;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].product._id == product._id) {
            const newProduct = { ...cart[i] };
            if (change == "removeAll") change = - cart[i].quantity;
            newProduct.quantity += change;
            if (newProduct.quantity == 0) cart.splice(i, 1);
            else cart[i] = newProduct;
            flag = 0;
            break;
        }
    }
    if (flag) {
        const newProduct = { product, quantity: 1, price: product.price }
        cart.push(newProduct);
    }

    return cart;
};

export const cartSize = (cart) =>
    cart?.reduce((size, item) => item.quantity + size, 0)


export const getCartTotal = (cart) =>
    cart?.reduce((amount, item) => item.product.price * item.quantity + amount, 0)

export const cartReducer = (state = cartInitialState, action) => {

    let cart = [...state.cart];
    switch (action.type) {
        case ADD_TO_CART:
            cart = organiseCart(cart, action.product, 1);
            return { ...state, cart };
        case REMOVE_FROM_CART:
            cart = organiseCart(cart, action.product, "removeAll");
            return { ...state, cart };
        case UPDATE_QUANTITY:
            cart = organiseCart(cart, action.product, action.change);
            return { ...state, cart };
        case GET_CART:
            cart = [...action.cart];
            return { ...state, cart }
        default:
            return state;
    }
}