'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { usePathname } from 'next/navigation';
import { Mail, Phone, MapPin } from 'lucide-react';

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

interface ContactInfo {
  email: string;
  phone1: string;
  phone2: string;
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [logoUrl, setLogoUrl] = useState("/sse+logo.png");
  const pathname = usePathname();
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: 'trk0653705@gmail.com',
    phone1: '+91 98497 26724',
    phone2: '+91 97048 68999',
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, 'settings', 'content');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
           const data = docSnap.data();
           if (data.logoUrl) setLogoUrl(data.logoUrl);
           setContactInfo({
             email: data.contactEmail || 'trk0653705@gmail.com',
             phone1: data.contactPhone1 || '+91 98497 26724',
             phone2: data.contactPhone2 || '+91 97048 68999',
           });
        }
      } catch (error) {
        console.error("Failed to fetch footer content, using defaults.", error);
      }
    };

    fetchContent();
  }, []);

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-primary text-primary-foreground border-t-4 border-primary/50">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-8">
            {/* Column 1: Brand Info */}
            <div className="md:col-span-2 lg:col-span-1">
               <Link href="/" className="flex items-center gap-3 mb-4">
                 <div className="bg-primary-foreground p-1 rounded-md">
                     <Image
                        src={logoUrl}
                        alt="Sri Sai Enterprises Logo"
                        width={32}
                        height={32}
                      />
                 </div>
                 <span className="font-bold font-heading text-xl text-primary-foreground">
                    Sri Sai Enterprises
                 </span>
               </Link>
              <p className="text-sm text-primary-foreground/70 max-w-sm">
                Engineered Airflow, Trusted Ventilation Partner. Delivering high-performance air distribution solutions since 2003.
              </p>
            </div>
            
            {/* Column 2: Quick Links */}
            <div>
              <h3 className="font-semibold tracking-wider uppercase text-primary-foreground/80 mb-4">Quick Links</h3>
              <nav className="flex flex-col gap-2">
                 {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="text-sm text-primary-foreground/80 hover:text-primary-foreground hover:underline underline-offset-4 transition-all w-fit">
                        {link.label}
                    </Link>
                ))}
              </nav>
            </div>

            {/* Column 3: Contact Info */}
            <div>
               <h3 className="font-semibold tracking-wider uppercase text-primary-foreground/80 mb-4">Contact Us</h3>
               <div className="flex flex-col gap-3 text-sm text-primary-foreground/80">
                 <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-3 hover:text-primary-foreground transition-colors w-fit">
                    <Mail className="h-4 w-4 flex-shrink-0" />
                    <span>{contactInfo.email}</span>
                 </a>
                 <a href={`tel:${contactInfo.phone1}`} className="flex items-center gap-3 hover:text-primary-foreground transition-colors w-fit">
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    <span>{contactInfo.phone1}</span>
                 </a>
                 <a href={`tel:${contactInfo.phone2}`} className="flex items-center gap-3 hover:text-primary-foreground transition-colors w-fit">
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    <span>{contactInfo.phone2}</span>
                 </a>
                 <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span>Plot NO: 119, C.I.E, Gandhi Nagar,<br/>Balanagar, Hyderabad - 500 037</span>
                 </div>
               </div>
            </div>
        </div>
        <div className="mt-12 pt-8 border-t border-primary-foreground/20 text-center">
          <p className="text-sm text-primary-foreground/70">
            © {currentYear} Sri Sai Enterprises. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
