import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import blogsingle from '../../assets/images/blog-single.jpg'
import BaiVietApi from '../../api/BaiVietApi'

const PostDetail = () => {
    let { id } = useParams();
    const [detail, setDetail] = useState({})

    useEffect(() => {
        const response = BaiVietApi.getById(id);
        response.then(rs => setDetail(rs))
    }, [id])

    return (
        <>
            <img src={blogsingle} class="img-fluid" alt="" />
            <h4 class="">{detail.tieuDe}</h4>
            <h6>Feb 12, 2021</h6>
            <a href="#admin" class="admin">- by Maureen Bio</a>
            <p class="mt-4 mb-3">Fusce faucibus ante vitae justo efficitur elementum. Donec et ipsum
                faucibus
                arcu
                ipsum elementum, luctus justo. ac purus semper. Fusce faucibus ante vitae justo efficitur
                sed et
                elementum. Donec ipsum
                faucibus arcu elementum, luctus justo. ac purus semper. Fusce faucibus ante vitae justo
                efficitur
                elementum. Donec ipsum faucibus arcu...</p>
            <p class="mb-4">Lorem faucibus fusce ante vitae justo efficitur elementum. Donec ipsum faucibus
                arcu elementum, luctus justo. ac purus semper. Fusce faucibus ante vitae justo efficitur
                elementum. Donec ipsum faucibus. Donec ipsum faucibus arcu elementum..</p>
            <p class="mb-3">Lorem faucibus fusce ante vitae justo efficitur elementum. Donec ipsum faucibus
                arcu elementum, luctus justo. ac purus semper. Fusce faucibus ante vitae justo efficitur
                elementum. Donec ipsum faucibus. Donec ipsum faucibus arcu elementum..</p>
            <p class="mb-3">Lorem faucibus fusce ante vitae justo efficitur elementum. Donec ipsum faucibus
                arcu elementum, luctus justo. ac purus semper. Fusce faucibus ante vitae justo efficitur
                elementum. Donec ipsum faucibus. Donec ipsum faucibus arcu elementum..</p>
        </>
    )
}

export default PostDetail