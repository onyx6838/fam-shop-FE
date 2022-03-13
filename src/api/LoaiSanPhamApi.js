import Api from './Api';

const url = "/loaisanphams";

const getAll = () => {
    return Api.get(`${url}`);
};

const getParentCategory = () => {
    return Api.get(`${url}/parent`);
};

const api = { getAll, getParentCategory }
export default api;