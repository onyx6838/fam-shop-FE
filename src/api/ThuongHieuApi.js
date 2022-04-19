import Api from './Api';

const url = "/thuonghieu";

const getBrandByFilter = (filter) => {
    const { loaiSP, categories, search } = filter
    const productFilter = {
        "list-dac-trung": [],
        "loai-sp": loaiSP,
        "loai-sp-list": categories,
        "ten-sp": search
    }
    return Api.post(`${url}/brand`, productFilter);
}

const api = { getBrandByFilter }
export default api;