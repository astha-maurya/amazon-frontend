import * as apiUtil from "../apiUtil/pendingOrder";

export const CREATE_PENDING_ORDER = "CREATE_PENDING_ORDER";
export const GET_PENDING_ORDER = "GET_PENDING_ORDER";
export const UPDATE_PENDING_ORDER = "UPDATE_PENDING_ORDER";
export const REMOVE_PENDING_ORDER = "REMOVE_PENDING_ORDER";

const createAction = (pendingOrder) => ({
    type: CREATE_PENDING_ORDER,
    pendingOrder
});

const getAction = (pendingOrder) => ({
    type: GET_PENDING_ORDER,
    pendingOrder
});

const updateAction = (pendingOrder) => ({
    type: UPDATE_PENDING_ORDER,
    pendingOrder
});

const removeAction = () => ({
    type: REMOVE_PENDING_ORDER
});


export const createPendingOrder = () => async (dispatch) => {
    try {
        const response = await apiUtil.createPendingOrder();

        if (response.statusText === "OK") {
            dispatch(createAction(response.data));
            return ({ res: response.data, er: null });
        }
        else return ({ res: null, er: response.data });

    } catch (er) {
        console.log(er);
    }
}

export const updatePendingOrderShipAddress = (addressId) => async (dispatch) => {
    try {
        const response = await apiUtil.updatePendingOrderShipAddress(addressId);

        if (response.statusText === "OK") {
            dispatch(updateAction(response.data));
            return ({ res: response.data, er: null });
        }
        else return ({ res: null, er: response.data });
    } catch (er) {
        console.log(er);
    }
}

export const updatePendingOrderShipOption = (delivery) => async (dispatch) => {
    try {
        const response = await apiUtil.updatePendingOrderShipOption(delivery);

        if (response.statusText === "OK") {
            dispatch(updateAction(response.data));
            return ({ res: response.data, er: null });
        }
        else return ({ res: null, er: response.data });
    } catch (er) {
        console.log(er);
    }
}

export const updatePendingOrderPlace = () => async (dispatch) => {
    try {
        const response = await apiUtil.updatePendingOrderPlace();

        if (response.statusText === "OK") {
            dispatch(removeAction());
            return ({ res: response.data, er: null });
        }
        else return ({ res: null, er: response.data });
    } catch (er) {
        console.log(er);
    }
}

export const updatePendingOrderPaymentIntent = async (orderId) => {
    try {
        const response = await apiUtil.updatePendingOrderPaymentIntent(orderId);

        if (response.statusText === "OK")
            return ({ res: response.data, er: null });
        else
            return ({ res: null, er: response.data });
    } catch (er) {
        console.log(er);
    }
}

export const updatePendingOrderPaymentStatus = async (orderId) => {
    try {
        const response = await apiUtil.updatePendingOrderPaymentStatus(orderId);

        if (response.statusText === "OK")
            return ({ res: response.data, er: null });
        else
            return ({ res: null, er: response.data });
    } catch (er) {
        console.log(er);
    }
}

export const getPendingOrder = () => async (dispatch) => {
    try {
        const response = await apiUtil.getPendingOrder();
        dispatch(getAction(response.data));
    } catch (er) {
        console.log(er);
    }
}

export const removePendingOrder = () => async (dispatch) => {
    dispatch(removeAction());
}