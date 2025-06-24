import { Factory, Facebook, Twitter, Instagram } from 'lucide-react';
import Link from 'next/link';

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact Us" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary">
      <div className="container py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Factory className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl font-headline text-primary-foreground">Sri Sai Enterprises</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs">
              Providing top-tier Grills, Diffusers, and Dampers for optimal HVAC performance for over 20 years.
            </p>
          </div>
          <div className="md:justify-self-center">
            <h3 className="font-semibold text-primary-foreground mb-4 font-headline">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:justify-self-end">
            <h3 className="font-semibold text-primary-foreground mb-4 font-headline">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border/40 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Sri Sai Enterprises. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}