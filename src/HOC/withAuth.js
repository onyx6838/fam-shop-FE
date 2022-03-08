import React from 'react'

function withAuth(AuthenticatedComponent) {

  class HOC extends React.Component {
    render() {
      return (
        <AuthenticatedComponent {...this.props} />
      );
    }
  }
  return HOC;
}

export default withAuth;