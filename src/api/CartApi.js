import Api from './Api';

const url = "/giohang";

const getAll = () => {
    return Api.get(`${url}`);
};

const api = { getAll }
export default api;