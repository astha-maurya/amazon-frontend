import * as apiUtil from "../apiUtil/orderHistory";

export const getOrderHistory = async () => {
    try {
        const response = await apiUtil.getOrderHistory();

        if (response.statusText === "OK")
            return ({ res: response.data, er: null });
        else
            return ({ res: null, er: response.data });
    } catch (er) {
        console.log(er);
    }
}