import Api from './Api';
import storage from '../storage/storage'

const url = "/dondathang";

const payment = (data) => {
    const { name, phone, shipAddress, email, dateDelivery, paymentType, cartList } = data
    
    let request = {
        order: {
            name: name,
            username: storage.getItem("tenTK"),
            phone: phone,
            email: email,
            //address: address,
            shipAddress: shipAddress,
            dateDelivery: dateDelivery,
            paymentType: paymentType,
            totalPrice: cartList.reduce((accu, item) => (accu += item.qty * item.donGiaBan), 0)
        },
        cart: cartList
    }
    return Api.post(`${url}/payment`, request)
};

const getDonDatHangByKhachHang = (tenTK, page, size) => {
    return Api.get(`${url}/user-order-management?tenTK=${tenTK}&page=${page}&size=${size}`)
}

const api = { payment, getDonDatHangByKhachHang }
export default api;