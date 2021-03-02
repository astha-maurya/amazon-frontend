import axios from "axios";

export const getOrderHistory = async () => {
    try {
        const response = await axios.get("/api/users/order-history");
        return response;
    }
    catch (er) {
        return er.response;
    }
}