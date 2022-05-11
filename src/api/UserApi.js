import Api from './Api';
import FormData from 'form-data';

const url = "/login";

const url1 = "/taikhoan";

const login = (username, password) => {
    var body = new FormData();
    body.append('username', username);
    body.append('password', password);

    return Api.post(`${url}`, body)
};

const register = (form) => {
    return Api.post(`${url1}/register`, form)
}

const api = { login, register }
export default api;