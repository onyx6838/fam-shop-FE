import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BaiVietApi from '../../api/BaiVietApi'
import parse from 'html-react-parser';

const PostDetail = () => {
    let { id } = useParams();
    const [detail, setDetail] = useState({})
    const [creator, setCreator] = useState('');

    useEffect(() => {
        const response = BaiVietApi.getById(id);
        response.then(rs => {
            setDetail(rs)
            setCreator(rs.tacGia.hoTen)
        })
    }, [id])

    return (
        <>
            <img src={detail.anhDaiDien} className="img-fluid" alt="" />
            <h4 className="">{detail.tieuDe}</h4>
            <h6>{detail.thoiGianTao}</h6>
            <a href="#admin" className="admin" onClick={(e) => e.preventDefault()}>- by {creator}</a>
            <br />
            {
                detail.noiDung && parse(detail.noiDung)
            }
        </>
    )
}

export default PostDetail