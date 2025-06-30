
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { type ProductEnquiry } from "@/app/enquiries/page";

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
  const [logoUrl, setLogoUrl] = useState("/sse+logo.png"); // Default logo
  const [enquiryCount, setEnquiryCount] = useState(0);

  const updateEnquiryCount = () => {
    const enquiries: ProductEnquiry[] = JSON.parse(localStorage.getItem('product-enquiries') || '[]');
    setEnquiryCount(enquiries.length);
  };

  useEffect(() => {
    // This effect runs only on the client, after the component has mounted.
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    const fetchLogo = async () => {
      try {
        const docRef = doc(db, 'settings', 'main');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().logoUrl) {
          setLogoUrl(docSnap.data().logoUrl);
        }
      } catch (error) {
        console.error("Failed to fetch logo, using default.", error);
      }
    };

    fetchLogo();
    updateEnquiryCount();

    window.addEventListener('storage', updateEnquiryCount);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('storage', updateEnquiryCount);
    }
  }, []);

  if (pathname.startsWith('/admin')) {
    return null;
  }

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
          <Image
            src={logoUrl}
            alt="Sri Sai Enterprises Logo"
            width={40}
            height={40}
            priority
          />
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
          <Button asChild variant="ghost" size="sm" className="hidden sm:flex relative">
              <Link href="/enquiries">
                <ShoppingBag className="mr-2" />
                Enquiries
                {mounted && enquiryCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                    {enquiryCount}
                  </span>
                )}
              </Link>
            </Button>
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
              <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
              <div className="flex items-center gap-2 mb-8">
                 <Image
                    src={logoUrl}
                    alt="Sri Sai Enterprises Logo"
                    width={40}
                    height={40}
                  />
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
                <Link
                  href="/enquiries"
                  className={cn(
                    "font-medium text-lg hover:text-primary flex items-center",
                    getMobileLinkClass("/enquiries")
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ShoppingBag className="mr-2" />
                  My Enquiries
                    {mounted && enquiryCount > 0 && (
                    <span className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                      {enquiryCount}
                    </span>
                  )}
                </Link>
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
