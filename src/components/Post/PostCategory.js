import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TheLoaiBaiVietApi from '../../api/TheLoaiBaiVietApi'

const PostCategory = () => {
    const [postCate, setPostCate] = useState([])

    useEffect(() => {
        const response = TheLoaiBaiVietApi.getAllWP();
        response.then(rs => setPostCate(rs))
    }, [])

    return (
        <aside className="sidebar">
            <div className="sidebar-widget sidebar-blog-category">
                <div className="sidebar-title">
                    <h4>Thể loại</h4>
                </div>
                <ul className="blog-cat">
                    {
                        postCate.map((item, i) => (
                            <li key={item.maTheLoaiBaiViet}>
                                <Link to={`${item.duongDan}`}> {item.tenTheLoaiBaiViet}<label>{i}</label>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </aside>
    )
}

export default PostCategory