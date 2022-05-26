import React, { useState } from 'react'
import i1 from '../../assets/images/user-icon.jpg'
import '../../assets/css/fontawesome-all.css'
import './comment.css'
import CommentForm from './CommentForm'

import { useSelector } from 'react-redux'
import DanhGiaApi from '../../api/DanhGiaApi'

const CommentLine = ({ data, maSPDanhGia }) => {
    const userInfo = useSelector(state => state.user.userInfo)
    const [openReplyForm, setOpenReplyForm] = useState(false)
    const [childCmt, setChildCmt] = useState([])
    const [openChildCmt, setOpenChildCmt] = useState(false)
    const [maDanhGiaRep, setMaDanhGiaRep] = useState(0)

    const reply = (e, maDanhGiaRep) => {
        e.preventDefault();
        setOpenReplyForm(state => !state);
        setMaDanhGiaRep(maDanhGiaRep)
    }

    const replyBox = async (maDanhGia) => {
        const data = await DanhGiaApi.getChildDanhGias(maDanhGia)
        setChildCmt(data)
        setOpenChildCmt(state => !state)
    }

    const resetBoxAndCloseForm = async () => {
        setOpenReplyForm(state => !state);
        const data = await DanhGiaApi.getChildDanhGias(maDanhGiaRep)
        setChildCmt(data)
    }

    return (
        <div className="media-grid">
            <div className="media">
                <a className="comment-img" href="#url">
                    <img src={i1} className="img-fluid" width="100px" alt="" />
                </a>
                <div className="media-body comments-grid-right">
                    <h5>{data.tenNguoiDanhGia}</h5>
                    <ul className="p-0 comment">
                        <li className="">{data.ngayTaoDanhGia}</li>
                        {
                            userInfo.email !== data.emailNguoiDanhGia &&
                            (
                                <li>
                                    <a onClick={(e) => reply(e, data.maDanhGia)} className="replay" href='index.html'>
                                        <span className="fa fa-share mr-1" aria-hidden="true"></span>Trả lời
                                    </a>
                                </li>
                            )
                        }
                    </ul>
                    <p style={{ 'color': 'red', 'fontWeight': 'bold', 'cursor': 'pointer' }} onClick={() => replyBox(data.maDanhGia)}>
                        <span className='badge badge-secondary'>@ Thảo luận</span>
                    </p>
                    <p>{data.noiDung}</p>
                    {
                        openChildCmt && (
                            childCmt.filter(item => item.trangThai === 'CONG_BO' || item.trangThai === 'QUAN_TRI_VIEN').map((item) => (
                                <div className="media mb-0 border-0 px-0 media-2 mt-5" key={item.maDanhGia}
                                    style={{
                                        backgroundColor: item.trangThai === 'QUAN_TRI_VIEN' ? '#f7f1f2' : 'white'
                                    }}>
                                    <a className="comment-img" href="#url">
                                        <img src={i1} className="img-fluid" width="100px" alt="" />
                                    </a>
                                    <div className="media-body comments-grid-right">
                                        <h5>{item.trangThai === 'QUAN_TRI_VIEN' ? item.tenNguoiDanhGia + " (Quản trị viên)" : item.tenNguoiDanhGia}</h5>
                                        <ul className="p-0 comment">
                                            <li className="">{item.ngayTaoDanhGia}</li>
                                            {/* {
                                                userInfo.email !== item.emailNguoiDanhGia &&
                                                (
                                                    <li>
                                                        <a onClick={(e) => reply(e, item.maDanhGia)} className="replay" href='index.html'>
                                                            <span className="fa fa-share mr-1" aria-hidden="true"></span>Trả lời
                                                        </a>
                                                    </li>
                                                )
                                            } */}
                                        </ul>
                                        <p>{item.noiDung}</p>
                                    </div>
                                </div>
                            ))
                        )
                    }
                    {
                        openReplyForm &&
                        (
                            <div className="media mb-0 border-0 px-0 media-2 mt-5">
                                <CommentForm maSPDanhGia={maSPDanhGia} maDanhGiaCha={maDanhGiaRep} resetBox={resetBoxAndCloseForm} />
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default CommentLine