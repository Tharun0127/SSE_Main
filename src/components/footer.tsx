import { Wind } from 'lucide-react';
import Link from 'next/link';

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary">
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Wind className="h-7 w-7 text-primary" />
              <span className="font-bold font-heading text-xl text-secondary-foreground">
                Sri Sai Enterprises
              </span>
            </div>

            <nav className="flex justify-center md:justify-end gap-x-6">
                 {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="text-sm font-medium text-secondary-foreground/80 hover:text-primary transition-colors">
                        {link.label}
                    </Link>
                ))}
            </nav>
        </div>
        <div className="mt-8 pt-8 border-t border-border/40 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Sri Sai Enterprises. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
