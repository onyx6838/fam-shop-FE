import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import '../../assets/css/bootstrap.css'
import '../../assets/css/style.css'
import '../../assets/css/popuo-box.css'
import '../../assets/css/fontawesome-all.css'
import Login from '../Auth/Login'
import Register from '../Auth/Register'

const TopHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  const showModalRegister = () => {
    setIsOpenRegister(true);
  };

  const hideModalRegister = () => {
    setIsOpenRegister(false);
  };

  return (
    <div className="agile-main-top">
      <Container>
        <Row className="main-top-w3l py-2">
          <Col lg={3} sm={4} className="header-most-top">
            <p className=" text-lg-left text-center">Chào mừng đến với cửa hàng!</p>
          </Col>
          <Col lg={9} sm={8} className="header-right ml-auto text-sm-right text-center">
            <ul className="top-header-lists">
              <li className="mx-3">
                <i className="fas fa-sign-in-alt mr-1" style={{ cursor: 'pointer' }} onClick={showModal}></i>
                <span style={{ cursor: 'pointer' }} onClick={showModal}>Đăng nhập</span>
              </li>
              <li>
                <i className="fas fa-sign-out-alt mr-1" style={{ cursor: 'pointer' }} onClick={showModalRegister}></i>
                <span style={{ cursor: 'pointer' }} onClick={showModalRegister}>Đăng kí</span>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
      <Login isOpen={isOpen} onClick={hideModal}/>
      <Register isOpen={isOpenRegister} onClick={hideModalRegister}/>
    </div>
  )
}

export default TopHeader