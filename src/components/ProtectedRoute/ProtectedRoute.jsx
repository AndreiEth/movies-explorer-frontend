import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import Preloader from '../common/Preloader/Preloader';

function ProtectedRoute ({ loggedIn, children }) {
  if (loggedIn === null) {
    return (
      <>
        <Preloader />
        <Link
          to='/'
        >
          На главную
        </Link>
      </>
    );
  }

  return loggedIn ? children : <Navigate to='/' />;
}

export default ProtectedRoute;
