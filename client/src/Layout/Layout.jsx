import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import { FaBars } from 'react-icons/fa';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className='font-[Montserrat] bg-[#F7F7F7] flex min-h-screen'>
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col md:ml-[22vw]">
        <header className="p-4 bg-white shadow-md md:hidden">
          <button onClick={() => setIsSidebarOpen(true)}>
            <FaBars className="text-2xl" />
          </button>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;