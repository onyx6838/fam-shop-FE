import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import SliderImage from "react-zoom-slider";
import { Col, Container, Row } from 'react-bootstrap';

import '../assets/css/bootstrap.css';
import '../assets/css/style.css';
import '../assets/css/popuo-box.css';
import '../assets/css/fontawesome-all.css';

import SanPhamApi from '../api/SanPhamApi'
import { useDispatch, useSelector } from 'react-redux';
import { addCart, addToCart, fetchCart } from '../redux/store/cart';

import parse from 'html-react-parser';

const Details = () => {
  let { id } = useParams();
  const dispatch = useDispatch();

  const [productDetail, setProductDetail] = useState({});

  const [quantityAddToCart, setQuantityAddToCart] = useState(1);

  const [dataImage, setDataImage] = useState([])

  const userInfo = useSelector(state => state.user.userInfo)

  useEffect(() => {
    const response = SanPhamApi.getById(`${id}`);
    response.then(res => {
      setProductDetail(res)
      const slideImg = res.sanPhamFiles.map((item) => (
        {
          image: `https://firebasestorage.googleapis.com/v0/b/fam-shop-4fd26.appspot.com/o/product%2F${item.name}?alt=media&token=${item.token}`,
          text: ""
        }
      ))
      setDataImage(slideImg)
    });
  }, [id]);

  const th = productDetail.thuongHieu;
  
  const increaseQuantity = () => {
    setQuantityAddToCart(quantityAddToCart => Math.min(quantityAddToCart + 1, productDetail.soLuong))
  }

  const decreateQuantity = () => {
    setQuantityAddToCart(quantityAddToCart => Math.max(quantityAddToCart - 1, 1))
  }

  const addToCartWithCheck = () => {
    if (userInfo.email) {
      dispatch(addToCart(
        {
          email: userInfo.email,
          maSP: productDetail.maSP,
          qty: quantityAddToCart
        }
      ));
      dispatch(fetchCart({ tenTK: userInfo.tenTK }));
    }
    else {
      const data = {
        ...productDetail,
        qty: quantityAddToCart
      }
      dispatch(addCart(data));
    }
  }

  return (
    <>
      {
        dataImage.length > 0 &&
        (
          <div className="banner-bootom-w3-agileits py-5">
            <Container className="py-md-5 py-4">
              <Row>
                <Col lg={5} md={8} className="single-right-left ">
                  <div className="grid images_3_of_2">
                    <SliderImage
                      data={dataImage}
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
                  <p className="mb-3">Tình trạng : {productDetail.soLuong === 0 ? "Hết hàng" : "Còn hàng"} </p>
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
                      <button className="btn btn-style btn-style-secondary mt-3" onClick={addToCartWithCheck}>Thêm vào giỏ</button>
                    </div>
                  </div>
                </Col>
                <Col lg={12} md={12}>
                  <div className="product-single-w3l">
                    <p className="my-3">
                      <i className="far fa-hand-point-right mr-2"></i>
                      Mô tả sản phẩm {productDetail.ten}
                    </p>
                    {
                      productDetail.moTa && parse(productDetail.moTa)
                    }
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        )
      }
    </>
  )
}

export default Details