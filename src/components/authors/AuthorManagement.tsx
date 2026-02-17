import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Search, Mail, Phone, MapPin, MoreHorizontal, Eye, Edit, Trash2, BookOpen, BarChart3 } from 'lucide-react';

interface Author {
  id: string;
  name: string;
  email: string;
  institution: string;
  expertise: string[];
  articlesCount: number;
  totalViews: number;
  totalCitations: number;
  status: 'active' | 'inactive';
  joinDate: string;
  avatar?: string;
}

interface AuthorManagementProps {
  userRole: string;
}

export function AuthorManagement({ userRole }: AuthorManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);

  // Mock data
  const authors: Author[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@university.edu',
      institution: 'Stanford University',
      expertise: ['Machine Learning', 'Healthcare AI', 'Data Science'],
      articlesCount: 24,
      totalViews: 45672,
      totalCitations: 1203,
      status: 'active',
      joinDate: '2023-03-15'
    },
    {
      id: '2',
      name: 'Prof. Michael Chen',
      email: 'michael.chen@mit.edu',
      institution: 'MIT',
      expertise: ['Quantum Computing', 'Cryptography', 'Algorithms'],
      articlesCount: 18,
      totalViews: 32145,
      totalCitations: 892,
      status: 'active',
      joinDate: '2023-01-22'
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      email: 'emily.rodriguez@berkeley.edu',
      institution: 'UC Berkeley',
      expertise: ['Environmental Science', 'Climate Change', 'Sustainability'],
      articlesCount: 31,
      totalViews: 58924,
      totalCitations: 1567,
      status: 'active',
      joinDate: '2022-11-08'
    },
    {
      id: '4',
      name: 'Prof. David Kim',
      email: 'david.kim@caltech.edu',
      institution: 'Caltech',
      expertise: ['Materials Science', 'Engineering', 'Nanotechnology'],
      articlesCount: 22,
      totalViews: 41238,
      totalCitations: 1045,
      status: 'inactive',
      joinDate: '2023-05-12'
    },
    {
      id: '5',
      name: 'Dr. Lisa Thompson',
      email: 'lisa.thompson@harvard.edu',
      institution: 'Harvard University',
      expertise: ['Psychology', 'Cognitive Science', 'Behavioral Studies'],
      articlesCount: 19,
      totalViews: 36789,
      totalCitations: 734,
      status: 'active',
      joinDate: '2023-02-28'
    }
  ];

  const filteredAuthors = authors.filter(author =>
    author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    author.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    author.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
    author.expertise.some(exp => exp.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getStatusBadge = (status: string) => {
    return status === 'active' ? (
      <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800 border-gray-200">Inactive</Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">Author Management</h1>
          <p className="text-gray-600 mt-1">Manage author profiles and track their contributions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Authors Table */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Authors ({filteredAuthors.length})</CardTitle>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search authors..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Author</TableHead>
                    <TableHead>Institution</TableHead>
                    <TableHead>Articles</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[70px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAuthors.map((author) => (
                    <TableRow 
                      key={author.id} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedAuthor(author)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={author.avatar} alt={author.name} />
                            <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                              {author.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{author.name}</div>
                            <div className="text-sm text-gray-500">{author.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{author.institution}</TableCell>
                      <TableCell>{author.articlesCount}</TableCell>
                      <TableCell>{author.totalViews.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(author.status)}</TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedAuthor(author)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            {userRole === 'admin' && (
                              <>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Deactivate
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
        </div>

        {/* Author Profile Panel */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Author Profile</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedAuthor ? (
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div className="text-center">
                    <Avatar className="h-20 w-20 mx-auto mb-4">
                      <AvatarImage src={selectedAuthor.avatar} alt={selectedAuthor.name} />
                      <AvatarFallback className="bg-blue-100 text-blue-700 text-lg">
                        {selectedAuthor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold">{selectedAuthor.name}</h3>
                    <p className="text-gray-600">{selectedAuthor.institution}</p>
                    {getStatusBadge(selectedAuthor.status)}
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{selectedAuthor.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{selectedAuthor.institution}</span>
                    </div>
                  </div>

                  {/* Expertise */}
                  <div>
                    <h4 className="font-medium mb-2">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedAuthor.expertise.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Statistics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <BookOpen className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                      <div className="text-lg font-semibold">{selectedAuthor.articlesCount}</div>
                      <div className="text-xs text-gray-600">Articles</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <BarChart3 className="h-5 w-5 mx-auto mb-1 text-green-600" />
                      <div className="text-lg font-semibold">{selectedAuthor.totalViews.toLocaleString()}</div>
                      <div className="text-xs text-gray-600">Total Views</div>
                    </div>
                  </div>

                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-lg font-semibold text-purple-700">{selectedAuthor.totalCitations}</div>
                    <div className="text-xs text-gray-600">Total Citations</div>
                  </div>

                  {/* Join Date */}
                  <div className="text-center text-sm text-gray-500">
                    Member since {new Date(selectedAuthor.joinDate).toLocaleDateString()}
                  </div>

                  {/* Actions */}
                  {userRole === 'admin' && (
                    <div className="space-y-2">
                      <Button className="w-full" variant="outline">
                        <Mail className="mr-2 h-4 w-4" />
                        Contact Author
                      </Button>
                      <Button className="w-full" variant="outline">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-4">👤</div>
                  <p>Select an author to view their profile and statistics.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}