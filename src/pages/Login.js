import React from 'react'
import '../assets/css/bootstrap.css';
import '../assets/css/style.css';
import '../assets/css/popuo-box.css';
import '../assets/css/fontawesome-all.css';
import { Col, Row } from 'react-bootstrap';

import img from '../assets/images/blog-single.jpg'

const Login = () => {
    return (
        <div className="container py-md-5 py-4">
            <div className="row align-items-center justify-content-between">
                <div className="col-lg-6 about-2-secs-left pr-lg-5">
                    <h3 className="title-style-2 mb-sm-3 mb-2">
                        <span className="font-weight-bold">Đăng nhập</span>
                    </h3>
                    <form action="/User/Login" method="post" class="signin-form">
                        <Row className="contact-block">
                            <Col lg={12} className="form-group">
                                <input type="text" name="w3lName" id="w3lName" placeholder="Email hoặc Số điện thoại" className="contact-input"/>
                            </Col>
                            <Col lg={12} className="form-group">
                                <input type="text" name="w3lName" id="w3lName" placeholder="Mật khẩu" className="contact-input"/>
                            </Col>
                        </Row>
                        <button className="btn btn-style" type="submit">Login</button>
                    </form>
                </div>
                <div className="col-lg-6 about-2-secs-right mt-lg-0 mt-5">
                    <img src={img} alt="" class="img-fluid img-responsive" />
                </div>
            </div>
        </div>
    )
}

export default Login