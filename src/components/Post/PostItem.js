import React from 'react'
import { Link } from 'react-router-dom'
import blog1 from '../../assets/images/blog1.jpg'

const PostItem = ({ info }) => {
    return (
        <div className="card">
            <div className="card-header p-0 position-relative border-0">
                <a href="blog-single.html">
                    <img className="d-block img-fluid" src={blog1} alt="" />
                </a>
            </div>
            <div className="card-body p-0 pt-4 pb-3 blog-details">
                <h6>{info.thoiGianTao}</h6>
                <a href="#admin" className="admin"> - bởi {info.tacGia.hoTen}</a>
                <br />
                <Link to={`/posts/detail/${info.maBaiViet}`} className="blog-desc">{info.tieuDe}</Link>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae voluptatum
                    laboriosam
                    voluptate soluta est obcaecati, quam aperiam nam natus dicta tenetur? Dolore.
                </p>
                <Link to={`/posts/detail/${info.maBaiViet}`} className="btn btn-style mt-lg-4 mt-3">Đọc thêm</Link>
            </div>
        </div>
    )
}

export default PostItem