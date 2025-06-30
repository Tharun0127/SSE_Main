'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, type ReactNode } from 'react';
import { AdminNav } from '@/components/admin-nav';
import { Skeleton } from '@/components/ui/skeleton';

function AdminLoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="space-y-4 text-center">
            <h2 className="text-xl font-semibold text-muted-foreground">Verifying Access...</h2>
            <Skeleton className="h-2 w-64 mx-auto" />
        </div>
    </div>
  );
}


export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This check runs on the client side after the component mounts.
    const authStatus = sessionStorage.getItem('isAdminAuthenticated') === 'true';
    
    if (pathname.startsWith('/admin/login')) {
      // If on login page, handle redirection if already logged in.
      if (authStatus) {
        router.replace('/admin');
      }
      setIsAuthenticated(false);
    } else {
      // For all other admin pages, check for auth.
      if (!authStatus) {
        router.replace('/admin/login');
      }
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [pathname, router]);

  if (isLoading) {
    return <AdminLoadingScreen />;
  }

  // If we are on the login page, don't show the admin layout shell.
  if (!isAuthenticated && pathname.startsWith('/admin/login')) {
    return <>{children}</>;
  }
  
  // Don't render the layout shell if we're still waiting for the redirect to kick in.
  if (!isAuthenticated) {
    return <AdminLoadingScreen />;
  }

  return (
     <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <AdminNav />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            {children}
        </main>
    </div>
  );
}
