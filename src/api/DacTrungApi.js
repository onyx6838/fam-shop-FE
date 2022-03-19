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

const api = { getAll, getFeatureByLoaiSP }
export default api;