import { StatsCards } from './StatsCards';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { TrendingUp, Calendar, BookOpen, Users, Eye, Clock } from 'lucide-react';

interface DashboardOverviewProps {
  userRole: string;
}

export function DashboardOverview({ userRole }: DashboardOverviewProps) {
  // Mock data
  const recentArticles = [
    {
      id: '1',
      title: 'Machine Learning Applications in Healthcare Data Analysis',
      author: 'Dr. Sarah Johnson',
      status: 'published',
      views: 1847,
      date: '2024-01-15'
    },
    {
      id: '2',
      title: 'Quantum Computing Algorithms for Cryptographic Security',
      author: 'Prof. Michael Chen',
      status: 'pending',
      views: 234,
      date: '2024-01-20'
    },
    {
      id: '3',
      title: 'Environmental Impact of Renewable Energy Technologies',
      author: 'Dr. Emily Rodriguez',
      status: 'draft',
      views: 0,
      date: '2024-01-22'
    }
  ];

  const topAuthors = [
    { name: 'Dr. Sarah Johnson', articles: 24, views: 45672 },
    { name: 'Prof. Michael Chen', articles: 18, views: 32145 },
    { name: 'Dr. Emily Rodriguez', articles: 31, views: 58924 },
    { name: 'Prof. David Kim', articles: 22, views: 41238 }
  ];

  const activityFeed = [
    { type: 'article', message: 'New article "AI Ethics in Medical Research" was published', time: '2 hours ago' },
    { type: 'review', message: 'Article "Climate Change Modeling" is pending review', time: '4 hours ago' },
    { type: 'user', message: 'New author Dr. James Wilson joined the platform', time: '6 hours ago' },
    { type: 'comment', message: 'New comment on "Quantum Computing Basics"', time: '8 hours ago' }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      published: 'bg-green-100 text-green-800 border-green-200',
      pending: 'bg-orange-100 text-orange-800 border-orange-200',
      draft: 'bg-gray-100 text-gray-800 border-gray-200'
    };

    return (
      <Badge className={`${variants[status as keyof typeof variants]} border text-xs`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">
            {userRole === 'admin' ? 'Admin Dashboard' : 
             userRole === 'author' ? 'Author Dashboard' : 
             'Reader Dashboard'}
          </h1>
          <p className="text-gray-600 mt-1">
            {userRole === 'admin' ? 'Monitor platform activity and manage content' :
             userRole === 'author' ? 'Track your publications and engagement' :
             'Discover and explore academic content'}
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>{new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
      </div>

      {/* Statistics Cards */}
      <StatsCards userRole={userRole} />

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Articles */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                {userRole === 'author' ? 'My Recent Articles' : 'Recent Articles'}
              </CardTitle>
              <Button variant="outline" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentArticles.map((article) => (
                  <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-medium mb-1 line-clamp-1">{article.title}</h4>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span>by {article.author}</span>
                        <span>•</span>
                        <span>{new Date(article.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Eye className="h-4 w-4" />
                        <span>{article.views}</span>
                      </div>
                      {getStatusBadge(article.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Feed */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityFeed.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="p-1.5 bg-blue-100 rounded-full">
                      <Clock className="h-3 w-3 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Authors */}
        {userRole === 'admin' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Top Authors This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topAuthors.map((author, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-blue-100 text-blue-700 text-sm">
                          {author.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{author.name}</p>
                        <p className="text-sm text-gray-500">{author.articles} articles</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{author.views.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">views</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {userRole === 'admin' && (
                <>
                  <Button variant="outline" className="h-16 flex-col gap-1">
                    <BookOpen className="h-5 w-5" />
                    <span className="text-xs">Review Articles</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-1">
                    <Users className="h-5 w-5" />
                    <span className="text-xs">Manage Users</span>
                  </Button>
                </>
              )}
              {userRole === 'author' && (
                <>
                  <Button variant="outline" className="h-16 flex-col gap-1">
                    <BookOpen className="h-5 w-5" />
                    <span className="text-xs">New Article</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-1">
                    <TrendingUp className="h-5 w-5" />
                    <span className="text-xs">View Analytics</span>
                  </Button>
                </>
              )}
              {userRole === 'reader' && (
                <>
                  <Button variant="outline" className="h-16 flex-col gap-1">
                    <BookOpen className="h-5 w-5" />
                    <span className="text-xs">Browse Articles</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-1">
                    <Users className="h-5 w-5" />
                    <span className="text-xs">Follow Authors</span>
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}