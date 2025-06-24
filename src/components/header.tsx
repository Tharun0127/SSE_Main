"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wind, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavLink = ({ href, label, className }: { href: string; label: string, className?: string }) => (
    <Link
      href={href}
      className={cn(
        "font-medium text-lg md:text-sm transition-colors text-foreground/70 hover:text-primary",
        pathname === href && "text-primary",
        className
      )}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/90 backdrop-blur-lg">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Wind className="h-7 w-7 text-primary" />
          <span className="font-bold font-heading text-xl">
            Cool Breeze
          </span>
        </Link>
        
        <nav className="hidden md:flex gap-x-6 items-center">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
           <Button asChild className="hidden sm:flex" size="sm">
              <Link href="/contact">Contact Us</Link>
           </Button>

           <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <div className="flex items-center gap-2 mb-8">
                <Wind className="h-7 w-7 text-primary" />
                <span className="font-bold font-heading text-xl">
                  Cool Breeze
                </span>
              </div>
              <nav className="flex flex-col gap-y-6">
                {navLinks.map((link) => (
                  <NavLink key={link.href} {...link} />
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
