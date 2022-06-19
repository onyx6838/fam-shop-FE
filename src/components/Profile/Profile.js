import { useFormik } from 'formik';
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import UserApi from '../../api/UserApi'

import Swal from "sweetalert2";
import validator from '../../utils/YupValidator'
import { useSelector } from 'react-redux';

const Profile = () => {
  const userInfo = useSelector(state => state.user.userInfo)

  const onSubmitFormProfile = (values, { resetForm }) => {
    const response = UserApi.changeProfile(values)
    response.then((rs) => {
      Swal.fire({
        title: 'Thay đổi thông tin cá nhân thành công !!!',
        width: 600,
        timer: 2000,
        padding: '3em',
        color: '#716add'
      })
      resetForm();
    })
  }

  const formik = useFormik({
    initialValues: {
      hoTen: userInfo.hoTen,
      email: userInfo.email,
      diaChi: ''
    },
    validationSchema: validator.ProfileSchema,
    onSubmit: onSubmitFormProfile,
    validateOnChange: false,
    validateOnBlur: false
  });

  return (
    <div className="input-grids">
      <h3 className="aside-title">Thông tin tài khoản</h3>
      <form onSubmit={formik.handleSubmit}>
        <Row>
          <Col lg={12} className="form-group row">
            <label className="col-lg-2 col-form-label">Họ Tên</label>
            <input type="text" name="hoTen" className="form-control col-lg-10" placeholder="Họ tên"
              onChange={formik.handleChange}
              value={formik.values.hoTen} />
            <span className='col-lg-2'></span>
            {formik.errors.hoTen && formik.touched.hoTen ? <span className='col-lg-10 text-danger'>{formik.errors.hoTen}</span> : null}
          </Col>
          <Col lg={12} className="form-group row">
            <label className="col-lg-2 col-form-label">Email</label>
            <input type="text" name="email" className="form-control col-lg-10" placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email} />
            <span className='col-lg-2'></span>
            {formik.errors.email && formik.touched.email ? <span className='col-lg-10 text-danger'>{formik.errors.email}</span> : null}
          </Col>
          <Col lg={12} className="form-group row">
            <label className="col-lg-2 col-form-label">Địa chỉ</label>
            <input type="text" name="diaChi" className="form-control col-lg-10" placeholder="Địa chỉ"
              onChange={formik.handleChange}
              value={formik.values.diaChi} />
            <span className='col-lg-2'></span>
            {formik.errors.diaChi && formik.touched.diaChi ? <span className='col-lg-10 text-danger'>{formik.errors.diaChi}</span> : null}
          </Col>
        </Row>
        <div className="text-left">
          <button className="btn btn-style btn-primary" type='submit'>Cập nhật</button>
        </div>
      </form>
    </div>
  )
}

export default Profile