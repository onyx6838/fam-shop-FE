import Api from './Api';

const url = "/giohang";

const getAll = () => {
    return Api.get(`${url}`);
};

const addToCart = (form) => {
    return Api.post(`${url}/add-to-cart`, form);
}

const changeQuantityToCart = (form) => {
    return Api.post(`${url}/change-qty-cart`, form);
}

const removeFromCart = (form) => {
    return Api.post(`${url}/remove-from-cart`, form);
}

const saveLocalCartToUser = (form) => {
    return Api.post(`${url}/save-local-cart`, form);
}

const syncCartWithUser = (form) => {
    return Api.post(`${url}/get-sync-cart`, form);
}

const api = { getAll, addToCart, changeQuantityToCart, removeFromCart, saveLocalCartToUser, syncCartWithUser }
export default api;