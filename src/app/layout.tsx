import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from "@/components/ui/toaster";
import { Poppins, PT_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { WhatsAppWidget } from '@/components/whatsapp-widget';
import { AdminAuthHandler } from '@/components/admin-auth-handler';

export const metadata: Metadata = {
  title: 'Sri Sai Enterprises',
  description: 'High-quality HVAC solutions for all your needs.',
};

const fontHeading = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-heading',
});

const fontSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-sans',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn("font-sans antialiased", fontSans.variable, fontHeading.variable)}>
        <AdminAuthHandler />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <Toaster />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
