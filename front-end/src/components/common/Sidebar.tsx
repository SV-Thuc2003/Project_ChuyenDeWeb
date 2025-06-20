import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IconType } from 'react-icons';
import { IoHomeOutline } from "react-icons/io5";
import { FaClipboardList } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { useTranslation } from 'react-i18next';

interface SidebarItem {
  icon: IconType;
  labelKey: string; // dùng key thay vì text cứng
  path: string;
}

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const sidebarItems: SidebarItem[] = [
    {
      icon: IoHomeOutline,
      labelKey: 'profile.info',
      path: '/profile'
    },
    {
      icon: FaClipboardList,
      labelKey: 'profile.orders',
      path: '/profile/orders'
    },
    {
      icon: MdSecurity,
      labelKey: 'profile.security',
      path: '/profile/security'
    },
    {
      icon: AiOutlineHeart,
      labelKey: 'profile.favorites',
      path: '/profile/favorites'
    },
    {
      icon: FiLogOut,
      labelKey: 'profile.logout',
      path: '/logout'
    }
  ];

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.currentTarget.getAttribute('href') === '/logout') {
      e.preventDefault();
      console.log('Logging out...');
      // Thêm logout logic ở đây
    }
  };

  return (
      <div className="bg-white p-5 rounded-lg">
        {sidebarItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
              <Link
                  key={index}
                  to={item.path}
                  onClick={handleLogout}
                  className={`flex items-center p-3 mb-3 rounded-sm ${
                      isActive ? 'bg-[#fff7ef]' : ''
                  }`}
              >
                <Icon className="w-5 h-5 text-[#313f53]" />
                <span
                    className={`ml-4 text-base font-medium ${
                        isActive ? 'text-[#fd7e14]' : 'text-[#313f53]'
                    }`}
                >
              {t(item.labelKey)}
            </span>
              </Link>
          );
        })}
      </div>
  );
};

export default Sidebar;
