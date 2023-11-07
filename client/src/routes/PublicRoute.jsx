import { Navigate, useNavigate } from 'react-router-dom';

function PublicRoute({ isAuth, children }) {
  const navigate = useNavigate();

  if (!isAuth) {
    // If not authenticated, navigate to the login page
    navigate('/');
    return null; // Return null to prevent rendering the component
  }

  // If authenticated, render the component
  return children;
}

export default PublicRoute;