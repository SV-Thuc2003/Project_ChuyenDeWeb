import React from 'react';
import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <div className={`w-full max-w-[1590px] mx-auto px-4 py-4 flex items-center ${className}`}>
      <nav className="text-gray-500 w-full">
        <ol className="flex flex-wrap items-center text-xl font-semibold">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={index} className="flex items-center">
                {index > 0 && <span className="mx-2">/</span>}

                {isLast || !item.path ? (
                  <span className={isLast ? 'font-medium' : ''}>{item.label}</span>
                ) : (
                  <Link 
                    to={item.path} 
                    className="hover:text-gray-700"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumbs;
