import React from 'react'
import { Modal, ModalBody, ModalTitle, Form } from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'

import '../../assets/css/bootstrap.css'
import '../../assets/css/style.css'

import { Formik } from 'formik'

const Login = ({ isOpen, onClick }) => {

  const handleClickRegister = (e) => {
    e.preventDefault();
  }

  return (
    <Modal show={isOpen}>
      <ModalHeader>
        <ModalTitle>Log In</ModalTitle>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true" onClick={onClick}>×</span>
        </button>
      </ModalHeader>
      <ModalBody>
        <Formik initialValues={{ username: '', password: '' }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {props => (
            <Form onSubmit={props.handleSubmit}>
              <Form.Group controlId="formUsername" className='form-group'>
                <Form.Control type="text"
                  name="username"
                  placeholder="Username..."
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.username} />
              </Form.Group>
              <Form.Group controlId='formPassword' className='form-group'>
                <Form.Control type="password"
                  name="password"
                  placeholder="Password..."
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.password} />
              </Form.Group>
              <div className="right-w3l">
                <input type="submit" className="form-control" value="Log in" />
              </div>
              <div className="sub-w3l">
                <div className="custom-control custom-checkbox mr-sm-2">
                  <input type="checkbox" className="custom-control-input" id="customControlAutosizing" />
                  <label className="custom-control-label" htmlFor="customControlAutosizing">Remember me?</label>
                </div>
              </div>
              <p className="text-center dont-do mt-3">Don't have an account?&nbsp;
                <a href="/" onClick={handleClickRegister}>Register Now</a>
              </p>
            </Form>
          )}

        </Formik>
      </ModalBody>
    </Modal>
  )
}

export default Login