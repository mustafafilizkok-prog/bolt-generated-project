import { Bell, BarChart3, FileText, Users, LogOut, Menu, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { icon: BarChart3, label: 'Dashboard', path: '/' },
  { icon: FileText, label: 'Pipeline', path: '/pipeline' },
  { icon: FileText, label: 'Reports', path: '/reports' },
  { icon: Users, label: 'Clients', path: '/clients' },
  { icon: Bell, label: 'Notifications', path: '/notifications' },
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: LogOut, label: 'Logout', path: '/logout' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 flex flex-col h-full bg-[#5080FF] border-r">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <h1 className="text-2xl font-bold text-white">Kredi</h1>
        <button className="p-2 rounded-lg hover:bg-white/10">
          <Menu className="w-5 h-5 text-white" />
        </button>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
                  location.pathname === item.path
                    ? 'bg-white/20 text-white'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 mt-auto">
        <div className="flex items-center border-t border-white/10 pt-4">
          <img 
            src="/plus.png"
            alt="Plus Icon" 
            className="w-8 h-8 rounded-full object-cover"
            style={{ display: 'block' }}
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-white">Paul Abassi</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
