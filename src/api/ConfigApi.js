import Api from './Api';

const url = "/files";

const getDistrictFromXML = () => {
    return Api.get(`${url}/xml/districts`);
};

const getPrecinctByDistrictId = (districtId) => {
    return Api.get(`${url}/xml/districts/${districtId}`);
}

const api = { getDistrictFromXML, getPrecinctByDistrictId }
export default api;