import axios from "axios";

export const addNewAddress = async (address) => {
    try {
        const response = await axios.post('/api/users/address', { ...address });
        return response;
    }
    catch (er) {
        return er.response;
    }
}

export const deleteAddress = async (addressId) => {
    try {
        const response = await axios.delete('/api/users/address', { params: { addressId } });
        return response;
    }
    catch (er) {
        return er.response;
    }
}

export const editAddress = async (addressId, address) => {
    try {
        const response = await axios.put('/api/users/address', { ...address }, { params: { addressId } });
        return response;
    }
    catch (er) {
        return er.response;
    }
}

export const getAddress = async () => {
    try {
        const response = await axios.get("/api/users/address");
        return response;
    }
    catch (er) {
        return er.response;
    }
}