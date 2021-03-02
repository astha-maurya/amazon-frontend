import axios from "axios";

export const getCategoryResult = async (k) => {
    try {
        const response = await axios.get(`/api/category/products/${k}`);
        return response;
    }
    catch (er) {
        return er.response;
    }
}