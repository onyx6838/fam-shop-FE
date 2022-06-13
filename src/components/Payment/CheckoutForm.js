import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import storage from '../../storage/storage'

import DonDatHangApi from '../../api/DonDatHangApi'

import Swal from "sweetalert2";

import tree from '../../assets/images/trees.png'
import nyanCat from '../../assets/images/gif/nyan-cat.gif'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import ConfigApi from '../../api/ConfigApi'
import moment from 'moment'

const CheckoutForm = ({ cartList }) => {
    const [districtOption, setDistrictOption] = useState([]);
    const [precinctOption, setPrecinctOption] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedPrecinct, setSelectedPrecinct] = useState('');

    useEffect(() => {
        const fetchSelectData = async () => {
            let response = await ConfigApi.getDistrictFromXML();
            setDistrictOption(response)
        }
        fetchSelectData()
    }, [])

    const navigate = useNavigate();

    const CheckoutSchema = Yup.object().shape({
        phone: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required')
    })

    const getPrecinctFromDistrict = async (districtId) => {
        const response = await ConfigApi.getPrecinctByDistrictId(districtId);
        setPrecinctOption(response)
    }

    return (
        <Formik
            initialValues={{
                name: storage.getItem("hoTen"),
                phone: '',
                //address: '',
                shipAddress: '',
                email: '',
                dateDelivery: '',
                paymentType: '',
                dst: '',
                ward: ''
            }}
            validationSchema={CheckoutSchema}
            onSubmit={async (values, actions) => {
                console.log(values);
                let mergeAdd = values.shipAddress + ", " + selectedDistrict + ", " + selectedPrecinct
                values.shipAddress = mergeAdd
                const response = DonDatHangApi.payment({ ...values, cartList })
                response.then((rs) => {
                    Swal.fire({
                        title: 'Thanh toán thành công !!!',
                        width: 600,
                        timer: 2000,
                        padding: '3em',
                        color: '#716add',
                        background: `#fff url(${tree})`,
                        backdrop: `
                          rgba(0,0,123,0.4)
                          url(${nyanCat})
                          left top
                          no-repeat
                        `
                    }).then((rs) => navigate("/payment-success", { state: { replace: true, orderInfo: values } }))
                })
            }}
            validateOnChange={false}
            validateOnBlur={false}
        >
            {props => (
                <form className="signin-form">
                    <div className="input-grids">
                        <Row>
                            <Col lg={6} className="form-group">
                                <label style={{ color: '#fdb03d' }}>Họ tên</label>
                                <input type="text" name="name" placeholder="Họ tên" className=""
                                    value={props.values.name}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur} />
                            </Col>
                            <Col lg={6} className="form-group">
                                <label style={{ color: '#fdb03d' }}>SĐT</label>
                                <input type="text" name="phone" placeholder="Số điện thoại" className="contact-input"
                                    value={props.values.phone}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur} />
                            </Col>
                            <Col lg={12} className="form-group">
                                <div className="section_room_pay">
                                    <select
                                        name='dst'
                                        value={props.values.dst}
                                        onChange={(e) => {
                                            props.handleChange(e)
                                            let index = e.nativeEvent.target.selectedIndex;
                                            setSelectedDistrict(e.nativeEvent.target[index].text)
                                            getPrecinctFromDistrict(e.target.value);
                                        }}
                                        onBlur={props.handleBlur}>
                                        <option value="">---- Chọn Quận Huyện ----</option>
                                        {
                                            districtOption.map(item => (
                                                <option value={`${item.id}`} key={item.id}>{item.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </Col>
                            <Col lg={12} className="form-group mt-3">
                                <div className="section_room_pay">
                                    <select
                                        name='ward'
                                        value={props.values.ward}
                                        onChange={(e) => {
                                            props.handleChange(e)
                                            let index = e.nativeEvent.target.selectedIndex;
                                            setSelectedPrecinct(e.nativeEvent.target[index].text)
                                        }}
                                        onBlur={props.handleBlur}>
                                        <option value="">---- Chọn Phường Xã ----</option>
                                        {
                                            precinctOption.map(item => (
                                                <option value={`${item.id}`} key={item.id}>{item.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </Col>
                            <Col lg={7} className="form-group">
                                <label style={{ color: '#fdb03d' }}>Địa chỉ nhận hàng</label>
                                <input type="text" name="shipAddress" placeholder="Địa chỉ nhận hàng (số nhà, ngõ...)" className="contact-input"
                                    value={props.values.shipAddress}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur} />
                            </Col>
                            <Col lg={5} className="form-group">
                                <label style={{ color: '#fdb03d' }}>Email</label>
                                <input type="email" name="email" placeholder="Email" className="contact-input"
                                    value={props.values.email}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur} />
                            </Col>
                            <Col lg={12} className="form-group">
                                <label style={{ color: '#fdb03d' }}>Thời gian nhận hàng dự kiến</label>
                                <Form.Control type="date" name='dateDelivery'
                                    min={moment(new Date()).format("YYYY-MM-DD")}
                                    value={props.values.dateDelivery}
                                    onChange={props.handleChange} />
                            </Col>
                            <Col lg={12} className="form-group">
                                <div className="section_room_pay">
                                    <select
                                        name='paymentType'
                                        value={props.values.paymentType}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}>
                                        <option value="">---- Hình thức thanh toán ----</option>
                                        <option value="0">Chuyển khoản qua ngân hàng</option>
                                        <option value="1">Trả tiền khi nhận hàng</option>
                                        <option value="2">Trực tiếp đến cửa hàng</option>
                                    </select>
                                </div>
                            </Col>
                            <Col lg={3}>
                                <button type="submit" onClick={props.handleSubmit} className="btn btn-style" disabled={props.isSubmitting}>Thanh Toán</button>
                            </Col>
                        </Row>
                    </div>
                </form>
            )}
        </Formik>
    )
}

export default CheckoutForm