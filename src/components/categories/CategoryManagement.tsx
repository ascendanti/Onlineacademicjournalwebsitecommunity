import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Plus, Edit, Trash2, MoreHorizontal, FileText, Users } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  articleCount: number;
  authorCount: number;
  parentCategory?: string;
  color: string;
}

interface CategoryManagementProps {
  userRole: string;
}

export function CategoryManagement({ userRole }: CategoryManagementProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '📚',
    parentCategory: ''
  });

  // Mock data
  const categories: Category[] = [
    {
      id: '1',
      name: 'Computer Science',
      description: 'Algorithms, software engineering, artificial intelligence, and computational theory.',
      icon: '💻',
      articleCount: 234,
      authorCount: 67,
      color: 'border-blue-200'
    },
    {
      id: '2',
      name: 'Physics',
      description: 'Quantum mechanics, theoretical physics, particle physics, and astrophysics.',
      icon: '⚛️',
      articleCount: 189,
      authorCount: 45,
      color: 'border-purple-200'
    },
    {
      id: '3',
      name: 'Environmental Science',
      description: 'Climate change, ecology, conservation, and environmental policy research.',
      icon: '🌱',
      articleCount: 156,
      authorCount: 38,
      color: 'border-green-200'
    },
    {
      id: '4',
      name: 'Medicine',
      description: 'Clinical research, medical innovations, public health, and pharmaceutical studies.',
      icon: '⚕️',
      articleCount: 298,
      authorCount: 89,
      color: 'border-red-200'
    },
    {
      id: '5',
      name: 'Engineering',
      description: 'Mechanical, electrical, civil, and chemical engineering research and innovations.',
      icon: '⚙️',
      articleCount: 167,
      authorCount: 52,
      color: 'border-orange-200'
    },
    {
      id: '6',
      name: 'Psychology',
      description: 'Behavioral studies, cognitive psychology, social psychology, and mental health research.',
      icon: '🧠',
      articleCount: 124,
      authorCount: 34,
      color: 'border-indigo-200'
    }
  ];

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      icon: category.icon,
      parentCategory: category.parentCategory || ''
    });
    setIsEditing(true);
  };

  const handleCreateNew = () => {
    setSelectedCategory(null);
    setFormData({
      name: '',
      description: '',
      icon: '📚',
      parentCategory: ''
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving category:', formData);
    setIsEditing(false);
    setSelectedCategory(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedCategory(null);
    setFormData({
      name: '',
      description: '',
      icon: '📚',
      parentCategory: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">Category Management</h1>
          <p className="text-gray-600 mt-1">Organize articles into categories and subcategories</p>
        </div>
        {userRole === 'admin' && (
          <Button onClick={handleCreateNew} className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Categories Grid */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Categories ({categories.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((category) => (
                  <Card key={category.id} className={`hover:shadow-md transition-shadow ${category.color} border-2`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{category.icon}</div>
                          <div>
                            <h3 className="font-semibold">{category.name}</h3>
                          </div>
                        </div>
                        {userRole === 'admin' && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditCategory(category)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {category.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-gray-600">
                            <FileText className="h-4 w-4" />
                            <span>{category.articleCount}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <Users className="h-4 w-4" />
                            <span>{category.authorCount}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          Active
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Form */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>
                {isEditing ? (selectedCategory ? 'Edit Category' : 'New Category') : 'Category Details'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                  <div className="space-y-2">
                    <Label htmlFor="name">Category Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter category name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Enter category description"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="icon">Icon</Label>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl">{formData.icon}</div>
                      <Input
                        id="icon"
                        value={formData.icon}
                        onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                        placeholder="Enter emoji"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="parent">Parent Category</Label>
                    <Select 
                      value={formData.parentCategory} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, parentCategory: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select parent category (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">None (Top Level)</SelectItem>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.icon} {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1">
                      {selectedCategory ? 'Update' : 'Create'}
                    </Button>
                    <Button type="button" variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-4">📂</div>
                  <p>Select a category to view details or create a new one.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}