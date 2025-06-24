"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Factory, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact Us" },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavLink = ({ href, label, className }: { href: string; label: string, className?: string }) => (
    <Link
      href={href}
      className={cn(
        "font-medium transition-colors hover:text-primary",
        pathname === href ? "text-primary" : "text-foreground/80",
        className
      )}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-auto flex items-center space-x-2">
          <Factory className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline sm:inline-block text-lg">
            Sri Sai Enterprises
          </span>
        </Link>
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} className="text-sm" />
          ))}
        </nav>
        <div className="ml-4 md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0 w-[300px]">
              <Link
                href="/"
                className="mr-6 flex items-center space-x-2 mb-8"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Factory className="h-6 w-6 text-primary" />
                <span className="font-bold font-headline sm:inline-block text-lg">
                  Sri Sai Enterprises
                </span>
              </Link>
              <div className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <NavLink key={link.href} {...link} className="text-lg px-2" />
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
