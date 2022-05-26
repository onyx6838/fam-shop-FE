import React from 'react'
import '../../assets/css/bootstrap.css'
import '../../assets/css/style.css'
import '../../assets/css/popuo-box.css'
import '../../assets/css/fontawesome-all.css'
import { Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import Swal from 'sweetalert2'
import DanhGiaApi from '../../api/DanhGiaApi'

const CommentForm = ({ maSPDanhGia, maDanhGiaCha, resetBox }) => {
    const userInfo = useSelector(state => state.user.userInfo)

    const onSubmitFormProfile = (values, { resetForm }) => {
        const formWithParentCmt = {
            ...values,
            maSPDanhGia: maSPDanhGia,
            maDanhGiaCha: maDanhGiaCha ? maDanhGiaCha : 0
        }
        Swal.fire({
            title: 'Xác nhận đánh giá',
            text: 'Đánh giá?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                const response = DanhGiaApi.createDanhGia(formWithParentCmt)
                response.then((rs) => {
                    Swal.fire({
                        title: 'Đánh giá thành công !!!',
                        width: 600,
                        timer: 2000,
                        padding: '3em',
                        color: '#716add',
                        background: `#fff`
                    })
                    resetForm();
                    resetBox();
                })
            }
        })
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            tenNguoiDanhGia: userInfo ? userInfo.hoTen : '',
            emailNguoiDanhGia: userInfo ? userInfo.email : '',
            sdtNguoiDanhGia: '',
            noiDung: ''
        },
        onSubmit: onSubmitFormProfile,
        validateOnChange: false,
        validateOnBlur: false
    });

    return (
        <div className="leave-comment-form">
            <form onSubmit={formik.handleSubmit}>
                <div className="input-grids">
                    <div className="row">
                        <Col lg={12} className="form-group row">
                            <label className="col-lg-2 col-form-label">Họ Tên *</label>
                            <input type="text" name="tenNguoiDanhGia" className="form-control col-lg-10" placeholder="Họ tên"
                                onChange={formik.handleChange}
                                value={formik.values.tenNguoiDanhGia} />
                        </Col>
                        <Col lg={12} className="form-group row">
                            <label className="col-lg-2 col-form-label">Email *</label>
                            <input type="text" name="emailNguoiDanhGia" className="form-control col-lg-10" placeholder="Email"
                                onChange={formik.handleChange}
                                value={formik.values.emailNguoiDanhGia} />
                        </Col>
                        <Col lg={12} className="form-group row">
                            <label className="col-lg-2 col-form-label">SĐT *</label>
                            <input type="text" name="sdtNguoiDanhGia" className="form-control col-lg-10" placeholder="SĐT"
                                onChange={formik.handleChange}
                                value={formik.values.sdtNguoiDanhGia} />
                        </Col>
                        <Col lg={12} className="form-group row">
                            <label className="col-lg-2 col-form-label">Nội dung</label>
                            <textarea name="noiDung" className="form-control col-lg-10" placeholder="Nội dung" required=""
                                onChange={formik.handleChange}
                                value={formik.values.noiDung}></textarea>
                        </Col>
                    </div>
                </div>
                <div className="submit text-left">
                    <button className="btn btn-style btn-primary" type='submit'>Gửi nhận xét</button>
                </div>
            </form>
        </div>
    )
}

export default CommentForm