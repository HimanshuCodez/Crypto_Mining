import React from 'react'

import Navbar from '../Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
      <div className='font-[Montserrat] flex-1 ml-[22vw] p-6 bg-[#F7F7F7] flex'>
   <Navbar/>
   <main><Outlet/></main>
    </div>
  )
}

export default Layout