import React, { useState } from 'react'
import { Col, Container, Dropdown, Row } from 'react-bootstrap'
import '../../assets/css/bootstrap.css'
import '../../assets/css/style.css'
import '../../assets/css/popuo-box.css'
import '../../assets/css/fontawesome-all.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import storage from '../../storage/storage'
import { setRefreshToken, setToken, setUserInfo } from '../../redux/store/user'

const TopHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropdownOpen, setdropdownOpen] = useState(false);
  const userInfo = useSelector(state => state.user.userInfo)

  const logout = () => {
    storage.removeUserInfo();
    dispatch(setUserInfo(""))
    dispatch(setToken(""))
    dispatch(setRefreshToken(""))
  }

  return (
    <div className="agile-main-top">
      <Container>
        <Row className="main-top-w3l py-2">
          <Col lg={3} sm={4} className="header-most-top">
            <p className=" text-lg-left text-center">Chào mừng đến với cửa hàng!</p>
          </Col>
          <Col lg={9} sm={8} className="header-right ml-auto text-sm-right text-center">
            <ul className="top-header-lists">
              {
                userInfo.hoTen &&
                (
                  <li className="mx-3">
                    <Dropdown
                      className="d-inline-block"
                      onToggle={() => setdropdownOpen(prevState => !prevState)}
                      show={dropdownOpen}
                    >
                      <Dropdown.Toggle>
                        {userInfo.hoTen}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => navigate("/user/profile")}>
                          <i className="fa fa-user-circle"></i>
                          <span>Tài khoản</span>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => navigate("/user/order-management")}>
                          <i className="fa fa-truck"></i>
                          <span>Quản lý đơn hàng</span>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={logout}>
                          <i className="fa fa-sign-out-alt"></i>
                          <span>Đăng xuất</span>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </li>
                )
              }
              {
                !userInfo.hoTen &&
                (
                  <li className="mx-3">
                    <i className="fas fa-sign-in-alt mr-1" style={{ cursor: 'pointer' }}></i>
                    <span style={{ cursor: 'pointer' }}>
                      <Link to="/login">Đăng nhập</Link>
                    </span>
                  </li>
                )
              }
            </ul>
          </Col>
        </Row>
      </Container>
    </div >
  )
}

export default TopHeader