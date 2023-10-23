import { Navigate } from 'react-router-dom'

function PublicRoute({ isAuth, children }) {
  return !isAuth ? children : <Navigate to='/dashboard' />
}

export default PublicRoute