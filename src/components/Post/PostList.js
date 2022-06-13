import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../redux/store/post';
import { Pagination } from '@material-ui/lab';
import PostItem from './PostItem';

const PostList = () => {
    const dispatch = useDispatch();
    const size = useSelector(state => state.post.size);
    const page = useSelector(state => state.post.page);
    const totalPages = useSelector(state => state.post.totalPages);
    const posts = useSelector(state => state.post.posts);

    useEffect(() => {
        dispatch(fetchPosts({ page: 1, size: size }))
    }, [dispatch, size])

    const handlePageChange = (e, value) => {
        dispatch(fetchPosts({ page: value, size: size }))
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

export default PostList