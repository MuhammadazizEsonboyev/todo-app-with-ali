import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export const RequireAuth = ({ children }) => {
    const jwt = useSelector(s => s.user.jwt)

    if (!jwt) {
        return <Navigate to={"/auth/login"} replace />
    }
    return children
}
