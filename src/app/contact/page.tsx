import { ContactForm } from '@/components/contact-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Contact Us</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">We'd love to hear from you. Reach out with any questions or inquiries.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline">Send us a Message</CardTitle>
            <CardDescription>Fill out the form and we'll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Contact Information</CardTitle>
              <CardDescription>Get in touch with us directly.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-lg">
               <div className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-base">Phone</h3>
                  <a href="tel:+1(555)123-4567" className="text-muted-foreground hover:text-primary transition-colors text-base">+1 (555) 123-4567</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-base">Email</h3>
                  <a href="mailto:sales@coolbreeze.com" className="text-muted-foreground hover:text-primary transition-colors text-base">sales@coolbreeze.com</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-base">Address</h3>
                  <p className="text-muted-foreground text-base">123 Cool Air Ave, Suite 100<br/>Ventura, CA 93003</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
