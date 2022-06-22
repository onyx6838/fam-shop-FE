import React, { useState } from 'react'
import '../assets/css/bootstrap.css';
import '../assets/css/style.css';
import '../assets/css/popuo-box.css';
import '../assets/css/fontawesome-all.css';
import { Col, Row, Card } from 'react-bootstrap';
import img from '../assets/images/blog-single.jpg'

import { useNavigate } from 'react-router-dom';

import { ErrorMessage, Formik } from 'formik';

import { useDispatch, useSelector } from 'react-redux';
import { setRefreshToken, setRememberMe, setToken, setUserInfo } from '../redux/store/user';

import UserApi from '../api/UserApi'
import storage from '../storage/storage';
import { saveLocalCart } from '../redux/store/cart';

import Swal from "sweetalert2";

import validator from '../utils/YupValidator';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart.cart)

    const [isRememberMe, setRemember] = useState(useSelector(state => state.user.isRememberMe));

    return (
        <div className="container py-md-5 py-4">
            <div className="row align-items-center justify-content-between">
                <div className="col-lg-6 about-2-secs-left pr-lg-5">
                    <h3 className="title-style-2 mb-sm-3 mb-2">
                        <span className="font-weight-bold">Đăng nhập</span>
                    </h3>
                    <Card>
                        <Card.Body>
                            <Formik
                                initialValues={{ username: '', password: '' }}
                                validationSchema={validator.LoginSchema}
                                onSubmit={async (values) => {
                                    try {
                                        const user = await UserApi.login(values.username, values.password);
                                        storage.setRememberMe(isRememberMe);
                                        storage.setToken(user.token)
                                        storage.setRefreshToken(user.refreshToken)
                                        storage.setUserInfo(user)

                                        dispatch(setRememberMe(isRememberMe))
                                        dispatch(setUserInfo(user))
                                        dispatch(setToken(user.token))
                                        dispatch(setRefreshToken(user.refreshToken))
                                        // synchronize cart to db
                                        if (cart.length > 0) {
                                            dispatch(saveLocalCart({
                                                tenTK: values.username,
                                                cart: cart
                                            }))
                                        }
                                        navigate("/home")
                                    }
                                    catch (error) {
                                        if (error.status === 401) {
                                            console.log(error);
                                            Swal.fire({
                                                position: 'top-end',
                                                icon: 'error',
                                                title: 'Sai tài khoản hoặc mật khẩu !!!',
                                                showConfirmButton: false,
                                                timer: 1500
                                            })
                                        } else {
                                            console.log(error);
                                        }
                                    }
                                }}
                                validateOnChange={false}
                                validateOnBlur={false}
                            >
                                {props => (
                                    <form className="signin-form" onSubmit={props.handleSubmit}>
                                        <Row className="contact-block">
                                            <Col lg={12} className="form-group">
                                                <input type="text" name="username"
                                                    placeholder="Tên đăng nhập hoặc SĐT" className="contact-input"
                                                    onChange={props.handleChange}
                                                    onBlur={props.handleBlur}
                                                    value={props.values.username} />
                                            </Col>
                                            <Col lg={12}><ErrorMessage name="username" /></Col>
                                            <Col lg={12} className="form-group">
                                                <input type="password" name="password"
                                                    placeholder="Mật khẩu" className="contact-input"
                                                    onChange={props.handleChange}
                                                    onBlur={props.handleBlur}
                                                    value={props.values.password} />
                                            </Col>
                                            <Col lg={12}><ErrorMessage name="password" /></Col>
                                            <Col lg={12}>
                                                <Row>
                                                    <Col lg={6}>
                                                        <label style={{ 'float': 'left' }}>Ghi nhớ</label>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <input type='checkbox' name='rememberMe'
                                                            checked={isRememberMe} onChange={e => setRemember(e.target.checked)} />
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <button className="btn btn-style mr-1" type="submit" disabled={props.isSubmitting}>Đăng nhập</button>
                                        <button className="btn btn-style mr-1" onClick={() => navigate("/")}>Về trang chủ</button>
                                        <button className="btn btn-style" onClick={() => navigate("/register")}>Đăng ký</button>
                                    </form>
                                )}
                            </Formik>
                        </Card.Body>
                    </Card>

                </div>
                <div className="col-lg-6 about-2-secs-right mt-lg-0 mt-5">
                    <img src={img} alt="" className="img-fluid img-responsive" />
                </div>
            </div>
        </div>
    )
}

export default Login