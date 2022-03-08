import Api from './Api';

const url = "/loaisanphams";

const getAll = () => {
    return Api.get(`${url}`);
};

const api = { getAll }
export default api;