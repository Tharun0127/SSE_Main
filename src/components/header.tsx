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
    // This effect runs only on the client, after the component has mounted.
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    // Run on mount to check initial scroll position
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // On the server and for the initial client render, `mounted` is false,
  // so the header will have a consistent, default appearance.
  // The `scrolled` styles are only applied after mounting on the client.
  const headerClass = cn(
    "sticky top-0 z-50 w-full border-b transition-colors duration-300",
    mounted && scrolled
      ? "border-border bg-card/80 backdrop-blur-sm"
      : "bg-background border-transparent"
  );
  
  const getDesktopLinkClass = (href: string) => {
    // Only apply active styles after mounting to avoid mismatch
    if (!mounted) return "text-muted-foreground";
    return pathname === href
      ? "text-foreground font-semibold"
      : "text-muted-foreground";
  };
  
  const getMobileLinkClass = (href: string) => {
    if (!mounted) return "text-muted-foreground";
    return pathname === href 
      ? "text-primary font-semibold" 
      : "text-muted-foreground";
  }


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
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-medium text-sm transition-colors hover:text-primary",
                getDesktopLinkClass(link.href)
              )}
            >
              {link.label}
            </Link>
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
            <SheetContent side="left" className="w-[300px] bg-card">
              <div className="flex items-center gap-2 mb-8">
                <Wind className="h-7 w-7 text-primary" />
                <span className="font-bold font-heading text-xl">
                  Sri Sai Enterprises
                </span>
              </div>
              <nav className="flex flex-col gap-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "font-medium text-lg hover:text-primary",
                      getMobileLinkClass(link.href)
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
               <Button asChild className="mt-8 w-full">
                  <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
