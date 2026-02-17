import { Button } from '../ui/button';
import { cn } from '../ui/utils';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Folder, 
  Settings, 
  UserCheck,
  PlusCircle,
  BarChart3
} from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: number;
}

interface DashboardSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  userRole: string;
}

export function DashboardSidebar({ activeSection, onSectionChange, userRole }: DashboardSidebarProps) {
  const getMenuItems = (): SidebarItem[] => {
    const baseItems: SidebarItem[] = [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ];

    if (userRole === 'admin') {
      return [
        ...baseItems,
        { id: 'articles', label: 'Articles Management', icon: FileText, count: 48 },
        { id: 'categories', label: 'Categories', icon: Folder, count: 12 },
        { id: 'authors', label: 'Authors', icon: Users, count: 156 },
        { id: 'users', label: 'User Management', icon: UserCheck, count: 234 },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'settings', label: 'Settings', icon: Settings },
      ];
    } else if (userRole === 'author') {
      return [
        ...baseItems,
        { id: 'my-articles', label: 'My Articles', icon: FileText, count: 8 },
        { id: 'create-article', label: 'Create Article', icon: PlusCircle },
        { id: 'categories', label: 'Browse Categories', icon: Folder },
        { id: 'settings', label: 'Settings', icon: Settings },
      ];
    } else {
      return [
        ...baseItems,
        { id: 'browse', label: 'Browse Articles', icon: FileText },
        { id: 'categories', label: 'Categories', icon: Folder },
        { id: 'authors', label: 'Authors', icon: Users },
        { id: 'settings', label: 'Settings', icon: Settings },
      ];
    }
  };

  const menuItems = getMenuItems();

  return (
    <aside className="w-80 bg-white border-r border-gray-200 h-full">
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start h-12 px-4",
                  isActive 
                    ? "bg-blue-600 text-white hover:bg-blue-700" 
                    : "text-gray-700 hover:bg-gray-100"
                )}
                onClick={() => onSectionChange(item.id)}
              >
                <Icon className="mr-3 h-5 w-5" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.count && (
                  <span className={cn(
                    "px-2 py-1 text-xs rounded-full",
                    isActive 
                      ? "bg-blue-500 text-white" 
                      : "bg-gray-200 text-gray-600"
                  )}>
                    {item.count}
                  </span>
                )}
              </Button>
            );
          })}
        </nav>
      </div>

      {userRole === 'admin' && (
        <div className="mt-8 p-6 border-t border-gray-200">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">System Status</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Active Users</span>
                <span className="text-green-600 font-medium">1,234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Published Today</span>
                <span className="text-blue-600 font-medium">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pending Review</span>
                <span className="text-orange-600 font-medium">15</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}