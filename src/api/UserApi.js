import Api from './Api';
import FormData from 'form-data';

const url = "/login";

const url1 = "/taikhoan";

const login = (username, password) => {
    var body = new FormData();
    if(/^\d+$/.test(username)) {
        body.append('phone', username);
    }
    else body.append('username', username);
    body.append('password', password);

    return Api.post(`${url}`, body)
};

const register = (form) => {
    return Api.post(`${url1}/register`, form)
}

const changeProfile = (form) => {
    return Api.post(`${url1}/profile-update`, form)
}

const api = { login, register, changeProfile }
export default api;