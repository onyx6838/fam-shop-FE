import React, { useEffect, useState } from 'react'
import '../../assets/css/bootstrap.css'
import '../../assets/css/style.css'
import '../../assets/css/popuo-box.css'
import '../../assets/css/fontawesome-all.css'
import TopProductItem from './TopProductItem'
import SanPhamApi from '../../api/SanPhamApi'

import { Col, Container, Row } from 'react-bootstrap'
import chunk from 'lodash/chunk'

const TopProduct = () => {
    const [sanphams, setSanPhams] = useState([]);

    useEffect(() => {
        const response = SanPhamApi.getNewOrderByThoiGianNhap(1, 8);
        response.then(res => setSanPhams(res.content));
    }, [])

    const rows = sanphams.map((item) => (
        <TopProductItem info={item} key={item.maSP} grid={3} />
    ));

    return (
        <div className="ads-grid py-5">
            <Container className="py-md-5 py-4">
                <h3 className="tittle-w3l text-left mb-lg-5 mb-sm-4 mb-3">
                    Sản Phẩm<span className="font-weight-normal"> mới nhập</span>
                </h3>

                <Row>
                    <div className="agileinfo-ads-display col-lg-12 order-lg-last order-first">
                        <div className="wrapper">
                            {
                                chunk(rows, 4).map((item, i) => (
                                    <div className="product-sec1 px-lg-4 mb-5" key={i}>
                                        <Row>
                                            {item}
                                        </Row>
                                    </div>
                                ))
                            }
                            <Row>
                                <Col lg={12} className='d-flex justify-content-center'>
                                    <button className="btn btn-style btn-style-secondary mt-3">Xem thêm</button>
                                </Col>
                            </Row>
                            <div className="px-lg-4 my-5">
                                <div className="product-sec1 product-sec2">
                                    <div className="row p-5">
                                        <h3 className="col-md-4 effect-bg">Sản Phẩm Giá Tốt</h3>
                                        <p className="w3l-nut-middle"></p>
                                        <div className="col-md-8 bg-right-nut">
                                            <img src="" alt="" className="img-fluid" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default TopProduct