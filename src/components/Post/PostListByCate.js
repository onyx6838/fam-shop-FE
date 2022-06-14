import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsByCate } from '../../redux/store/post';
import { Pagination } from '@material-ui/lab';
import PostItem from './PostItem';
import { useParams } from 'react-router-dom';

const PostListByCate = () => {
    const { cate } = useParams()
    const dispatch = useDispatch();
    const size = useSelector(state => state.post.size);
    const page = useSelector(state => state.post.page);
    const totalPages = useSelector(state => state.post.totalPages);
    const posts = useSelector(state => state.post.posts);

    useEffect(() => {
        dispatch(fetchPostsByCate({ page: 1, size: size, cate }))
    }, [cate, dispatch, size])

    const handlePageChange = (e, value) => {
        dispatch(fetchPostsByCate({ page: value, size: size, cate }))
    }

    return (
        <>
            {
                posts.map((item) => (<PostItem key={item.maBaiViet} info={item} />))
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
        </>
    )
}

export default PostListByCate