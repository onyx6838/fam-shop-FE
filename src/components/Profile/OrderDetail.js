import React from 'react'
import '../../assets/css/bootstrap.css'
import '../../assets/css/style.css'
import '../../assets/css/fontawesome-all.css'
import { useLocation } from 'react-router-dom'

const OrderDetail = () => {
    const location = useLocation();
    const { listCTDD } = location.state;

    return (
        <div className="sidebar-widget popular-posts">
            <div className="sidebar-title">
                <h4>Thông tin đơn hàng</h4>
            </div>
            {
                listCTDD.map(item => (
                    <div className="post mb-5" key={item.maCTDDH}>
                        <figure className="post-thumb">
                            <img src={item.sanPham.hinhAnh} alt="" />
                        </figure>
                        <div className="text">
                            <span>{item.sanPham.ten} (sl: {item.soLuong} - {item.sanPham.donGiaBan}đ)</span>
                        </div>
                        <div className="post-info">{item.tongTienMuc} đ</div>
                    </div>
                ))
            }
        </div>
    )
}

export default OrderDetail