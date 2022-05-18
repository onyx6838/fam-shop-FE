import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { setRefreshToken, setToken, setUserInfo } from '../redux/store/user';
import { Row } from 'react-bootstrap';

import storage from '../storage/storage';

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    storage.removeUserInfo();
    dispatch(setUserInfo(""))
    dispatch(setToken(""))
    dispatch(setRefreshToken(""))
    navigate("/")
  }

  return (
    <section className="w3l-text-11 py-5">
      <div className="py-md-5 py-4">
        <div className="container">
          <Row>
            <div className="sidebar-side col-xl-3 col-lg-4 mt-lg-0 mt-5">
              <aside className="sidebar">
                <div className="sidebar-widget sidebar-blog-category">
                  <div className="sidebar-title">
                    <h4>Danh mục</h4>
                  </div>
                  <ul className="blog-cat">
                    <li>
                      <Link to='profile'>Tài Khoản<label>1</label></Link>
                    </li>
                    <li>
                      <Link to='order-management'>Quản lý đơn hàng<label>2</label></Link>
                    </li>
                    <li>
                      <Link to='/' onClick={logout}>Đăng xuất<label>3</label></Link>
                    </li>
                  </ul>
                </div>
              </aside>
            </div>
            <div className="col-xl-9 col-lg-8">
              <Outlet />
            </div>
          </Row>
        </div>
      </div>
    </section>
  )
}

export default User