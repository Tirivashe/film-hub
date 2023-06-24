import { Navigate, Outlet } from "react-router-dom"
import { useStore } from "../store"

const ProtectedRoutes = () => {
  const token = useStore(state => state.token)
  return (
    token ? <Outlet /> : <Navigate to="/welcome"/>
  )
}

export default ProtectedRoutes