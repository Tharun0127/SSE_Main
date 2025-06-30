'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [logoUrl, setLogoUrl] = useState("/sse+logo.png");
  const pathname = usePathname();

  useEffect(() => {
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
  }, []);

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-start gap-2">
               <Link href="/" className="flex items-center gap-2 mb-2">
                 <Image
                    src={logoUrl}
                    alt="Sri Sai Enterprises Logo"
                    width={40}
                    height={40}
                    className="filter invert"
                  />
                 <span className="font-bold font-heading text-xl text-primary-foreground">
                    Sri Sai Enterprises
                 </span>
               </Link>
              <p className="text-sm text-primary-foreground/70">High-quality HVAC solutions for all your needs.</p>
            </div>
            <div className="lg:col-start-3">
              <h3 className="font-semibold text-primary-foreground mb-4">Quick Links</h3>
              <nav className="flex flex-col gap-2">
                 {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors w-fit">
                        {link.label}
                    </Link>
                ))}
              </nav>
            </div>
            <div>
               <h3 className="font-semibold text-primary-foreground mb-4">Contact</h3>
               <div className="flex flex-col gap-2 text-sm text-primary-foreground/80">
                 <a href="mailto:support@srisaiep.com" className="hover:text-primary-foreground transition-colors w-fit">support@srisaiep.com</a>
                 <a href="tel:+1(800)555-0199" className="hover:text-primary-foreground transition-colors w-fit">+1 (800) 555-0199</a>
                 <p>123 HVAC Way, Suite 100<br/>San Francisco, CA 94105</p>
               </div>
            </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center">
          <p className="text-sm text-primary-foreground/70">
            © {currentYear} Sri Sai Enterprises. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
