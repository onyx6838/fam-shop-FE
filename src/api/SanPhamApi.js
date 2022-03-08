import Api from './Api';

const url = "/sanphams";

const getAll = (page, size) => {

    const parameters = {
        page,
        size
    }

    return Api.get(`${url}`, { params: parameters });
};

const getAllPaging = (params) => {
    return Api.get(`${url}`, { params });
};

const getSanPhamByDacTrungs = (data) => {
    console.log(data);
    return Api.post(`${url}/filter`, data, {
        params: {
            size: 6
        }
    });
};

const getNewOrderByThoiGianNhap = (page, size) => {
    const parameters = {
        page,
        size
    }

    return Api.get(`${url}/new`, { params: parameters });
}

const getById = (id) => {
    return Api.get(`${url}/${id}`);
};

const api = { getAll, getNewOrderByThoiGianNhap, getAllPaging, getById, getSanPhamByDacTrungs }
export default api;