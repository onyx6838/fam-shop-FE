import React, { useState } from 'react'
import '../assets/css/bootstrap.css';
import '../assets/css/style.css';
import '../assets/css/popuo-box.css';
import '../assets/css/fontawesome-all.css';
import { Col, Row } from 'react-bootstrap';
import img from '../assets/images/blog-single.jpg'

import { useNavigate } from 'react-router-dom';

import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';
import { setRefreshToken, setRememberMe, setToken, setUserInfo } from '../redux/store/user';

import UserApi from '../api/UserApi'
import storage from '../storage/storage';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [isRememberMe, setRemember] = useState(useSelector(state => state.user.isRememberMe));

    const LoginSchema = Yup.object().shape({
        username: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        password: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required')
    })

    return (
        <div className="container py-md-5 py-4">
            <div className="row align-items-center justify-content-between">
                <div className="col-lg-6 about-2-secs-left pr-lg-5">
                    <h3 className="title-style-2 mb-sm-3 mb-2">
                        <span className="font-weight-bold">Đăng nhập</span>
                    </h3>
                    <Formik
                        initialValues={{ username: '', password: '' }}
                        validationSchema={LoginSchema}
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
                                navigate("/home")
                            }
                            catch (error) {
                                if (error.status === 401) {
                                    console.log(error);
                                } else {
                                    console.log(error);
                                }
                            }
                            // dispatch(fetchLogin(values))
                            // dispatch(setAuth(true))
                            // dispatch(setRememberMe(values.rememberMe))
                        }}
                        validateOnChange={false}
                        validateOnBlur={false}
                    >
                        {props => (
                            <form className="signin-form" onSubmit={props.handleSubmit}>
                                <Row className="contact-block">
                                    <Col lg={12} className="form-group">
                                        <input type="text" name="username"
                                            placeholder="Tên đăng nhập" className="contact-input"
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
                                        <label>
                                            <input type='checkbox' name='rememberMe'
                                                checked={isRememberMe} onChange={e => setRemember(e.target.checked)} />Ghi nhớ
                                        </label>
                                    </Col>
                                </Row>
                                <button className="btn btn-style mr-1" type="submit" disabled={props.isSubmitting}>Đăng nhập</button>
                                <button className="btn btn-style" onClick={() => navigate("/")}>Về trang chủ</button>
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

export default Login