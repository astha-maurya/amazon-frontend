import * as apiUtil from "../apiUtil/session";

export const RECIEVE_CURRENT_USER = "RECIEVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";

const recieveCurrentUser = (user) => ({
    type: RECIEVE_CURRENT_USER,
    user
});

const logoutCurrentUser = (user = null) => ({
    type: LOGOUT_CURRENT_USER,
    user
});

export const signup = (user) => async (dispatch) => {
    try {
        const response = await apiUtil.signup(user);

        if (response.statusText === "OK") dispatch(recieveCurrentUser(response.data));
        else return (response.data);
    } catch (er) {
        console.log(er);
    }
}

export const login = (user) => async (dispatch) => {
    try {
        const response = await apiUtil.login(user);

        if (response.statusText === "OK") dispatch(recieveCurrentUser(response.data));
        else return (response.data);
    } catch (er) {
        console.log(er);
    }
}

export const logout = () => async (dispatch) => {
    try {
        const response = await apiUtil.logout();

        if (response.statusText === "OK") dispatch(logoutCurrentUser(null));
        else return (response.data);
    } catch (er) {
        console.log(er);
    }
}

export const getCurrentUser = () => async (dispatch) => {
    try {
        const response = await apiUtil.getCurrentUser();
        if (response.statusText === "OK") dispatch(recieveCurrentUser(response.data));
        else return response.data;
    }
    catch (er) {
        console.log(er);
    }
}