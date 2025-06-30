'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { useToast } from '@/hooks/use-toast';

export default function AdminLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'sse890') {
      sessionStorage.setItem('isAdminAuthenticated', 'true');
      toast({ title: 'Login Successful', description: 'Welcome to the admin dashboard.' });
      router.push('/admin');
      setError('');
    } else {
      setError('Invalid password. Please try again.');
      setPassword('');
    }
  };

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
