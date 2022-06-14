import React from 'react'
import { useParams } from 'react-router-dom'

const PostDetail = () => {
    let { id } = useParams();

    console.log(id);

    return (
        <div>{id}</div>
    )
}

export default PostDetail