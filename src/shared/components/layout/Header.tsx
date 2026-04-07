import { Search, Bell, ChevronRight, Menu } from 'lucide-react';
import React, { useState } from 'react';

interface HeaderProps {
  onMenuToggle: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className='fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 shadow-sm z-50'>
      <div className='h-full flex items-center justify-between px-4 md:px-6 gap-3'>
        {/* ── Chap: Hamburger (faqat mobil) + Logo + Breadcrumb ── */}
        <div className='flex items-center gap-3 min-w-0'>
          {/* Hamburger — faqat mobil/tabletda */}
          <button
            onClick={onMenuToggle}
            className='md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0'
          >
            <Menu className='w-5 h-5 text-gray-600' />
          </button>

          {/* Logo */}
          <div className='w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0'>
            <svg
              className='w-5 h-5 text-white'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
              />
            </svg>
          </div>

          {/* Breadcrumb — kichik ekranlarda yashiriladi */}
          <div className='hidden sm:flex items-center gap-2 text-sm min-w-0'>
            <span className='text-gray-500 truncate'>BSK FaceID</span>
            <ChevronRight className='w-4 h-4 text-gray-400 flex-shrink-0' />
            <span className='font-medium text-gray-900 truncate'>Dashboard</span>
          </div>
        </div>

        {/* ── O'rta: Search (desktopda doim, mobilda icon bosib ochiladi) ── */}
        <div className='flex-1 max-w-md mx-2 md:mx-6'>
          {/* Desktop search */}
          <div className='hidden sm:block relative'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
            <input
              type='text'
              placeholder='Qidirish...'
              className='w-full h-9 pl-9 pr-4 bg-gray-50 border border-gray-200 rounded-full text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all'
            />
          </div>

          {/* Mobil: kengayib chiqadigan search */}
          {searchOpen && (
            <div className='sm:hidden relative'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
              <input
                autoFocus
                type='text'
                placeholder='Qidirish...'
                onBlur={() => setSearchOpen(false)}
                className='w-full h-9 pl-9 pr-4 bg-gray-50 border border-gray-200 rounded-full text-sm
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white'
              />
            </div>
          )}
        </div>

        {/* ── O'ng: Amallar ── */}
        <div className='flex items-center gap-1 md:gap-3 flex-shrink-0'>
          {/* Mobil search tugmasi */}
          {!searchOpen && (
            <button
              onClick={() => setSearchOpen(true)}
              className='sm:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors'
            >
              <Search className='w-5 h-5 text-gray-600' />
            </button>
          )}

          {/* Bildirishnoma */}
          <button className='relative p-2 hover:bg-gray-100 rounded-lg transition-colors'>
            <Bell className='w-5 h-5 text-gray-600' />
            <span className='absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full' />
          </button>

          {/* Profil */}
          <div className='flex items-center gap-2 md:gap-3 pl-2 md:pl-4 border-l border-gray-200'>
            {/* Ism-familiya — faqat desktopda */}
            <div className='hidden md:block text-right'>
              <p className='text-sm font-medium text-gray-900 leading-tight'>Admin</p>
              <p className='text-xs text-gray-500 leading-tight'>BSK Administrator</p>
            </div>
            {/* Avatar */}
            <div className='w-8 h-8 md:w-9 md:h-9 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer hover:bg-blue-200 transition-colors'>
              <span className='text-sm font-semibold text-blue-600'>A</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
