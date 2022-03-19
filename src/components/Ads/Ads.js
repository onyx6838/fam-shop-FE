import React from 'react'
import '../../assets/css/bootstrap.css'
import '../../assets/css/style.css'
import '../../assets/css/popuo-box.css'
import '../../assets/css/fontawesome-all.css'
import { Col } from 'react-bootstrap'

const Ads = () => {
    return (
        <div className="px-lg-4 my-5">
            <div className="product-sec1 product-sec2">
                <div className="row p-5">
                    <h3 className="col-md-4 effect-bg">Sản Phẩm Giá Tốt</h3>
                    <p className="w3l-nut-middle">Giảm giá 20%</p>
                    <Col md={8} className="bg-right-nut">
                        <img src="" alt="" className="img-fluid" />
                    </Col>
                </div>
            </div>
        </div>
    )
}

export default Ads