import axios from "axios";

export const getSearchResult = async (k) => {
    try {
        const response = await axios.get(`/api/search/${k}`);
        return response;
    }
    catch (er) {
        return er.response;
    }
}