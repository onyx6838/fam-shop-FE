import React from 'react'
import { Modal, ModalBody, ModalTitle, Form } from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'

import '../../assets/css/bootstrap.css'
import '../../assets/css/style.css'

const Register = ({ isOpen, onClick }) => {
  return (
    <Modal show={isOpen}>
      <ModalHeader>
        <ModalTitle>Register</ModalTitle>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true" onClick={onClick}>×</span>
        </button>
      </ModalHeader>
      <ModalBody>
        <Form>
          <Form.Group controlId="formUsername" className='form-group'>
            <Form.Control type="text" name="username" placeholder="Username..." />
          </Form.Group>
          <Form.Group controlId="formFullname" className='form-group'>
            <Form.Control type="text" name="fullname" placeholder="Fullname..." />
          </Form.Group>
          <Form.Group controlId="formPassword" className='form-group'>
            <Form.Control type="password" name="password" placeholder="Password..." />
          </Form.Group>
          <Form.Group controlId="formConfirmPassword" className='form-group'>
            <Form.Control type="password" name="password" placeholder="Confirm password..." />
          </Form.Group>
          <div className="right-w3l">
            <input type="submit" className="form-control" value="Register" />
          </div>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default Register