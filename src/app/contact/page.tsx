import { ContactForm } from '@/components/contact-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function ContactPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary-foreground">Contact Us</h1>
        <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">Have a question or need a quote? We'd love to hear from you.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-6xl mx-auto">
        <Card className="lg:col-span-3 bg-secondary border-border/60">
          <CardHeader>
            <CardTitle className="font-headline text-primary-foreground">Send us a Message</CardTitle>
            <CardDescription>Fill out the form and our team will get back to you shortly.</CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
        <div className="lg:col-span-2 space-y-8">
          <Card className="bg-secondary border-border/60">
            <CardHeader>
              <CardTitle className="font-headline text-primary-foreground">Contact Information</CardTitle>
              <CardDescription>Get in touch with us directly.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 p-2 bg-muted rounded-full">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-base text-primary-foreground">Phone</h3>
                  <a href="tel:+1(555)123-4567" className="text-muted-foreground hover:text-primary transition-colors text-base">+1 (555) 123-4567</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 p-2 bg-muted rounded-full">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-base text-primary-foreground">Email</h3>
                  <a href="mailto:contact@srisaiep.com" className="text-muted-foreground hover:text-primary transition-colors text-base">contact@srisaiep.com</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 p-2 bg-muted rounded-full">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-base text-primary-foreground">Address</h3>
                  <p className="text-muted-foreground text-base">123 Industrial Park, Suite 100<br/>Ventura, CA 93003</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-secondary border-border/60">
            <CardHeader>
              <CardTitle className="font-headline text-primary-foreground">Our Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video relative rounded-lg overflow-hidden">
                <Image
                  src="https://placehold.co/600x400.png"
                  alt="Map to Sri Sai Enterprises"
                  fill
                  className="object-cover"
                  data-ai-hint="Ventura California map"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}