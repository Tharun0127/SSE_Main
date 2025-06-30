import { ContactForm } from '@/components/contact-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ContactPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold font-heading text-foreground">Contact Us</h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">Have a question or need support? We'd love to hear from you.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 xl:gap-12 max-w-6xl mx-auto">
        <Card className="lg:col-span-3 bg-card border transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
          <CardHeader>
            <CardTitle className="font-heading text-2xl">Send us a Message</CardTitle>
            <CardDescription>Fill out the form and our team will get back to you shortly.</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<Skeleton className="h-[450px] w-full" />}>
              <ContactForm />
            </Suspense>
          </CardContent>
        </Card>
        <div className="lg:col-span-2 space-y-8">
          <Card className="bg-card border transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
            <CardHeader>
              <CardTitle className="font-heading text-2xl">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 p-3 bg-primary/10 rounded-lg">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Phone</h3>
                  <a href="tel:+919849726724" className="text-muted-foreground hover:text-primary transition-colors block">+91 98497 26724</a>
                  <a href="tel:+919704868999" className="text-muted-foreground hover:text-primary transition-colors block">+91 97048 68999</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 p-3 bg-primary/10 rounded-lg">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <a href="mailto:trk0653705@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">trk0653705@gmail.com</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 p-3 bg-primary/10 rounded-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Address</h3>
                  <p className="text-muted-foreground">Plot NO: 119, C.I.E, Gandhi Nagar,<br/>Balanagar, Hyderabad - 500 037</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="aspect-video relative rounded-lg overflow-hidden border shadow-sm">
                <Image
                  src="https://placehold.co/600x400.png"
                  alt="Map to Sri Sai Enterprises HQ"
                  fill
                  className="object-cover"
                  data-ai-hint="Hyderabad map"
                />
          </div>
        </div>
      </div>
    </div>
  );
}
