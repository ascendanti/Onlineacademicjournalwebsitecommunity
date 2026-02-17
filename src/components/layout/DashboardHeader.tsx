import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Bell, Search, Settings, LogOut, User, GraduationCap } from 'lucide-react';

interface DashboardHeaderProps {
  user: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
  onLogout: () => void;
}

export function DashboardHeader({ user, onLogout }: DashboardHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="h-20 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      {/* Logo and Brand */}
      <div className="flex items-center gap-3">
        <GraduationCap className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-xl text-blue-600">AcademicHub</h1>
          <p className="text-xs text-gray-500">Journal Management</p>
        </div>
      </div>

      {/* Global Search */}
      <div className="flex-1 max-w-2xl mx-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search articles, authors, categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 h-12 bg-gray-50 border-gray-200 rounded-lg"
          />
        </div>
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
            3
          </span>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-12 w-12 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-blue-100 text-blue-700">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                <p className="text-xs leading-none text-blue-600 capitalize">{user.role}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}