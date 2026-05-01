import { Link, Outlet, useLocation } from 'react-router-dom';
import { getPackages } from '../lib/storage';
import { FileText, CheckCircle, Video, PlusCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Layout() {
  const location = useLocation();
  const [packages, setPackages] = useState(getPackages());

  // Update packages list when storage changes
  useEffect(() => {
    const handleStorageChange = () => setPackages(getPackages());
    window.addEventListener('storage', handleStorageChange);
    // Custom event for local updates
    window.addEventListener('bobflow-packages-updated', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('bobflow-packages-updated', handleStorageChange);
    };
  }, []);

  const navItems = [
    { name: 'New Ticket', path: '/new', icon: PlusCircle },
    { name: 'Bob Tracker', path: '/tracker', icon: CheckCircle },
    { name: 'Demo Script', path: '/demo', icon: Video },
  ];

  return (
    <div className="flex h-screen bg-[#f4f4f4] font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm z-10">
        <div className="p-6 border-b border-gray-200">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xl">B</div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">BobFlow</span>
          </Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-8">
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">Actions</h3>
            <ul className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                        isActive 
                          ? 'bg-blue-50 text-blue-700 font-medium' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3 flex items-center justify-between">
              Saved Packages
              <span className="bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-[10px]">{packages.length}</span>
            </h3>
            <ul className="space-y-1">
              {packages.length === 0 ? (
                <li className="px-3 py-2 text-sm text-gray-400 italic">No packages saved</li>
              ) : (
                packages.map((pkg) => (
                  <li key={pkg.id}>
                    <Link
                      to={`/package/${pkg.id}`}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm truncate ${
                        location.pathname === `/package/${pkg.id}`
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <FileText className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{pkg.title}</span>
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <div className="bg-blue-50 text-blue-800 text-xs p-3 rounded-md border border-blue-100">
            <strong>IBM Bob</strong> powered hackathon project
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <main className="max-w-6xl mx-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
