import React from 'react'

import { Col, Container, Row } from 'react-bootstrap'

import '../assets/css/bootstrap.css';
import '../assets/css/style.css';
import '../assets/css/popuo-box.css';
import '../assets/css/fontawesome-all.css';

import { useSelector } from 'react-redux';
import { selectCart } from '../redux/selectors/cartSelector';
import CartItemPayment from '../components/Payment/CartItemPayment';
import CheckoutForm from '../components/Payment/CheckoutForm';
import CheckoutInfo from '../components/Payment/CheckoutInfo';

const Payment = () => {
    const cartList = useSelector(selectCart);

    const cartRows = cartList.map((item) => (
        <CartItemPayment info={item} key={item.maSP} />
    ))

    return (
        <section className="w3l-contact py-5">
            <Container className="py-md-5 py-4">
                <div className="mx-auto pt-lg-4 pt-md-5 pt-4" style={{ maxWidth: '1000px' }}>
                    <Row className="contact-block">
                        <Col md={8} className="contact-right mt-md-0 mt-4">
                            <h2 className="title-style-2 mb-sm-3 mb-2">
                                <span className="font-weight-bold">Thông Tin Giao Hàng</span>
                            </h2>
                            <CheckoutForm />
                            <div className='w3l-text-11'>
                                <div className="text11-content">
                                    {cartRows}
                                </div>
                            </div>
                        </Col>
                        <Col md={4} className="contact-left">
                            <button className="btn btn-style">Thanh Toán</button>
                            <h3 className="title-style font-weight-bold mb-4">&nbsp;</h3>
                            <CheckoutInfo cartList={cartList}/>
                        </Col>
                    </Row>
                </div>
            </Container>
        </section>
    )
}

export default Payment