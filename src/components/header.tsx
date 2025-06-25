"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wind, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About Us" },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const DesktopNavLink = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      className={cn(
        "font-medium text-sm transition-colors hover:text-primary",
        "text-foreground",
        pathname === href && "text-primary font-semibold"
      )}
    >
      {label}
    </Link>
  );

  const MobileNavLink = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      className={cn(
        "font-medium text-lg text-foreground/70 hover:text-primary",
        pathname === href && "text-primary font-semibold"
      )}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      {label}
    </Link>
  );

  return (
    <header className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-300",
        scrolled ? "border-border bg-background/95 backdrop-blur-lg" : "bg-background/80 backdrop-blur-lg border-transparent"
      )}>
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Wind className="h-7 w-7 text-primary" />
          <span className={cn(
            "font-bold font-heading text-xl transition-colors",
            "text-foreground"
            )}>
            Sri Sai Enterprises
          </span>
        </Link>
        
        <nav className="hidden md:flex gap-x-6 items-center">
          {navLinks.map((link) => (
            <DesktopNavLink key={link.href} {...link} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
           <Button asChild className="hidden sm:flex" size="sm">
              <Link href="/contact">Contact Us</Link>
           </Button>

           <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-foreground">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <div className="flex items-center gap-2 mb-8">
                <Wind className="h-7 w-7 text-primary" />
                <span className="font-bold font-heading text-xl">
                  Sri Sai Enterprises
                </span>
              </div>
              <nav className="flex flex-col gap-y-6">
                {navLinks.map((link) => (
                  <MobileNavLink key={link.href} {...link} />
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
