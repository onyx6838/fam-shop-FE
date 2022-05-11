import React from 'react'
import '../assets/css/bootstrap.css';
import '../assets/css/style.css';
import '../assets/css/popuo-box.css';
import '../assets/css/fontawesome-all.css';
import { Col, Row } from 'react-bootstrap';
import img from '../assets/images/blog-single.jpg'

import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

import { ErrorMessage, Formik } from 'formik';

import UserApi from '../api/UserApi'

const Register = () => {
    const navigate = useNavigate();

    return (
        <div className="container py-md-5 py-4">
            <div className="row align-items-center justify-content-between">
                <div className="col-lg-6 about-2-secs-left pr-lg-5">
                    <h3 className="title-style-2 mb-sm-3 mb-2">
                        <span className="font-weight-bold">Đăng ký</span>
                    </h3>
                    <Formik
                        initialValues={{
                            tenTK: '',
                            matKhau: '',
                            reMatKhau: '',
                            hoTen: '',
                            email: '',
                            sdt: ''
                        }}

                        onSubmit={(values, { setSubmitting }) => {
                            const response = UserApi.register(values)
                            response.then((rs) => {
                                Swal.fire({
                                    title: `Xác nhận tài khoản qua email ${values.email}`,
                                    text: 'Xác nhận',
                                    icon: 'warning',
                                    showCancelButton: false,
                                    confirmButtonColor: '#3085d6',
                                    confirmButtonText: 'Đồng ý'
                                }).then((rs) => {
                                    setSubmitting(false);
                                    navigate("/login")
                                })
                            })
                        }}
                        validateOnChange={false}
                        validateOnBlur={false}
                    >
                        {props => (
                            <form className="signin-form" onSubmit={props.handleSubmit}>
                                <Row className="contact-block">
                                    <Col lg={12} className="form-group">
                                        <input type="text" name="tenTK"
                                            placeholder="Tên đăng nhập" className="contact-input"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.tenTK} />
                                    </Col>
                                    <Col lg={12} className="form-group">
                                        <input type="text" name="email"
                                            placeholder="Email" className="contact-input"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.email} />
                                    </Col>
                                    <Col lg={12} className="form-group">
                                        <input type="text" name="sdt"
                                            placeholder="SDT" className="contact-input"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.sdt} />
                                    </Col>
                                    <Col lg={12}><ErrorMessage name="sdt" /></Col>
                                    <Col lg={12} className="form-group">
                                        <input type="password" name="matKhau"
                                            placeholder="Mật khẩu" className="contact-input"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.matKhau} />
                                    </Col>
                                    <Col lg={12}><ErrorMessage name="matKhau" /></Col>
                                    <Col lg={12} className="form-group">
                                        <input type="password" name="reMatKhau"
                                            placeholder="Nhập lại mật khẩu" className="contact-input"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.reMatKhau} />
                                    </Col>
                                    <Col lg={12}><ErrorMessage name="reMatKhau" /></Col>
                                    <Col lg={12} className="form-group">
                                        <input type="text" name="hoTen"
                                            placeholder="Họ tên" className="contact-input"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.hoTen} />
                                    </Col>
                                    <Col lg={12}><ErrorMessage name="hoTen" /></Col>
                                </Row>
                                <button className="btn btn-style mr-1" type="submit" disabled={props.isSubmitting}>Đăng ký</button>
                            </form>
                        )}
                    </Formik>
                </div>
                <div className="col-lg-6 about-2-secs-right mt-lg-0 mt-5">
                    <img src={img} alt="" className="img-fluid img-responsive" />
                </div>
            </div>
        </div>
    )
}

export default Register