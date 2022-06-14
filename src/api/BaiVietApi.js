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

const getById = (id) => {
    return Api.get(`${url}/detail/${id}`);
};

const api = { getAll, getAllByCate, getById }
export default api;