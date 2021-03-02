import axios from "axios";

export const signup = async (user) => {
    try {
        const response = await axios.post('/api/users', {
            name: user.name,
            email: user.email,
            password: user.password
        });
        return response;
    }
    catch (er) {
        return er.response;
    }
}

export const login = async (user) => {
    try {
        const response = await axios.post('/api/sessions', {
            email: user.email,
            password: user.password
        });
        return response;
    }
    catch (er) {
        return er.response;
    }
}

export const logout = async (user) => {
    try {
        const response = await axios.delete('/api/sessions');
        return response;
    }
    catch (er) {
        return er.response;
    }
}

export const getCurrentUser = async () => {
    try {
        const response = await axios.get("/api/sessions");
        return response;
    }
    catch (er) {
        return er.response;
    }
}