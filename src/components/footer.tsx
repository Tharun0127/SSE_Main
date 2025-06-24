import { Wind, Facebook, Twitter, Instagram } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Wind className="h-7 w-7 text-primary" />
              <span className="font-bold font-heading text-xl text-secondary-foreground">
                Cool Breeze
              </span>
            </div>

            <nav className="flex justify-center gap-x-6">
                 {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="text-sm font-medium text-secondary-foreground/80 hover:text-primary transition-colors">
                        {link.label}
                    </Link>
                ))}
            </nav>
          
            <div className="flex justify-center md:justify-end gap-x-3">
              <Button variant="ghost" size="icon" asChild>
                <Link href="#">
                    <Facebook className="h-5 w-5 text-secondary-foreground/80" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#">
                    <Twitter className="h-5 w-5 text-secondary-foreground/80" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#">
                    <Instagram className="h-5 w-5 text-secondary-foreground/80" />
                </Link>
              </Button>
            </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/40 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Cool Breeze. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
