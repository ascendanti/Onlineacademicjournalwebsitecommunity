import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Search, Filter, Plus, MoreHorizontal, Eye, Edit, Trash2, Download } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  author: string;
  category: string;
  status: 'published' | 'pending' | 'draft' | 'rejected';
  date: string;
  views: number;
}

interface ArticleManagementProps {
  userRole: string;
}

export function ArticleManagement({ userRole }: ArticleManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Mock data
  const articles: Article[] = [
    {
      id: '1',
      title: 'Machine Learning Applications in Healthcare Data Analysis',
      author: 'Dr. Sarah Johnson',
      category: 'Computer Science',
      status: 'published',
      date: '2024-01-15',
      views: 1847
    },
    {
      id: '2',
      title: 'Quantum Computing Algorithms for Cryptographic Security',
      author: 'Prof. Michael Chen',
      category: 'Physics',
      status: 'pending',
      date: '2024-01-20',
      views: 234
    },
    {
      id: '3',
      title: 'Environmental Impact of Renewable Energy Technologies',
      author: 'Dr. Emily Rodriguez',
      category: 'Environmental Science',
      status: 'draft',
      date: '2024-01-22',
      views: 0
    },
    {
      id: '4',
      title: 'Advanced Materials for Sustainable Construction',
      author: 'Prof. David Kim',
      category: 'Engineering',
      status: 'published',
      date: '2024-01-18',
      views: 892
    },
    {
      id: '5',
      title: 'Psychological Effects of Remote Work on Productivity',
      author: 'Dr. Lisa Thompson',
      category: 'Psychology',
      status: 'rejected',
      date: '2024-01-12',
      views: 156
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      published: 'bg-green-100 text-green-800 border-green-200',
      pending: 'bg-orange-100 text-orange-800 border-orange-200',
      draft: 'bg-gray-100 text-gray-800 border-gray-200',
      rejected: 'bg-red-100 text-red-800 border-red-200'
    };

    return (
      <Badge className={`${variants[status as keyof typeof variants]} border`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || article.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || article.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">Articles Management</h1>
          <p className="text-gray-600 mt-1">Manage and review submitted articles</p>
        </div>
        {(userRole === 'admin' || userRole === 'author') && (
          <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
            <Plus className="mr-2 h-4 w-4" />
            New Article
          </Button>
        )}
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
                  placeholder="Search articles, authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Physics">Physics</SelectItem>
                <SelectItem value="Environmental Science">Environmental Science</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Psychology">Psychology</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Advanced
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Articles Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Articles ({filteredArticles.length})</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Views</TableHead>
                <TableHead className="w-[70px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredArticles.map((article) => (
                <TableRow key={article.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium max-w-xs">
                    <div className="truncate" title={article.title}>
                      {article.title}
                    </div>
                  </TableCell>
                  <TableCell>{article.author}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{article.category}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(article.status)}</TableCell>
                  <TableCell>{new Date(article.date).toLocaleDateString()}</TableCell>
                  <TableCell>{article.views.toLocaleString()}</TableCell>
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
                          View
                        </DropdownMenuItem>
                        {(userRole === 'admin' || userRole === 'author') && (
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        )}
                        {userRole === 'admin' && (
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
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
    </div>
  );
}