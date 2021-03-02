import { CREATE_PENDING_ORDER, UPDATE_PENDING_ORDER, REMOVE_PENDING_ORDER, GET_PENDING_ORDER } from "../actions/pendingOrder";

export const pendingOrderInitialState = {
    pendingOrder: {}
}

export const pendingOrderReducer = (state = pendingOrderInitialState, action) => {

    let pendingOrder;
    switch (action.type) {
        case CREATE_PENDING_ORDER:
            pendingOrder = action.pendingOrder;
            return { ...state, pendingOrder };
        case REMOVE_PENDING_ORDER:
            pendingOrder = {}
            return { ...state, pendingOrder };
        case UPDATE_PENDING_ORDER:
            pendingOrder = action.pendingOrder;
            return { ...state, pendingOrder };
        case GET_PENDING_ORDER:
            pendingOrder = action.pendingOrder;
            return { ...state, pendingOrder }
        default:
            return state;
    }

}