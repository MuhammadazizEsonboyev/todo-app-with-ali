import React, { useEffect } from 'react'
import { getProfile, userActions } from '../../store/user.slice'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Home from '../../pages/Home/Home'

export default function Layout() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const profile = useSelector(s => s.user.profile)
    // const items = useSelector(s => s.cart.items)

    useEffect(() => {
        dispatch(getProfile())
    }, [dispatch])

    const logout = () => {
        dispatch(userActions.logout())
        navigate("/auth/login")
    }

    return (
        <div>


            <nav class="bg-white border-gray-200 dark:bg-gray-900">
                <div class="w-full flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="https://t.me/shogirdev" class="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="../../../public/vite.svg" class="h-8" alt="Flowbite Logo" />
                        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Shogirdev</span>
                    </a>
                    <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <button type="button" class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                            <span class="sr-only">Open user menu</span>
                            <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo" />
                        </button>
                        <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                            <ul class="py-2" aria-labelledby="user-menu-button">
                                <li onClick={logout}>
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <Home />
        </div>
    )
}
