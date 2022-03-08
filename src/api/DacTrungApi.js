import Api from './Api';

const url = "/dactrung";

const getAll = () => {
    return Api.get(`${url}`);
};

const api = { getAll }
export default api;