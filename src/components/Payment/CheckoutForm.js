import React from 'react'
import { Col, Row } from 'react-bootstrap'

const CheckoutForm = () => {
    return (
        <form action="https://sendmail.w3layouts.com/submitForm" method="post" className="signin-form">
            <div className="input-grids">
                <Row>
                    <Col lg={6} className="form-group">
                        <input type="text" name="w3lName" id="w3lName" placeholder="Họ tên" className="" required="" />
                    </Col>
                    <Col lg={6} className="form-group">
                        <input type="text" name="w3lName" id="w3lName" placeholder="Số điện thoại" className="contact-input" required="" />
                    </Col>
                    <Col lg={12} className="form-group">
                        <input type="text" name="w3lName" id="w3lName" placeholder="Địa chỉ" className="contact-input" required="" />
                    </Col>
                    <Col lg={7} className="form-group">
                        <input type="text" name="w3lSubect" id="w3lSubect" placeholder="Địa chỉ nhận hàng" className="contact-input" required="" />
                    </Col>
                    <Col lg={5} className="form-group">
                        <input type="email" name="w3lSender" id="w3lSender" placeholder="Email" className="contact-input" required="" />
                    </Col>
                    <Col lg={12} className="form-group">
                        <div className="section_room_pay">
                            <select>
                                <option value="">---- Hình thức thanh toán ----</option>
                                <option value="1">Chuyển khoản qua ngân hàng</option>
                                <option value="2">Trả tiền khi nhận hàng</option>
                                <option value="3">Trực tiếp đến cửa hàng</option>
                            </select>
                        </div>
                    </Col>
                </Row>
            </div>
        </form>
    )
}

export default CheckoutForm