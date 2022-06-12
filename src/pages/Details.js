import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import SliderImage from "react-zoom-slider";
import { Col, Container, Row, Table } from 'react-bootstrap';

import '../assets/css/bootstrap.css';
import '../assets/css/style.css';
import '../assets/css/popuo-box.css';
import '../assets/css/fontawesome-all.css';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import SanPhamApi from '../api/SanPhamApi'
import DacTrungApi from '../api/DacTrungApi'
import { useDispatch, useSelector } from 'react-redux';
import { addCart, addToCart, fetchCart } from '../redux/store/cart';

import Slider from 'react-slick/lib/slider'

import parse from 'html-react-parser';
import CommentForm from '../components/Comment/CommentForm';
import CommentBox from '../components/Comment/CommentBox';

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "lightgrey" }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "lightgrey" }}
      onClick={onClick}
    />
  );
}

const Details = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user.userInfo)

  const [productDetail, setProductDetail] = useState({});

  const [quantityAddToCart, setQuantityAddToCart] = useState(1);

  const [dataImage, setDataImage] = useState([]);

  const [relateProduct, setRelateProduct] = useState([]);

  const [dtsp, setDTSP] = useState([]);

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

      const data = SanPhamApi.getRelateProduct(res.loaiSanPham.maLoai, id)
      data.then(res => setRelateProduct(res))
    })

    const responseDTSP = DacTrungApi.getDTSPBySanPham(id);
    responseDTSP.then((rs) => {
      setDTSP(rs)
    })
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

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: relateProduct.length === 1 ? 1 : 2,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 2000
  };

  const addToCartWithCheckRelate = (item) => {
    if (userInfo.email) {
      dispatch(addToCart(
        {
          email: userInfo.email,
          maSP: item.maSP,
          qty: 1
        }
      ));
      dispatch(fetchCart({ tenTK: userInfo.tenTK }));
    }
    else dispatch(addCart(item))
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
                <Col lg={8} md={8}>
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
                <Col lg={4} md={4}>
                  <div className="product-single-w3l">
                    <p className="my-3">
                      <i className="far fa-hand-point-right mr-2"></i>
                      Đặc tính sản phẩm
                    </p>
                    <Table>
                      <tbody>
                        <tr>
                          <td><b>Thương Hiệu:</b></td>
                          <td>{th && th.tenThuongHieu}</td>
                        </tr>
                        <tr>
                          <td><b>Xuất xứ:</b></td>
                          <td>
                            {
                              dtsp.some(item => item.dacTrung.loaiDacTrung === 'Nước sản xuất') ?
                                (
                                  <>
                                    {
                                      dtsp.filter(item => item.dacTrung.loaiDacTrung === 'Nước sản xuất').map(item => item.dacTrung.ten)
                                    }
                                  </>
                                )
                                : 'Đang cập nhật'
                            }
                          </td>
                        </tr>
                        {
                          dtsp.some(item => item.dacTrung.loaiDacTrung === 'Nhu cầu dinh dưỡng') && (
                            <tr>
                              <td><b>Nhu cầu dinh dưỡng:</b></td>
                              <td>
                                {
                                  dtsp.filter(item => item.dacTrung.loaiDacTrung === 'Nhu cầu dinh dưỡng').map(e => e.dacTrung.ten).join(', ')
                                }
                              </td>
                            </tr>
                          )
                        }
                        {
                          dtsp.some(item => item.dacTrung.loaiDacTrung === 'Đặc điểm nổi bật') && (
                            <tr>
                              <td><b>Đặc điểm nổi bật:</b></td>
                              <td>
                                {
                                  dtsp.filter(item => item.dacTrung.loaiDacTrung === 'Đặc điểm nổi bật').map(e => e.dacTrung.ten).join(', ')
                                }
                              </td>
                            </tr>
                          )
                        }
                      </tbody>
                    </Table>
                  </div>
                </Col>
                <Col lg={12} md={12} className="single-right-left simpleCart_shelfItem mt-5">
                  <h3 className="mb-3">Nhận xét sản phẩm</h3>
                </Col>
                <Col lg={12} md={12}>
                  <CommentForm maSPDanhGia={productDetail.maSP} />
                </Col>
                <Col lg={12} md={12} className="single-right-left simpleCart_shelfItem mt-5 w3l-text-11">
                  <CommentBox maSPDanhGia={productDetail.maSP} />
                </Col>
                {
                  relateProduct.length > 0 && (
                    <>
                      <Col lg={12} md={12} className="single-right-left simpleCart_shelfItem mt-5">
                        <h3 className="mb-3">Sản phẩm liên quan</h3>
                      </Col>
                      <Col lg={12} md={12}>
                        <div className="px-lg-4 my-5">
                          <Slider {...settings}>
                            {
                              relateProduct.map(item => (
                                <div className={`product-men mt-md-0 mt-5`} key={item.maSP}>
                                  <div className="men-pro-item simpleCart_shelfItem">
                                    <div className="men-thumb-item text-center">
                                      <img src={`${item.hinhAnh}`} alt="" className="mx-auto d-block" style={{ height: '207.99px' }} />
                                      <div className="men-cart-pro">
                                        <div className="inner-men-cart-pro">
                                          <Link to={{
                                            pathname: `/details/${item.maSP}`
                                          }} className="link-product-add-cart">Xem chi tiết</Link>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="item-info-product text-center mt-2">
                                      <div style={{ "height": "100px" }}>
                                        <h4 className="pt-1">
                                          <Link to={{ pathname: `/details/${item.maSP}` }}>{item.ten}</Link>
                                        </h4>
                                      </div>
                                      <div className="info-product-price">
                                        <span className="item_price">{item.donGiaBan}đ</span>
                                      </div>
                                      <div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">
                                        <button className="btn btn-style btn-style-secondary mt-3"
                                          onClick={() => addToCartWithCheckRelate(item)}>Thêm vào giỏ</button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))
                            }
                          </Slider>
                        </div>
                      </Col>
                    </>
                  )
                }
              </Row>
            </Container>
          </div>
        )
      }
    </>
  )
}

export default Details