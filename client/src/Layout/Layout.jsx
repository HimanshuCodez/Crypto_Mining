import React from 'react'

import Navbar from '../Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
      <div className='font-[Montserrat] bg-[#F7F7F7] flex'>
   <Navbar/>
   <main><Outlet/></main>
    </div>
  )
}

export default Layout