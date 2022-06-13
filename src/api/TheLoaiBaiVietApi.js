import Api from './Api';

const url = "/theloaibaiviet";

const getAllWP = () => {
    return Api.get(`${url}/listwp`);
};

const api = { getAllWP }
export default api;