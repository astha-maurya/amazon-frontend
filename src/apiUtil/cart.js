import axios from "axios";

export const addToCart = async (p) => {
    try {
        const response = await axios.post('/api/users/cart', { product: p._id });
        return response;
    }
    catch (er) {
        return er.response;
    }
}

export const removeFromCart = async (p) => {
    try {
        const response = await axios.delete('/api/users/cart', { params: { product: p._id } });
        return response;
    }
    catch (er) {
        return er.response;
    }
}

export const updateQuantityInCart = async (p, q) => {
    try {
        const response = await axios.put('/api/users/cart', { product: p._id, quantity: q });
        return response;
    }
    catch (er) {
        return er.response;
    }
}

export const getCart = async () => {
    try {
        const response = await axios.get("/api/users/cart");
        return response;
    }
    catch (er) {
        return er.response;
    }
}