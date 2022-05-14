import React from 'react'
import '../../assets/css/bootstrap.css'
import '../../assets/css/style.css'
import '../../assets/css/popuo-box.css'
import '../../assets/css/fontawesome-all.css'

import i1 from '../../assets/images/m1.png'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addCart, addToCart, fetchCart } from '../../redux/store/cart'

const TopProductItem = ({ info, grid }) => {
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.user.userInfo)

    const addToCartWithCheck = () => {
        if(userInfo.email) {
            dispatch(addToCart(
                {
                    email: userInfo.email,
                    maSP: info.maSP,
                    qty: 1
                }
            ));
            dispatch(fetchCart({ tenTK: userInfo.tenTK }));
        }
        else dispatch(addCart(info))
    }

    return (
        <div className={`col-md-${grid} product-men mt-md-0 mt-5`}>
            <div className="men-pro-item simpleCart_shelfItem">
                <div className="men-thumb-item text-center">
                    {/* <img src={info ? `http://127.0.0.1:8887/${info.hinhAnh}` : i1} alt="" className="img-fluid" style={{ height: '207.99px' }} /> */}
                    <img src={info ? `${info.hinhAnh}` : i1} alt="" className="img-fluid" style={{ height: '207.99px' }} />
                    <div className="men-cart-pro">
                        <div className="inner-men-cart-pro">
                            <Link to={{
                                pathname: `/details/${info.maSP}`
                            }} className="link-product-add-cart">Xem chi tiết</Link>
                        </div>
                    </div>
                    {/* <span className="product-new-top">Mới</span> */}
                </div>
                <div className="item-info-product text-center mt-2">
                    <div style={{ "height": "100px" }}>
                        <h4 className="pt-1">
                            <Link to={{ pathname: `/details/${info.maSP}` }}>{info.ten}</Link>
                        </h4>
                    </div>
                    <div className="info-product-price">
                        <span className="item_price">{info.donGiaBan}đ</span>
                    </div>
                    <div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">
                        <button className="btn btn-style btn-style-secondary mt-3"
                            onClick={addToCartWithCheck}>Thêm vào giỏ</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TopProductItem