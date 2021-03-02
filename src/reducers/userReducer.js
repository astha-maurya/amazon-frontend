import { RECIEVE_CURRENT_USER, LOGOUT_CURRENT_USER } from "../actions/session";

export const userInitialState = {
    user: null
}

export const userReducer = (state, action) => {

    switch (action.type) {
        case RECIEVE_CURRENT_USER:
            return { ...state, user: action.user };
        case LOGOUT_CURRENT_USER:
            return { ...state, user: null };
        default:
            return state;
    }
}