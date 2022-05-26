import { Pagination } from '@material-ui/lab'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchParentCommentsByProduct } from '../../redux/store/comment'
import CommentLine from './CommentLine'

const CommentBox = ({ maSPDanhGia }) => {
    const dispatch = useDispatch();
    const comments = useSelector(state => state.comment.comments)
    const size = useSelector(state => state.comment.size)
    const page = useSelector(state => state.comment.page)
    const totalPages = useSelector(state => state.comment.totalPages)

    useEffect(() => {
        dispatch(fetchParentCommentsByProduct(
            {
                page: page,
                size: size,
                maSP: maSPDanhGia
            }))
    }, [dispatch, maSPDanhGia, page, size])

    const handlePageChange = (e, value) => {
        dispatch(fetchParentCommentsByProduct(
            {
                page: value,
                size: size,
                maSP: maSPDanhGia
            }))
    }

    return (
        <div className="comments">
            <h3 className="aside-title ">Nhận xét về sản phẩm</h3>
            <div className="comments-grids">
                {
                    comments.filter(item=> item.trangThai === 'CONG_BO').map((item) => (
                        <CommentLine data={item} key={item.maDanhGia} maSPDanhGia={maSPDanhGia} />
                    ))
                }
                <br />
                <Pagination
                    count={totalPages}
                    page={page}
                    siblingCount={1}
                    boundaryCount={1}
                    variant="outlined"
                    shape="rounded"
                    onChange={(e, value) => handlePageChange(e, value)}
                />
            </div>
        </div>
    )
}

export default CommentBox