import React, { useContext, createContext, useReducer } from 'react';

const UserContext = createContext();

export const UserContextProvider = ({ reducer, initialState, children }) => {
    return (
        <UserContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => useContext(UserContext);