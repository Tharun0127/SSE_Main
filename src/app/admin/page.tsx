'use client';

import { useState, useEffect } from 'react';
import { AdminDashboard } from '@/components/admin-dashboard';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Lock } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminLoginPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // On component mount, check if the user is already authenticated in this session.
  useEffect(() => {
    const authStatus = sessionStorage.getItem('isAdminAuthenticated') === 'true';
    if (authStatus) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'sse890') {
      sessionStorage.setItem('isAdminAuthenticated', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password. Please try again.');
      setPassword('');
    }
  };

  // While checking auth, show a skeleton to prevent the login form from flashing.
  if (isLoading) {
    return (
       <div className="flex items-center justify-center min-h-screen bg-muted/40 p-4">
         <Skeleton className="w-full max-w-sm h-[380px]" />
       </div>
    );
  }

  // If authenticated, show the dashboard.
  if (isAuthenticated) {
    return <AdminDashboard />;
  }

  // Otherwise, show the login form.
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary text-primary-foreground p-3 rounded-full w-fit mb-4">
            <Lock className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl font-heading">Admin Access</CardTitle>
          <CardDescription>
            Please enter the password to access the dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <p className="text-sm font-medium text-destructive">{error}</p>
            )}
            <Button type="submit" className="w-full">
              Unlock
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
