import React from 'react'
import '../../assets/css/bootstrap.css'
import '../../assets/css/style.css'
import '../../assets/css/popuo-box.css'
import '../../assets/css/fontawesome-all.css'
import { Col, Container, Row } from 'react-bootstrap'

import cart from '../../assets/images/cart.png'
import { Link } from 'react-router-dom'

const formStyle = {
    maxWidth: '600px'
};

const HeaderBottom = () => {
    return (
        <div className="header-bot my-md-4 my-3" id="site-header">
            <Container>
                <Row className="header-bot_inner_wthreeinfo_header_mid align-items-center">
                    <Col lg={3} md={4} className="logo_agile">
                        <h1>
                            <Link to="/home"><span>F</span>am <span>S</span>hop</Link>
                        </h1>
                    </Col>
                    <Col lg={9} md={8} className="header">
                        <Row>
                            <Col lg={9} sm={8} className="agileits_search">
                                <form className="form-inline" action="#" method="post" style={formStyle}>
                                    <input className="form-control" type="search"
                                        placeholder="Tìm kiếm sản phẩm ..." aria-label="Search" required />
                                    <button className="btn" type="submit"><i className="fa fa-search"
                                        aria-hidden="true"></i></button>
                                </form>
                            </Col>

                            <Col lg={3} sm={4} className="top_nav_right text-center mt-sm-0 mt-2 d-flex align-items-center justify-content-between">
                                <div className="wthreecartaits wthreecartaits2 cart cart box_1">
                                    <button className="btn w3view-cart p-0" type="submit" name="submit" value="">
                                        <Link to="/cart">
                                            <img src={cart} alt="cart" className="img-fluid" /> Giỏ hàng
                                        </Link>
                                    </button>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default HeaderBottom