import Api from './Api';
import storage from '../storage/storage'

const url = "/dondathang";

const payment = (data) => {
    const { name, phone, address, shipAddress, email, dateDelivery, paymentType, cartList } = data
    let request = {
        order: {
            name: name,
            username: storage.getItem("username"),
            phone: phone,
            email: email,
            address: address,
            shipAddress: shipAddress,
            dateDelivery: dateDelivery,
            paymentType: paymentType,
            totalPrice: cartList.reduce((accu, item) => (accu += item.qty * item.donGiaBan), 0)
        },
        cart: cartList
    }
    return Api.post(`${url}/payment`, request)
};

const api = { payment }
export default api;