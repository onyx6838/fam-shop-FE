import Api from './Api';

const url = "/files";

const getDistrictFromXML  = () => {
    return Api.get(`${url}/xml/districts`);
};

const api = { getDistrictFromXML }
export default api;