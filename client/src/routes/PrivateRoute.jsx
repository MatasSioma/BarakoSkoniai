import { Navigate } from 'react-router-dom'

function PrivateRoute({ isAuth, children }) {
  return isAuth ? children : <Navigate to='/login' />
}

export default PrivateRoute