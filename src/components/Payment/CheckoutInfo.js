import React from 'react'

const CheckoutInfo = ({ cartList }) => {
    return (
        <div className="cont-details">
            <div className="d-flex contact-grid">

                <div className="cont-left text-center mr-3">
                    <span className="fa fa-info-circle"></span>
                </div>
                <div className="cont-right">
                    <h6>Thông tin đơn hàng</h6>
                    <p>- Tạm tính ({`${cartList.length} sản phẩm`})</p>
                </div>
            </div>
            <div className="d-flex contact-grid mt-4 pt-lg-2">
                <div className="cont-left text-center mr-3">
                    <span className="fa fa-cart-arrow-down"></span>
                </div>
                <div className="cont-right">
                    <h6>Tổng cộng:</h6>
                    <p style={{ color: '#fdb03d' }}>
                        {
                            cartList.reduce((accu, item) => (accu += item.qty * item.donGiaBan), 0)
                        } đ
                    </p>
                </div>
            </div>
            <div className="d-flex contact-grid mt-4 pt-lg-2">
                <div className="cont-left text-center mr-3">
                    <span className="fa fa-info-circle"></span>
                </div>
                <div className="cont-right">
                    <h6>Ngân hàng</h6>
                    <p>SHB (Đoàn Minh Giang)</p>
                    <p>STK: 1000020009</p>
                </div>
            </div>
        </div>
    )
}

export default CheckoutInfo