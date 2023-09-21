import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Home from './Home'

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Home />
    </div>
  )
}

export default Layout