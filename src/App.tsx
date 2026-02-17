import { useState } from 'react';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { DashboardHeader } from './components/layout/DashboardHeader';
import { DashboardSidebar } from './components/layout/DashboardSidebar';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { ArticleManagement } from './components/articles/ArticleManagement';
import { CategoryManagement } from './components/categories/CategoryManagement';
import { AuthorManagement } from './components/authors/AuthorManagement';
import { UserManagement } from './components/users/UserManagement';

interface User {
  name: string;
  email: string;
  role: 'admin' | 'author' | 'reader';
  avatar?: string;
}

export default function App() {
  const [currentView, setCurrentView] = useState<'login' | 'register' | 'dashboard'>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleLogin = (email: string, password: string) => {
    // Mock authentication - in real app, this would call an API
    const mockUser: User = {
      name: email.includes('admin') ? 'John Smith' : email.includes('author') ? 'Dr. Sarah Johnson' : 'Michael Brown',
      email: email,
      role: email.includes('admin') ? 'admin' : email.includes('author') ? 'author' : 'reader'
    };
    setCurrentUser(mockUser);
    setCurrentView('dashboard');
  };

  const handleRegister = (userData: any) => {
    // Mock registration - in real app, this would call an API
    const newUser: User = {
      name: userData.name,
      email: userData.email,
      role: userData.role
    };
    setCurrentUser(newUser);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('login');
    setActiveSection('dashboard');
  };

  const renderMainContent = () => {
    if (!currentUser) return null;

    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview userRole={currentUser.role} />;
      case 'articles':
      case 'my-articles':
      case 'browse':
        return <ArticleManagement userRole={currentUser.role} />;
      case 'categories':
        return <CategoryManagement userRole={currentUser.role} />;
      case 'authors':
        return <AuthorManagement userRole={currentUser.role} />;
      case 'users':
        return <UserManagement userRole={currentUser.role} />;
      default:
        return <DashboardOverview userRole={currentUser.role} />;
    }
  };

  // Authentication views
  if (currentView === 'login') {
    return (
      <LoginForm 
        onLogin={handleLogin}
        onSwitchToRegister={() => setCurrentView('register')}
      />
    );
  }

  if (currentView === 'register') {
    return (
      <RegisterForm 
        onRegister={handleRegister}
        onSwitchToLogin={() => setCurrentView('login')}
      />
    );
  }

  // Dashboard view
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <DashboardHeader user={currentUser!} onLogout={handleLogout} />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <DashboardSidebar 
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          userRole={currentUser!.role}
        />

        {/* Main Panel */}
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            {renderMainContent()}
          </div>
        </main>
      </div>
    </div>
  );
}