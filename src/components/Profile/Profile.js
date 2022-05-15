import { useFormik } from 'formik';
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import UserApi from '../../api/UserApi'

import Swal from "sweetalert2";

const Profile = () => {
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
      hoTen: '',
      email: '',
      diaChi: ''
    },
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
            <input type="text" name="hoTen" class="form-control col-lg-10" placeholder="Họ tên"
              onChange={formik.handleChange}
              value={formik.values.hoTen} />
          </Col>
          <Col lg={12} className="form-group row">
            <label className="col-lg-2 col-form-label">Email</label>
            <input type="text" name="email" class="form-control col-lg-10" placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email} />
          </Col>
          <Col lg={12} className="form-group row">
            <label className="col-lg-2 col-form-label">Địa chỉ</label>
            <input type="text" name="diaChi" class="form-control col-lg-10" placeholder="Địa chỉ"
              onChange={formik.handleChange}
              value={formik.values.diaChi} />
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