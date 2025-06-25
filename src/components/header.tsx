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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerClass = cn(
    "sticky top-0 z-50 w-full border-b transition-colors duration-300",
    mounted && scrolled
      ? "border-border bg-card/80 backdrop-blur-sm"
      : "bg-card border-transparent"
  );

  const DesktopNavLink = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      className={cn(
        "font-medium text-sm transition-colors hover:text-primary",
        mounted && pathname === href
          ? "text-primary font-semibold"
          : "text-muted-foreground"
      )}
    >
      {label}
    </Link>
  );

  const MobileNavLink = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      className={cn(
        "font-medium text-lg hover:text-primary",
        pathname === href ? "text-primary font-semibold" : "text-muted-foreground"
      )}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      {label}
    </Link>
  );

  return (
    <header className={headerClass}>
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Wind className="h-7 w-7 text-primary" />
          <span className="font-bold font-heading text-xl text-foreground">
            Sri Sai Enterprises
          </span>
        </Link>
        
        <nav className="hidden md:flex gap-x-6 items-center">
          {navLinks.map((link) => (
            <DesktopNavLink key={link.href} {...link} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
           <Button asChild className="hidden sm:flex" size="sm" variant="secondary">
              <Link href="/contact">Contact Us</Link>
           </Button>

           <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-foreground">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] bg-card">
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
               <Button asChild className="mt-8 w-full" variant="secondary">
                  <Link href="/contact">Contact Us</Link>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
