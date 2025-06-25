import Image from 'next/image';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Target, Users, BarChart } from 'lucide-react';

const teamMembers = [
  {
    name: 'John Carter',
    role: 'CEO & Founder',
    image: 'https://placehold.co/400x400.png',
    hint: 'professional portrait man',
  },
  {
    name: 'Sophie Chen',
    role: 'Head of Engineering',
    image: 'https://placehold.co/400x400.png',
    hint: 'professional portrait woman',
  },
  {
    name: 'Michael Rodriguez',
    role: 'Lead Designer',
    image: 'https://placehold.co/400x400.png',
    hint: 'professional portrait designer',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-background">
      <section className="relative h-[400px] flex items-center justify-center text-center text-white">
        <Image
          src="https://placehold.co/1920x600.png"
          alt="Our Team"
          fill
          className="object-cover"
          data-ai-hint="modern office building"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 p-4">
          <h1 className="text-4xl md:text-5xl font-extrabold font-heading tracking-tight">About Sri Sai Enterprises</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Pioneering excellence in HVAC solutions since 2004.
          </p>
        </div>
      </section>

      <section className="container py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-extrabold font-heading text-foreground mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              Founded with a vision to revolutionize the HVAC industry, Sri Sai Enterprises has grown from a small workshop into a leading manufacturer of high-quality grilles, diffusers, and dampers. Our journey is one of innovation, commitment to quality, and a relentless pursuit of customer satisfaction.
            </p>
            <p className="text-muted-foreground">
              We believe that the air you breathe should be managed with precision and reliability. That's why every product we create is engineered to the highest standards, ensuring optimal performance and durability.
            </p>
          </div>
          <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
             <Image
                src="https://placehold.co/600x600.png"
                alt="Sri Sai Enterprises Factory"
                fill
                className="object-cover"
                data-ai-hint="HVAC manufacturing factory"
              />
          </div>
        </div>
      </section>
      
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold font-heading text-foreground">Our Core Values</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              The principles that guide our work and define our company culture.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 bg-card border transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Target className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold font-heading mb-2">Quality First</h3>
              <p className="text-muted-foreground">We never compromise on quality. Our products are built to last, using only the best materials and manufacturing processes.</p>
            </Card>
            <Card className="text-center p-8 bg-card border transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold font-heading mb-2">Customer Focus</h3>
              <p className="text-muted-foreground">Our customers are at the heart of everything we do. We strive to exceed expectations with every interaction.</p>
            </Card>
            <Card className="text-center p-8 bg-card border transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <BarChart className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold font-heading mb-2">Continuous Innovation</h3>
              <p className="text-muted-foreground">We are constantly exploring new technologies and designs to improve our products and lead the industry forward.</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold font-heading text-foreground">Meet Our Leadership</h2>
           <p className="mt-4 text-lg text-muted-foreground">
              The passionate individuals driving our company forward.
            </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.name} className="text-center overflow-hidden group">
              <div className="aspect-square relative">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint={member.hint}
                />
              </div>
              <CardContent className="p-6">
                <CardTitle className="text-xl font-heading">{member.name}</CardTitle>
                <p className="text-primary">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
