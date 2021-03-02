import * as apiUtil from "../apiUtil/search";

export const getSearchResult = async (k) => {
    try {
        const response = await apiUtil.getSearchResult(k);

        if (response.statusText === "OK")
            return ({ res: response.data, er: null });
        else
            return ({ res: null, er: response.data });
    } catch (er) {
        console.log(er);
    }
}