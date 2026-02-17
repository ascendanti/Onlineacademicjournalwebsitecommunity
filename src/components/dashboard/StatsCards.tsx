import { Card, CardContent } from '../ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCard {
  title: string;
  value: string | number;
  change: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
  };
  gradient: string;
}

interface StatsCardsProps {
  userRole: string;
}

export function StatsCards({ userRole }: StatsCardsProps) {
  const getStatsForRole = (): StatCard[] => {
    if (userRole === 'admin') {
      return [
        {
          title: 'Total Articles',
          value: '2,847',
          change: { value: 12, type: 'increase' },
          gradient: 'from-blue-500 to-blue-600'
        },
        {
          title: 'Published',
          value: '2,156',
          change: { value: 8, type: 'increase' },
          gradient: 'from-green-500 to-green-600'
        },
        {
          title: 'Pending Review',
          value: '234',
          change: { value: 5, type: 'decrease' },
          gradient: 'from-orange-500 to-orange-600'
        },
        {
          title: 'Drafts',
          value: '457',
          change: { value: 15, type: 'increase' },
          gradient: 'from-gray-500 to-gray-600'
        },
        {
          title: 'Active Users',
          value: '1,234',
          change: { value: 3, type: 'increase' },
          gradient: 'from-purple-500 to-purple-600'
        }
      ];
    } else if (userRole === 'author') {
      return [
        {
          title: 'My Articles',
          value: '12',
          change: { value: 2, type: 'increase' },
          gradient: 'from-blue-500 to-blue-600'
        },
        {
          title: 'Published',
          value: '8',
          change: { value: 1, type: 'increase' },
          gradient: 'from-green-500 to-green-600'
        },
        {
          title: 'In Review',
          value: '2',
          change: { value: 0, type: 'neutral' },
          gradient: 'from-orange-500 to-orange-600'
        },
        {
          title: 'Drafts',
          value: '2',
          change: { value: 1, type: 'increase' },
          gradient: 'from-gray-500 to-gray-600'
        },
        {
          title: 'Total Views',
          value: '15.2K',
          change: { value: 8, type: 'increase' },
          gradient: 'from-indigo-500 to-indigo-600'
        }
      ];
    } else {
      return [
        {
          title: 'Articles Read',
          value: '47',
          change: { value: 5, type: 'increase' },
          gradient: 'from-blue-500 to-blue-600'
        },
        {
          title: 'Bookmarked',
          value: '23',
          change: { value: 3, type: 'increase' },
          gradient: 'from-green-500 to-green-600'
        },
        {
          title: 'Categories',
          value: '8',
          change: { value: 1, type: 'increase' },
          gradient: 'from-purple-500 to-purple-600'
        },
        {
          title: 'Authors Followed',
          value: '15',
          change: { value: 2, type: 'increase' },
          gradient: 'from-teal-500 to-teal-600'
        }
      ];
    }
  };

  const stats = getStatsForRole();

  const getChangeIcon = (type: string) => {
    switch (type) {
      case 'increase':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'decrease':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getChangeColor = (type: string) => {
    switch (type) {
      case 'increase':
        return 'text-green-600';
      case 'decrease':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
          <CardContent className="p-0">
            <div className={`bg-gradient-to-r ${stat.gradient} p-4 text-white`}>
              <h3 className="text-sm font-medium opacity-90">{stat.title}</h3>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2">
                {getChangeIcon(stat.change.type)}
                <span className={`text-sm font-medium ${getChangeColor(stat.change.type)}`}>
                  {stat.change.value > 0 && '+'}
                  {stat.change.value}%
                </span>
                <span className="text-sm text-gray-500">vs last month</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}