import Api from './Api';

const url = "/dactrung";

const getAll = () => {
    return Api.get(`${url}`);
};

const getFeatureByLoaiSP = (filter) => {
    const { listDacTrung, loaiSP, categories, search } = filter
    const productFilter = {
        "list-dac-trung": listDacTrung,
        "loai-sp": loaiSP,
        "loai-sp-list": categories,
        "ten-sp": search
    }
    return Api.post(`${url}/category`, productFilter);
}

const getDTSPBySanPham = (id) => {
    return Api.get(`${url}/dtsp/${id}`);
};

const api = { getAll, getFeatureByLoaiSP, getDTSPBySanPham }
export default api;