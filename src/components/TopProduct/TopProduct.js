import React, { useEffect, useState } from 'react'
import '../../assets/css/bootstrap.css'
import '../../assets/css/style.css'
import '../../assets/css/popuo-box.css'
import '../../assets/css/fontawesome-all.css'
import TopProductItem from './TopProductItem'
import { Col, Row } from 'react-bootstrap'

import SanPhamApi from '../../api/SanPhamApi'
import chunk from 'lodash/chunk'

const TopProduct = ({ categoryList, name }) => {
    const [sanphams, setSanPhams] = useState([]);
    const [visible, setVisible] = useState(4);

    useEffect(() => {
        const response = SanPhamApi.getByParentLoaiSP(categoryList, { page: 1, size: visible })
        response.then(res => setSanPhams(res.content));
    }, [categoryList, visible])

    const rows = sanphams.map((item) => (
        <TopProductItem info={item} key={item.maSP} grid={3} />
    ));

    const handleChangeVisibleProduct = () => {
        setVisible(visible => visible + 4)
    }

    return (
        <>
            {
                sanphams.length > 0 &&
                (
                    <>
                        <div className="product-sec1 px-lg-4">
                            <Row>
                                <Col lg={12}>
                                    <h3 className="tittle-w3l mb-lg-5 mb-sm-4 mb-3">
                                        {name}
                                        <span className="font-weight-normal"></span>
                                    </h3>
                                </Col>
                            </Row>
                        </div>
                        {
                            chunk(rows, 4).map((item, i) => (
                                <div className="product-sec1 px-lg-4 mb-5" key={i}>
                                    <Row>
                                        {item}
                                    </Row>
                                </div>
                            ))
                        }
                        <div className="product-sec1 px-lg-4 mb-5">
                            <Row>
                                {
                                    visible <= sanphams.length &&
                                    (
                                        <Col lg={12} className='d-flex justify-content-center'>
                                            <button className="btn btn-style btn-style-secondary" onClick={handleChangeVisibleProduct}>Xem thêm</button>
                                        </Col>
                                    )
                                }
                            </Row>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default TopProduct