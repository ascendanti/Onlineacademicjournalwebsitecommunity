import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { GraduationCap, User, Mail, Lock, UserCheck } from 'lucide-react';

interface RegisterFormProps {
  onRegister: (userData: any) => void;
  onSwitchToLogin: () => void;
}

export function RegisterForm({ onRegister, onSwitchToLogin }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    termsAccepted: false
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!formData.termsAccepted) {
      alert('Please accept the terms and conditions');
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    onRegister(formData);
    setLoading(false);
  };

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center pb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl text-blue-600">AcademicHub</h1>
          </div>
          <CardTitle className="text-2xl">Create Your Account</CardTitle>
          <CardDescription>Join the academic community and start sharing knowledge</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    className="pl-10 h-14 bg-gray-50 border-gray-200 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    className="pl-10 h-14 bg-gray-50 border-gray-200 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => updateFormData('password', e.target.value)}
                    className="pl-10 h-14 bg-gray-50 border-gray-200 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                    className="pl-10 h-14 bg-gray-50 border-gray-200 rounded-xl"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Account Type</Label>
              <div className="relative">
                <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
                <Select value={formData.role} onValueChange={(value) => updateFormData('role', value)}>
                  <SelectTrigger className="h-14 pl-10 bg-gray-50 border-gray-200 rounded-xl">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reader">
                      <div className="flex flex-col">
                        <span>Reader</span>
                        <span className="text-sm text-gray-500">Access and read published articles</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="author">
                      <div className="flex flex-col">
                        <span>Author</span>
                        <span className="text-sm text-gray-500">Publish and manage your research articles</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.termsAccepted}
                onCheckedChange={(checked) => updateFormData('termsAccepted', checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm">
                I agree to the{' '}
                <button type="button" className="text-blue-600 hover:text-blue-700">
                  Terms and Conditions
                </button>{' '}
                and{' '}
                <button type="button" className="text-blue-600 hover:text-blue-700">
                  Privacy Policy
                </button>
              </Label>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] shadow-lg rounded-xl"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign in here
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}