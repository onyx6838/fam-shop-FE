import Api from './Api';

const url = "/danhgia";

const createDanhGia = (form) => {
    return Api.post(`${url}/create`, form);
};

const getChildDanhGias = (maDanhGiaCha) => {
    return Api.get(`${url}/child/${maDanhGiaCha}`);
};

const getAllParentDanhGia = (page, size, maSP) => {
    const parameters = {
        page,
        size
    }
    return Api.get(`${url}/${maSP}`, { params: parameters });
};

const api = { createDanhGia, getAllParentDanhGia, getChildDanhGias }
export default api;