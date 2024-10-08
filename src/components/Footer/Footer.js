import React, { useEffect, useState } from 'react'
import '../../assets/css/bootstrap.css'
import '../../assets/css/style.css'
import '../../assets/css/popuo-box.css'
import '../../assets/css/fontawesome-all.css'

import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import LoaiSanPhamApi from '../../api/LoaiSanPhamApi'
import { changeCategory, changeCategoryName, changeTypeOfGetProduct } from '../../redux/store/product'

const Footer = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loaisanphams, setLoaiSanPhams] = useState([]);

    useEffect(() => {
        const response = LoaiSanPhamApi.getAll();
        response.then(res => setLoaiSanPhams(res));
    }, [])

    const handleOnClickItem = (item, e) => {
        e.preventDefault();
        dispatch(changeCategory(item))
        dispatch(changeCategoryName(item.ten))
        //dispatch(changeSearch(''))
        dispatch(changeTypeOfGetProduct('CATEGORY'))
        navigate("/category")
    }

    return (
        <footer>
            <div className="footer-top-first">
                <div className="container py-5">
                    <div className="row w3l-grids-footer py-sm-4 py-3">
                        <div className="col-md-4 offer-footer">
                            <div className="d-flex align-items-center">
                                <div className="icon-fot">
                                    <i className="fas fa-dolly"></i>
                                </div>
                                <div className="text-form-footer ml-3">
                                    <h3>Giao Hàng Miễn Phí</h3>
                                    <p>Giá trị trên 100000đ</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 offer-footer my-md-0 my-4">
                            <div className="d-flex align-items-center">
                                <div className="icon-fot">
                                    <i className="fas fa-shipping-fast"></i>
                                </div>
                                <div className="text-form-footer ml-3">
                                    <h3>Vận Chuyển Nhanh Chóng</h3>
                                    <p>Phạm vi trong thành phố</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 offer-footer">
                            <div className="d-flex align-items-center">
                                <div className="icon-fot">
                                    <i className="far fa-thumbs-up"></i>
                                </div>
                                <div className="text-form-footer ml-3">
                                    <h3>Lựa Chọn Hàng Đầu</h3>
                                    <p>Sản phẩm tốt</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w3l-middlefooter-sec">
                <div className="container py-5">
                    <div className="row footer-info w3-agileits-info">
                        <div className="col-md-3 col-sm-6 footer-grids">
                            <h3 className="mb-3">Thể Loại</h3>
                            <ul>
                                {
                                    loaisanphams.map((item, i) => {
                                        return (
                                            item.loaiSPConList.length > 0 && (
                                                <li className="mb-3" key={item.maLoai}>
                                                    <Link to='/' onClick={(e) => handleOnClickItem(item, e)}>{item.ten}</Link>
                                                </li>
                                            )
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className="col-md-3 col-sm-6 footer-grids mt-md-0 mt-4">
                            <h3 className="mb-3">Truy Cập Nhanh</h3>
                            <ul>
                                <li className="mb-3">
                                    <Link to='/'>Về Chúng Tôi</Link>
                                </li>
                                <li className="mb-3">
                                    <Link to='/'>Liên Hệ</Link>
                                </li>
                                <li className="mb-3">
                                    <Link to='/'>Hướng Dẫn</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-3 col-sm-6 footer-grids w3l-agileits mt-md-0 mt-4">
                            <div className="footer-grids  w3l-socialmk mt-3">
                                <h3 className="mb-3">Theo dõi chúng tôi trên</h3>
                                <div className="social">
                                    <ul>
                                        <li>
                                            <a className="icon fb" href="#facebook">
                                                <i className="fab fa-facebook-f"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer