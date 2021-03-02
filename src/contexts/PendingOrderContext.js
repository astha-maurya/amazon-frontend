import React, { useContext, createContext, useReducer } from 'react';

const PendingOrderContext = createContext();

export const PendingOrderContextProvider = ({ reducer, initialState, children }) => {
    return (
        <PendingOrderContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </PendingOrderContext.Provider>
    );
}

export const usePendingOrderContext = () => useContext(PendingOrderContext);