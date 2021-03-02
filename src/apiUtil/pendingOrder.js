import axios from "axios";

export const createPendingOrder = async () => {
    try {
        const response = await axios.post('/api/users/checkout/pending-order/create');
        return response;
    }
    catch (er) {
        return er.response;
    }
}

export const removePendingOrder = async () => {
    try {
        const response = await axios.delete('/api/users/checkout/pending-order');
        return response;
    }
    catch (er) {
        return er.response;
    }
}

export const updatePendingOrderShipAddress = async (addressId) => {
    try {
        const response = await axios.post('/api/users/checkout/pending-order/ship-address', { addressId });
        return response;
    }
    catch (er) {
        return er.response;
    }
}

export const updatePendingOrderShipOption = async (delivery) => {
    try {
        const response = await axios.post('/api/users/checkout/pending-order/ship-option', { delivery });
        return response;
    }
    catch (er) {
        return er.response;
    }
}

export const updatePendingOrderPlace = async () => {
    try {
        const response = await axios.post('/api/users/checkout/place-order');
        return response;
    }
    catch (er) {
        return er.response;
    }
}

export const updatePendingOrderPaymentIntent = async (orderId) => {
    try {
        const response = await axios.post('/api/users/checkout/payment/make-payment', { orderId });
        return response;
    }
    catch (er) {
        return er.response;
    }
}

export const updatePendingOrderPaymentStatus = async (orderId) => {
    try {
        const response = await axios.post('/api/users/checkout/payment/update-status', { orderId });
        return response;
    }
    catch (er) {
        return er.response;
    }
}

export const getPendingOrder = async () => {
    try {
        const response = await axios.get('/api/users/checkout/pending-order');
        return response;
    }
    catch (er) {
        return er.response;
    }
}