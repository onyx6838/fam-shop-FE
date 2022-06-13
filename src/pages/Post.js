import React from 'react'
import { Outlet } from 'react-router-dom';
import PostCategory from '../components/Post/PostCategory'

const Posts = () => {
  return (
    <section className="w3l-text-11 py-5">
      <div className="text11 py-md-5 py-4">
        <div className="container">
          <div className='row'>
            <div className="col-xl-9 col-lg-8 text11-content">
              <Outlet />
            </div>
            <div className="sidebar-side col-xl-3 col-lg-4 mt-lg-0 mt-5">
              <PostCategory />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Posts