import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function withAuth(AuthenticatedComponent) {
  const Component = (props) => {
    const isAuth = useSelector(state => state.user.isAuth)
    
    return isAuth ? (
      <AuthenticatedComponent {...props} />
    ) : (
      <Navigate to="/login" />
    );
  };

  return Component;
}