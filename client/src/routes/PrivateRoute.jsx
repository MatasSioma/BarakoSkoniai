import { Navigate, useNavigate } from 'react-router-dom';

function PrivateRoute({ isAuth, children }) {
  const navigate = useNavigate();

  if (!isAuth) {
    // If not authenticated, navigate to the login page
    navigate('/login');
    return null; // Return null to prevent rendering the component
  }

  // If authenticated, render the component
  return children;
}

export default PrivateRoute;
