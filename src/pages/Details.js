import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import SliderImage from "react-zoom-slider";
import { Col, Container, Row } from 'react-bootstrap';

import '../assets/css/bootstrap.css';
import '../assets/css/style.css';
import '../assets/css/popuo-box.css';
import '../assets/css/fontawesome-all.css';

import SanPhamApi from '../api/SanPhamApi'
import { useDispatch } from 'react-redux';
import { addCart } from '../redux/store/cart';

const Details = () => {
  let { id } = useParams();
  const dispatch = useDispatch();

  const [productDetail, setProductDetail] = useState({});

  const [quantityAddToCart, setQuantityAddToCart] = useState(1);

  useEffect(() => {
    const response = SanPhamApi.getById(`${id}`);
    response.then(res => setProductDetail(res));
  }, [id]);

  const th = productDetail.thuongHieu

  const data = [
    {
      image: productDetail.hinhAnh && `http://127.0.0.1:8887/${productDetail.hinhAnh}`,
      text: "img1"
    },
    {
      image:
        "https://lzd-img-global.slatic.net/g/ff/kf/Sec7674939f5245bc98bf0b2170ce52833.jpg_720x720q80.jpg_.webp",
      text: "img2"
    },
    {
      image:
        "https://lzd-img-global.slatic.net/g/ff/kf/Sbf3c4fd6c74a4d9384c6788d21c895d4K.jpg_720x720q80.jpg_.webp",
      text: "img3"
    },
    {
      image:
        "https://lzd-img-global.slatic.net/g/ff/kf/Sb0bf76a91f194f2eaa25ebd10658b4dbA.jpg_720x720q80.jpg_.webp",
      text: "img4"
    }
  ];

  const increaseQuantity = () => {
    setQuantityAddToCart(quantityAddToCart => Math.min(quantityAddToCart + 1, productDetail.soLuong))
  }

  const decreateQuantity = () => {
    setQuantityAddToCart(quantityAddToCart => Math.max(quantityAddToCart - 1, 1))
  }

  const addToCart = () => {
    const data = {
      ...productDetail,
      qty: quantityAddToCart
    }
    dispatch(addCart(data));
  }

  return (
    <div className="banner-bootom-w3-agileits py-5">
      <Container className="py-md-5 py-4">
        <Row>
          <Col lg={5} md={8} className="single-right-left ">
            <div className="grid images_3_of_2">
              <SliderImage
                data={data}
                width="400px"
                showDescription={true}
                direction="right"
              />
              <div className="clearfix"></div>
            </div>
          </Col>
          <Col lg={7} md={4} className="single-right-left simpleCart_shelfItem">
            <h3 className="mb-3">{productDetail.ten}</h3>
            <h2 className="mb-3" style={{ color: '#fdb03d' }}>{productDetail.donGiaBan}đ
              {/* <del className="mx-2 font-weight-light">$400.00</del> */}
            </h2>
            <p className="mb-3">Thương hiệu : {th && th.tenThuongHieu} </p>
            <p className="mb-3">Tình trạng : {th.soLuong === 0 ? "Hết hàng" : "Còn hàng"} </p>
            <div className="occasion-cart">
              <div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">
                <div className="quantity">
                  <div className="quantity-select">
                    <div className="entry value-minus" onClick={decreateQuantity}>&nbsp;</div>
                    <div className="entry value">
                      <span>{quantityAddToCart}</span>
                    </div>
                    <div className="entry value-plus" onClick={increaseQuantity}>&nbsp;</div>
                  </div>
                </div>
                <button className="btn btn-style btn-style-secondary mt-3" onClick={addToCart}>Thêm vào giỏ</button>
              </div>
            </div>
          </Col>
          <Col lg={12} md={12}>
            <div className="product-single-w3l">
              <p className="my-3">
                <i className="far fa-hand-point-right mr-2"></i>
                Mô tả sản phẩm {productDetail.ten}
              </p>
              <ul>
                <li className="mb-3">
                  Bánh Chocopie Orion là sản phẩm bánh cao cấp của thương hiệu Orion từ lâu đã được đông đảo người tiêu dùng yêu thích. Sản phẩm làm từ các thành phần tự nhiên như bột mì, đường glucose, chất béo thực vật, bột cacao, lúa mì, bột vani, marshmallow… mang đến hương vị bánh thơm ngon, hấp dẫn. Khi thưởng thức, bạn sẽ được trải nghiệm hương vị tuyệt vời từ lớp bánh xốp mịn với cacao chảy ngọt ngào bên ngoài đến lớp nhân marshmallow dẻo dai hấp dẫn bên trong. Thành phần có trong bánh giúp bạn bổ sung các vitamin và khoáng chất cần thiết cho cơ thể mỗi ngày.
                </li>
                <li className="mb-3">
                  Chỉ tiêu chất lượng chính:
                  + Hàm lượng chất béo: lớn hơn 14%
                  + Hàm lượng protein lớn hơn 1.5%
                  + Chất bảo quản và chất ngọt tổng hợp không sử dụng.
                  Hạn sử dụng: 1 năm, kể từ ngày sản xuất
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Details