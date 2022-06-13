import Api from './Api';

const url = "/baiviet";

const getAll = (page, size) => {
    const parameters = { page, size }
    return Api.get(`${url}`, { params: parameters });
};

const getAllByCate = (page, size, cate) => {
    const parameters = { page, size }
    return Api.get(`${url}/${cate}`, { params: parameters });
};

const api = { getAll, getAllByCate }
export default api;