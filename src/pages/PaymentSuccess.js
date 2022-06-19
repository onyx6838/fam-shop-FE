import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
    const location = useLocation();
    const [order, setOrder] = useState({})
    const [shipAddress, setShipAddress] = useState('')

    useEffect(() => {
        let { orderInfo } = location.state;
        setShipAddress(orderInfo.shipAddress);
        setOrder(orderInfo)
    }, [location.state, order.shipAddress])

    return (
        <>
            <div className="privacy py-sm-5 py-5">
                <div className="container py-md-5 py-4">
                    <i className="fas fa-check fa-7x" style={{ 'color': 'green' }}></i>
                    <h3 className="tittle-w3l text-center mb-lg-5 mb-sm-4 mb-3">Đặt hàng thành công, cảm ơn đã mua hàng</h3>
                    <h5 className="my-md-4 my-3">Thời gian nhận hàng dự kiến: {order.dateDelivery}</h5>
                    <h5 className="my-md-4 my-3">Địa chỉ nhận hàng: {
                        shipAddress.replace(/[^a-zA-Z ]/g, "").trim().length === 0 ? '9 Xuân Thủy Cầu Giấy Hà Nội (địa chỉ cửa hàng)' : shipAddress
                    }</h5>
                    <div className="mt-4">
						<Link className="btn btn-style" to='/' replace>Tiếp tục mua hàng</Link>
					</div>
                </div>
            </div>
        </>
    )
}

export default PaymentSuccess