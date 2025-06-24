import React from 'react';
import Image from 'next/image';
import { Briefcase, Users } from 'lucide-react';

const LOGOS = [
  { name: "LG", hint: "LG logo" },
  { name: "Daikin", hint: "Daikin logo" },
  { name: "Blue Star", hint: "Blue Star logo" },
  { name: "Voltas", hint: "Voltas logo" },
  { name: "Hitachi", hint: "Hitachi logo" },
  { name: "Carrier", hint: "Carrier logo" },
  { name: "Trane", hint: "Trane logo" },
  { name: "Samsung", hint: "Samsung logo" },
  { name: "Panasonic", hint: "Panasonic logo" },
  { name: "Mitsubishi Electric", hint: "Mitsubishi Electric logo" },
];

export function ClientLogos() {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-primary-foreground">Trusted by Industry Leaders</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We are proud to partner with leading HVAC dealers and brands to deliver exceptional quality and service.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16 max-w-3xl mx-auto">
            <div className="flex flex-col items-center justify-center p-8 bg-secondary rounded-lg shadow-lg">
                <Briefcase className="h-12 w-12 text-primary mb-4" />
                <p className="text-5xl font-bold font-headline">20+</p>
                <p className="text-lg text-muted-foreground">Years of Experience</p>
            </div>
            <div className="flex flex-col items-center justify-center p-8 bg-secondary rounded-lg shadow-lg">
                <Users className="h-12 w-12 text-primary mb-4" />
                <p className="text-5xl font-bold font-headline">100+</p>
                <p className="text-lg text-muted-foreground">HVAC Dealers</p>
            </div>
        </div>

        <div
          className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
        >
          <ul className="flex items-center justify-center md:justify-start animate-infinite-scroll">
            {LOGOS.concat(LOGOS).map((logo, index) => (
              <li key={index} className="mx-8 flex-shrink-0">
                <div className="bg-primary/90 p-1 rounded-lg shadow-md flex items-center justify-center h-24 w-48 transition-transform duration-300 hover:scale-105">
                   <div className="bg-white w-full h-full rounded-md flex items-center justify-center p-2">
                     <Image
                       src={`https://placehold.co/120x40.png?text=${logo.name.replace(/\s/g, '+')}`}
                       width={120}
                       height={40}
                       alt={`${logo.name} logo`}
                       data-ai-hint={`${logo.name.toLowerCase()} logo`}
                       className="object-contain"
                       style={{ filter: 'grayscale(100%)', mixBlendMode: 'multiply' }}
                     />
                   </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}