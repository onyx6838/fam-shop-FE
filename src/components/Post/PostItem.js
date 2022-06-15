import React from 'react'
import { Link } from 'react-router-dom'

const PostItem = ({ info }) => {
    return (
        <div className="card">
            <div className="card-header p-0 position-relative border-0">
                <Link to={`/posts/detail/${info.maBaiViet}`}>
                    <img className="d-block img-fluid" src={info.anhDaiDien} alt="" />
                </Link>
            </div>
            <div className="card-body p-0 pt-4 pb-3 blog-details">
                <h6>{info.thoiGianTao}</h6>
                <a href="#admin" className="admin" onClick={(e) => e.preventDefault()}> - bởi {info.tacGia.hoTen}</a>
                <br />
                <Link to={`/posts/detail/${info.maBaiViet}`} className="blog-desc">{info.tieuDe}</Link>
                <p>{info.moTaNgan}</p>
                <Link to={`/posts/detail/${info.maBaiViet}`} className="btn btn-style mt-lg-4 mt-3">Đọc bài viết</Link>
            </div>
        </div>
    )
}

export default PostItem