import { Link, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isDreamDetailPage = location.pathname.startsWith('/dream/');

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname.startsWith('/dream/');
    }
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const tabs = [
    { path: '/', label: 'Dream', icon: '✨' },
    { path: '/create', label: 'Create', icon: '➕' },
    { path: '/profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      {/* Top header for desktop */}
      <header className="hidden md:block bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <Link to="/" className="flex items-center text-xl font-semibold text-gray-900">
              Dream Fun
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {children}
      </main>

      {/* Bottom tab bar (mobile-first) - Hide on dream detail page */}
      {!isDreamDetailPage && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 md:hidden">
        <div className="flex justify-around">
          {tabs.map((tab) => {
            const active = isActive(tab.path);
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={`flex flex-col items-center justify-center py-3 px-6 flex-1 transition-colors ${
                  active
                    ? 'text-primary-600'
                    : 'text-gray-500'
                }`}
              >
                <span className="text-2xl mb-1">{tab.icon}</span>
                <span className={`text-xs font-medium ${active ? 'text-primary-600' : 'text-gray-500'}`}>
                  {tab.label}
                </span>
                {active && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
      )}

      {/* Desktop navigation - Hide on dream detail page */}
      {!isDreamDetailPage && (
        <nav className="hidden md:block bg-white border-t border-gray-200 sticky bottom-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-8 py-4">
            {tabs.map((tab) => {
              const active = isActive(tab.path);
              return (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    active
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
      )}
    </div>
  );
}

