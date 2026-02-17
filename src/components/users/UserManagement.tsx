import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Search, Plus, MoreHorizontal, Eye, Edit, Trash2, Shield, User } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'author' | 'reader';
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  lastActivity: string;
  avatar?: string;
}

interface UserManagementProps {
  userRole: string;
}

export function UserManagement({ userRole }: UserManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data
  const users: User[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      role: 'admin',
      status: 'active',
      joinDate: '2023-01-15',
      lastActivity: '2024-01-25'
    },
    {
      id: '2',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@university.edu',
      role: 'author',
      status: 'active',
      joinDate: '2023-03-15',
      lastActivity: '2024-01-24'
    },
    {
      id: '3',
      name: 'Michael Brown',
      email: 'michael.brown@reader.com',
      role: 'reader',
      status: 'active',
      joinDate: '2023-06-20',
      lastActivity: '2024-01-23'
    },
    {
      id: '4',
      name: 'Prof. Emily Davis',
      email: 'emily.davis@college.edu',
      role: 'author',
      status: 'inactive',
      joinDate: '2023-02-10',
      lastActivity: '2024-01-10'
    },
    {
      id: '5',
      name: 'Alex Wilson',
      email: 'alex.wilson@suspended.com',
      role: 'reader',
      status: 'suspended',
      joinDate: '2023-08-05',
      lastActivity: '2024-01-15'
    }
  ];

  const getRoleBadge = (role: string) => {
    const variants = {
      admin: 'bg-red-100 text-red-800 border-red-200',
      author: 'bg-green-100 text-green-800 border-green-200',
      reader: 'bg-blue-100 text-blue-800 border-blue-200'
    };

    return (
      <Badge className={`${variants[role as keyof typeof variants]} border capitalize`}>
        {role}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-100 text-green-800 border-green-200',
      inactive: 'bg-gray-100 text-gray-800 border-gray-200',
      suspended: 'bg-red-100 text-red-800 border-red-200'
    };

    return (
      <Badge className={`${variants[status as keyof typeof variants]} border capitalize`}>
        {status}
      </Badge>
    );
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Statistics
  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    admins: users.filter(u => u.role === 'admin').length,
    authors: users.filter(u => u.role === 'author').length,
    readers: users.filter(u => u.role === 'reader').length
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">User Management</h1>
          <p className="text-gray-600 mt-1">Manage user accounts, roles, and permissions</p>
        </div>
        {userRole === 'admin' && (
          <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        )}
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
              <h3 className="text-sm font-medium opacity-90">Total Users</h3>
              <p className="text-2xl font-bold mt-1">{stats.total}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
              <h3 className="text-sm font-medium opacity-90">Active Users</h3>
              <p className="text-2xl font-bold mt-1">{stats.active}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 text-white">
              <h3 className="text-sm font-medium opacity-90">Admins</h3>
              <p className="text-2xl font-bold mt-1">{stats.admins}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-4 text-white">
              <h3 className="text-sm font-medium opacity-90">Authors</h3>
              <p className="text-2xl font-bold mt-1">{stats.authors}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
              <h3 className="text-sm font-medium opacity-90">Readers</h3>
              <p className="text-2xl font-bold mt-1">{stats.readers}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="author">Author</SelectItem>
                <SelectItem value="reader">Reader</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead className="w-[70px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(user.lastActivity).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Profile
                        </DropdownMenuItem>
                        {userRole === 'admin' && (
                          <>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Shield className="mr-2 h-4 w-4" />
                              Manage Permissions
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              {user.status === 'suspended' ? 'Delete' : 'Suspend'} User
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Permissions Matrix Preview */}
      {userRole === 'admin' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Role Permissions Matrix</CardTitle>
              <Button variant="outline">
                <Shield className="mr-2 h-4 w-4" />
                Manage Permissions
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Role cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-red-200 border-2">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <Shield className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-800">Admin</h4>
                        <p className="text-sm text-red-600">{stats.admins} users</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">Full system access and management capabilities</p>
                  </CardContent>
                </Card>

                <Card className="border-green-200 border-2">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Edit className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-800">Author</h4>
                        <p className="text-sm text-green-600">{stats.authors} users</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">Create, edit, and publish articles</p>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 border-2">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-800">Reader</h4>
                        <p className="text-sm text-blue-600">{stats.readers} users</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">Read and bookmark articles</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}