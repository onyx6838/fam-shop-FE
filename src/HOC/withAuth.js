import React from 'react'
import { Navigate } from 'react-router-dom';
import storage from '../storage/storage';

export default function withAuth(AuthenticatedComponent) {
  const Component = (props) => {
    //const isAuth = useSelector(state => state.user.isAuth)
    
    return !storage.isAuth() ? (
      <Navigate to="/login" />
    ) : (
      <AuthenticatedComponent {...props} />
    );
  };

  return Component;
}