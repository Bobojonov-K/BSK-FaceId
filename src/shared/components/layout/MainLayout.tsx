import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='min-h-screen bg-gray-50'>

      <Header onMenuToggle={() => setSidebarOpen((v) => !v)} />

      <div className='flex'>
    
        <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className='flex-1 md:ml-[260px] mt-16 p-4 md:p-6 min-w-0'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
