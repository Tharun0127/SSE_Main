'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu, BarChart2, Package, Mail, Image as ImageIcon, LogOut } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

const navLinks = [
  { href: '/admin', label: 'Dashboard', icon: BarChart2 },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/enquiries', label: 'Enquiries', icon: Mail },
  { href: '/admin/content', label: 'Content', icon: ImageIcon },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    router.push('/admin/login');
  };

  const getLinkClass = (href: string, baseClass: string) => {
    const isActive = pathname === href || (href !== '/admin' && pathname.startsWith(href));
    return cn(
      baseClass,
      isActive ? 'bg-primary/10 text-primary font-semibold' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
    );
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-6">
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <SheetTitle className="sr-only">Admin Navigation Menu</SheetTitle>
          <nav className="grid gap-6 text-lg font-medium">
            <Link href="#" className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
                 <Image src="/sse+logo.png" width={24} height={24} alt="Logo" className="filter invert" />
                <span className="sr-only">Sri Sai Enterprises</span>
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={getLinkClass(link.href, 'flex items-center gap-4 px-2.5 rounded-lg')}
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </Link>
            ))}
             <button
                onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
          </nav>
        </SheetContent>
      </Sheet>
      
      <div className="hidden sm:flex sm:items-center sm:gap-4">
         <nav className="flex items-center gap-2 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={getLinkClass(link.href, 'px-3 py-2 rounded-lg transition-colors')}
              >
                {link.label}
              </Link>
            ))}
          </nav>
      </div>

      <div className="relative ml-auto flex-1 md:grow-0">
        {/* Can add a search bar here later if needed */}
      </div>
      <Button variant="outline" size="sm" onClick={handleLogout} className="hidden sm:flex">
          <LogOut className="mr-2 h-4 w-4" /> Logout
      </Button>
    </header>
  );
}
