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

const filterByDacTrungAndLoaiSP = (filter, pageable) => {
    const { listDacTrung, loaiSP, categories, search, brand } = filter
    const { page, size } = pageable
    const productFilter = {
        "list-dac-trung": listDacTrung,
        "loai-sp": loaiSP,
        "loai-sp-list": categories,
        "ten-sp": search,
        "thuong-hieu": brand
    }
    return Api.post(`${url}/filter?page=${page}&size=${size}`, productFilter);
}

const getByParentLoaiSP = (loaiSP, pageable) => {
    const { page, size } = pageable
    return Api.post(`${url}/category?page=${page}&size=${size}`, loaiSP);
}

const api = { getAll, getNewOrderByThoiGianNhap, getAllPaging, getById, getSanPhamByDacTrungs, filterByDacTrungAndLoaiSP, getByParentLoaiSP }
export default api;