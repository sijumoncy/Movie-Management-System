import { Navigate, Outlet, useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"



function RequireAuth() {
    const {auth} = useAuth()
    const navigate = useNavigate();

    if(auth.tokens.access.expires) {
      const AccessExpireTime = auth.tokens.access.expires
      const diff = Date.parse(AccessExpireTime) - Date.now()
      if(diff <= 0) {
        // redirect to login as of now - later check refresh mechanism to generate new access token
        localStorage.removeItem('auth')
        navigate("/login")
      }
    }

    // refresh mechanishm will be implemented later as an enhancement based on time (after basic implementation)

  return (
    auth?.user.id ? <Outlet/> : <Navigate to="/login"/>
  )
}

export default RequireAuth