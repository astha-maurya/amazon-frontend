import * as apiUtil from "../apiUtil/category";

export const getCategoryResult = async (k) => {
    try {
        const response = await apiUtil.getCategoryResult(k);

        if (response.statusText === "OK")
            return ({ res: response.data, er: null });
        else
            return ({ res: null, er: response.data });
    } catch (er) {
        console.log(er);
    }
}