import React, { useContext, createContext, useReducer } from 'react';

const CartContext = createContext();

export const CartContextProvider = ({ reducer, initialState, children }) => {
    return (
        <CartContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </CartContext.Provider>
    );
}

export const useCartContext = () => useContext(CartContext);