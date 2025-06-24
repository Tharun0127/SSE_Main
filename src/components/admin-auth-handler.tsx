'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * This component handles clearing the admin authentication session 
 * when the user navigates away from any /admin route.
 * It's a client component that renders nothing.
 */
export function AdminAuthHandler() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname.startsWith('/admin')) {
      sessionStorage.removeItem('isAdminAuthenticated');
    }
  }, [pathname]);

  return null;
}
