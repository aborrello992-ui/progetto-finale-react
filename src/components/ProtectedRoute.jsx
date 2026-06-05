import { Navigate } from 'react-router-dom'
import { useUserContext } from '../context/UserContext.jsx'
import routes from '../router/routes.js'

function ProtectedRoute({ children }) {
  const { user } = useUserContext()

  if (!user) {
    return <Navigate to={routes.login} />
  }

  return children
}

export default ProtectedRoute