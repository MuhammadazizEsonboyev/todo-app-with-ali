import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './pages/Login/Login.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuthLayout from './Layout/auth/AuthLayout.jsx';
import Register from './pages/Register/Register.jsx';
import { Provider } from 'react-redux';
import store from "./store/store"
import { RequireAuth } from './helpers/RequireAuth.jsx';
import Layout from './Layout/menu/Menu.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <RequireAuth><Layout /></RequireAuth>
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      }
    ]
  },
  // {
  //   path: '*',
  //   element: <ErrorPage />
  // }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
