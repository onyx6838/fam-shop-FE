import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import CartItem from '../components/Cart/CartItem';
import { selectCart } from '../redux/selectors/cartSelector';

const Cart = () => {
    const cartList = useSelector(selectCart);

    const cartRows = cartList.map((item, i) => (
        <CartItem info={item} i={i} key={item.maSP} />
    ))

    return (
        <div className="privacy py-5">
            <Container className="py-md-5 py-4">
                <Row>
                    <Col lg={12}>
                        <div className="checkout-right">
                            <h4 className="mb-sm-4 mb-3">Giỏ hàng của bạn :
                                <span> {cartList.length} Sản Phẩm</span>
                            </h4>
                            <div className="table-responsive">
                                <table className="timetable_sub">
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Hình Ảnh</th>
                                            <th>Số Lượng</th>
                                            <th>Tên Sản Phẩm</th>
                                            <th>Tổng Giá</th>
                                            <th>Xóa Sản Phẩm</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartRows}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <div className="product-single-w3l">
                            <p className="my-3">
                                <i className="far fa-hand-point-right mr-2"></i>
                                Thông Tin Đơn Hàng
                            </p>
                            <ul style={{ color: 'black' }}>
                                <li className="mb-1">
                                    Tạm tính ({cartList.length}) : &nbsp;
                                    {
                                        cartList.reduce((accu, item) =>
                                            (accu += item.qty * item.donGiaBan), 0
                                        )
                                    }
                                </li>
                                <li className="mb-1">
                                    Phí giao hàng
                                </li>
                            </ul>
                            <p className="my-sm-4 my-3">
                                <i className="far fa-hand-point-right mr-2"></i>Tổng Cộng:&nbsp;
                                {
                                    cartList.reduce((accu, item) =>
                                        (accu += item.qty * item.donGiaBan), 0
                                    )
                                }
                            </p>
                        </div>
                        <div className="checkout-left">
                            <div className="address_form_agile mt-sm-5 mt-4">
                                <div className="checkout-right-basket">
                                    <Link to="/payment">Xác nhận đơn hàng
                                        <span className="far fa-hand-point-right"></span>
                                    </Link>
                                </div>
                                <div className="checkout-right-basket">
                                    <Link to="/home">Tiếp tục mua hàng
                                        <span className="far fa-hand-point-right"></span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default Cart