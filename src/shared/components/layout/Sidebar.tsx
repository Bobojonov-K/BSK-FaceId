import {
  LayoutDashboard,
  Users,
  Building2,
  Smartphone,
  ClipboardList,
  PieChart,
  Ticket,
  UserCircle,
  Settings,
  BriefcaseBusiness,
  X,
} from 'lucide-react';
import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Users, label: 'Rezidentlar', href: '/residents' },
  { icon: Building2, label: 'Binolar', href: '/buildings' },
  { icon: Smartphone, label: 'Terminallar', href: '/terminals', badge: true },
  { icon: ClipboardList, label: 'Kirish Loglari', href: '/logs' },
  { icon: PieChart, label: 'Hisobotlar', href: '/reports' },
  { icon: Ticket, label: 'Mehmonlar', href: '/guests' },
  { icon: UserCircle, label: 'Foydalanuvchilar', href: '/users' },
  { icon: BriefcaseBusiness, label: 'Tashkilotlar', href: '/organizations' },
  { icon: BriefcaseBusiness, label: 'Tashkilot turlari', href: '/organizations-types' },
  { icon: BriefcaseBusiness, label: 'Soato regionlari', href: '/soato-regions' },
  { icon: Settings, label: 'Sozlamalar', href: '/settings' },
];

interface SidebarProps {
  /** Mobilda ochiq/yopiq holati — MainLayout dan boshqariladi */
  mobileOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ mobileOpen = false, onClose }: SidebarProps) {
  const location = useLocation();

  const navContent = (
    <nav className='p-4 space-y-1'>
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.href;

        return (
          <Link
            key={item.href}
            to={item.href}
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
              ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            <Icon
              className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-500'}`}
            />
            <span
              className={`flex-1 font-medium text-sm ${isActive ? 'text-white' : 'text-gray-800'}`}
            >
              {item.label}
            </span>
            {item.badge && !isActive && (
              <span className='w-2 h-2 bg-green-500 rounded-full flex-shrink-0' />
            )}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* ── Desktop sidebar (md va undan katta) ── */}
      <aside className='hidden md:block fixed left-0 top-16 bottom-0 w-[260px] bg-white border-r border-gray-100 overflow-y-auto z-30'>
        {navContent}
      </aside>

      {/* ── Mobil: backdrop ── */}
      {mobileOpen && <div className='fixed inset-0 bg-black/40 z-40 md:hidden' onClick={onClose} />}

      {/* ── Mobil: drawer (chap tomondan siljib chiqadi) ── */}
      <aside
        className={`
          fixed top-0 left-0 bottom-0 w-[280px] bg-white z-50 md:hidden
          flex flex-col shadow-xl
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Drawer header */}
        <div className='h-16 flex items-center justify-between px-4 border-b border-gray-100 flex-shrink-0'>
          <div className='flex items-center gap-3'>
            <div className='w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center'>
              <svg
                className='w-4 h-4 text-white'
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
            <span className='font-semibold text-gray-900'>BSK FaceID</span>
          </div>
          <button onClick={onClose} className='p-2 rounded-lg hover:bg-gray-100 transition-colors'>
            <X className='w-5 h-5 text-gray-500' />
          </button>
        </div>

        {/* Scroll bo'ladigan nav */}
        <div className='flex-1 overflow-y-auto'>{navContent}</div>
      </aside>
    </>
  );
}
