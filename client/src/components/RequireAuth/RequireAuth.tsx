import { Navigate, Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"



function RequireAuth() {
    const {auth} = useAuth()

    console.log("in arequire auth : ", auth);

  return (
    auth?.user.id ? <Outlet/> : <Navigate to="/login"/>
  )
}

export default RequireAuth