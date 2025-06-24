'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, type ReactNode } from 'react';

/**
 * A simple loading component shown while verifying admin authentication.
 */
function AdminLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40">
      <div className="text-muted-foreground">Verifying access...</div>
    </div>
  );
}

/**
 * This layout protects all routes under /admin.
 * It verifies that the user is authenticated before rendering any admin sub-page.
 * If the user is not authenticated, it redirects them to the /admin login page.
 */
export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  // Start as verified if on the login page itself to prevent a loading flash.
  const [isVerified, setIsVerified] = useState(pathname === '/admin');

  useEffect(() => {
    // No need to check auth for the login page itself within this layout.
    // Its own component logic will handle showing login vs. dashboard.
    if (pathname === '/admin') {
      setIsVerified(true);
      return;
    }

    const isAuthenticated = sessionStorage.getItem('isAdminAuthenticated') === 'true';

    if (!isAuthenticated) {
      // Use replace to avoid adding a redirect to the browser's history.
      router.replace('/admin');
    } else {
      setIsVerified(true);
    }
  }, [pathname, router]);

  if (!isVerified) {
    return <AdminLoading />;
  }

  return <>{children}</>;
}
