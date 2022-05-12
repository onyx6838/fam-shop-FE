import React from 'react'

const CartItemPayment = ({ info }) => {
    return (
        <div className="info" key={info.maSP}>
            <div className="card bg-light" style={{ color: '#fdb03d' }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        {/* <img src={info && `http://127.0.0.1:8887/${info.hinhAnh}`} className="img-fluid rounded-start" alt="..." /> */}
                        <img src={info.hinhAnh} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-header bg-transparent border-dark">{info.ten}</div>
                        <div className="card-body">
                            <p className="card-text">Giá tiền : {info.donGiaBan}</p>
                            <p className="card-text">Số lượng : {info.qty}</p>
                            <p className="card-text">Tổng : {info.qty * info.donGiaBan}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItemPayment