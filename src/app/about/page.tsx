
'use client';

import Image from 'next/image';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Target, Users, BarChart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const initialTeamMembers = [
  {
    name: 'John Carter',
    role: 'CEO & Founder',
    image: 'https://placehold.co/400x400.png',
    hint: 'professional portrait man',
    firestoreField: 'teamMemberImage1',
  },
  {
    name: 'Sophie Chen',
    role: 'Head of Engineering',
    image: 'https://placehold.co/400x400.png',
    hint: 'professional portrait woman',
    firestoreField: 'teamMemberImage2',
  },
];

export default function AboutPage() {
  const [bannerImageUrl, setBannerImageUrl] = useState('https://placehold.co/1920x600.png');
  const [storyImageUrl, setStoryImageUrl] = useState('https://placehold.co/600x600.png');
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, 'settings', 'content');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setBannerImageUrl(data.aboutBannerImageUrl || 'https://placehold.co/1920x600.png');
          setStoryImageUrl(data.aboutStoryImageUrl || 'https://placehold.co/600x600.png');
          setTeamMembers(prevMembers => prevMembers.map(member => ({
            ...member,
            image: data[member.firestoreField] || member.image,
          })));
        }
      } catch (error) {
        console.error("Error fetching about page content:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  return (
    <div className="bg-background">
      <section className="relative h-[450px] flex items-center justify-center text-center text-primary-foreground">
        <Image
          src={bannerImageUrl}
          alt="Our Team"
          fill
          className="object-cover"
          data-ai-hint="modern office building"
          priority
        />
        <div className="absolute inset-0 bg-foreground/80" />
        <div className="relative z-10 p-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-extrabold font-heading tracking-tight text-primary-foreground">About Sri Sai Enterprises</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/90">
            Pioneering excellence in HVAC solutions since 2003.
          </p>
        </div>
      </section>

      <section className="container py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl font-extrabold font-heading mb-4">Our Story</h2>
             <div className="space-y-4 text-muted-foreground">
                <p className="text-lg">
                    Sri Sai Enterprises was established in 2003, with our sister concern Sri Sai Air System following in 2006. Since our inception, we have become a leading manufacturer of air distribution products, providing innovative ventilation solutions for residential, non-residential, industrial, and infrastructure applications.
                </p>
                <p>
                    We have deep expertise in crafting solutions for a diverse range of sectors, including Pharmaceutical, IT, Biotech, Hospitals, Life Sciences, Function Halls, Hotels, and Commercial Buildings. Our customers value our ability to deliver complex, made-to-specification products with short lead times, recognizing that any delay can be costly for complex construction projects.
                </p>
                <p>
                   The Sri Sai group goes to market with one of the strongest and most widely recognized brand portfolios in the air distribution industry. Our brands have a long and respected history, known for quality and reliability.
                </p>
            </div>
          </div>
          <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
             <Image
                src={storyImageUrl}
                alt="Sri Sai Enterprises Factory"
                fill
                className="object-cover"
                data-ai-hint="HVAC manufacturing factory"
              />
          </div>
        </div>
      </section>
      
      <section className="bg-secondary py-16 md:py-24">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold font-heading">Our Core Values</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              The principles that guide our work and define our company culture.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 bg-card border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-105">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Target className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold font-heading mb-2">Quality First</h3>
              <p className="text-muted-foreground">We never compromise on quality. Our products are built to last, using only the best materials and manufacturing processes.</p>
            </Card>
            <Card className="text-center p-8 bg-card border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-105">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold font-heading mb-2">Customer Focus</h3>
              <p className="text-muted-foreground">Our customers are at the heart of everything we do. We strive to exceed expectations with every interaction.</p>
            </Card>
            <Card className="text-center p-8 bg-card border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-105">
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
          <h2 className="text-3xl font-extrabold font-heading">Meet Our Leadership</h2>
           <p className="mt-4 text-lg text-muted-foreground">
              The passionate individuals driving our company forward.
            </p>
        </div>
        <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {teamMembers.map((member) => (
                <Card key={member.name} className="text-center overflow-hidden group transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
                <div className="aspect-square relative">
                    <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    data-ai-hint={member.hint}
                    />
                </div>
                <CardContent className="p-6 bg-card">
                    <CardTitle className="text-xl font-heading">{member.name}</CardTitle>
                    <p className="text-primary">{member.role}</p>
                </CardContent>
                </Card>
            ))}
            </div>
        </div>
      </section>
    </div>
  );
}
