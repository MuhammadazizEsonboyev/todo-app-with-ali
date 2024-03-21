import React from 'react'
import { userActions } from '../../store/user.slice'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

export default function Layout() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const profile = useSelector(s => s.user.profile)
    const items = useSelector(s => s.cart.items)

    useEffect(() => {
        dispatch(getProfile())
    }, [dispatch])

    const logout = () => {
        dispatch(userActions.logout())
        navigate("/auth/login")
    }

    return (
        <div>
            <NavLink to={'/'}>
                Меню
            </NavLink>
            <div>
                <Outlet />
            </div>
        </div>
    )
}
