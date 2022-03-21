import React, { useState } from 'react'
import { Col, Container, Dropdown, Row } from 'react-bootstrap'
import '../../assets/css/bootstrap.css'
import '../../assets/css/style.css'
import '../../assets/css/popuo-box.css'
import '../../assets/css/fontawesome-all.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import storage from '../../storage/storage'

const TopHeader = () => {
  // const [isOpen, setIsOpen] = useState(false);
  // const [isOpenRegister, setIsOpenRegister] = useState(false);

  // const showModal = () => {
  //   setIsOpen(true);
  // };

  // const hideModal = () => {
  //   setIsOpen(false);
  // };

  // const showModalRegister = () => {
  //   setIsOpenRegister(true);
  // };

  // const hideModalRegister = () => {
  //   setIsOpenRegister(false);
  // };

  const [dropdownOpen, setdropdownOpen] = useState(false);
  const userInfo = useSelector(state => state.user.userInfo)

  const logout = () => {
    storage.removeUserInfo();
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
              {/* <li className="mx-3">
                <i className="fas fa-sign-in-alt mr-1" style={{ cursor: 'pointer' }} onClick={showModal}></i>
                <span style={{ cursor: 'pointer' }} onClick={showModal}>Đăng nhập Modal</span>
              </li> */}
              {userInfo.hoTen && (
                <li className="mx-3">
                  <Dropdown
                    className="d-inline-block"
                    onMouseOver={() => setdropdownOpen(true)}
                    onMouseLeave={() => setdropdownOpen(false)}
                    onToggle={() => setdropdownOpen(prevState => !prevState)}
                    show={dropdownOpen}
                  >
                    <Dropdown.Toggle>
                      {userInfo.hoTen}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <i className="fa fa-user-circle"></i>
                        <span>Tài khoản</span>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <i className="fas fa-truck"></i>
                        <span>Quản lý đơn hàng</span>
                      </Dropdown.Item>
                      <Dropdown.Item onClick={logout}>
                        <i className="fa fa-sign-out-alt"></i>
                        <span>Đăng xuất</span>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              )}
              {!userInfo.hoTen && (
                <li className="mx-3">
                  <i className="fas fa-sign-in-alt mr-1" style={{ cursor: 'pointer' }}></i>
                  <span style={{ cursor: 'pointer' }}>
                    <Link to="/login">Đăng nhập</Link>
                  </span>
                </li>
              )}
              {/* <li>
                <i className="fas fa-sign-out-alt mr-1" style={{ cursor: 'pointer' }} onClick={showModalRegister}></i>
                <span style={{ cursor: 'pointer' }} onClick={showModalRegister}>Đăng kí</span>
              </li> */}
            </ul>
          </Col>
        </Row>
      </Container>
      {/* <Login isOpen={isOpen} onClick={hideModal} />
    <Register isOpen={isOpenRegister} onClick={hideModalRegister} /> */}
    </div >
  )
}

export default TopHeader