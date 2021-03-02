import * as apiUtil from "../apiUtil/address";

export const addNewAddress = async (address) => {
    try {
        const response = await apiUtil.addNewAddress(address);

        if (response.statusText === "OK") return ({ res: response.data, er: null });
        else return ({ res: null, er: response.data });
    } catch (er) {
        console.log(er);
    }
}

export const editAddress = async (address) => {
    try {
        const response = await apiUtil.editAddress(address);

        if (response.statusText === "OK") return ({ res: response.data, er: null });
        else return ({ res: null, er: response.data });
    } catch (er) {
        console.log(er);
    }
}

export const deleteAddress = async (addressId) => {
    try {
        const response = await apiUtil.deleteAddress(addressId);

        if (response.statusText === "OK") return ({ res: response.data, er: null });
        else return ({ res: null, er: response.data });
    } catch (er) {
        console.log(er);
    }
}

export const getAddress = async () => {
    try {
        const response = await apiUtil.getAddress();

        if (response.statusText === "OK") return ({ res: response.data, er: null });
        else return ({ res: null, er: response.data });
    }
    catch (er) {
        console.log(er);
    }
}