import React from 'react';
import { Briefcase, Users } from 'lucide-react';

const LOGOS = ["LG", "Daikin", "Blue Star", "Voltas", "Hitachi", "Carrier", "Trane"];

export function ClientLogos() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Trusted by Industry Leaders</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We are proud to partner with leading HVAC dealers and brands to deliver exceptional quality and service.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16 text-center max-w-2xl mx-auto">
            <div className="flex flex-col items-center justify-center p-6 bg-card rounded-lg shadow-sm">
                <Briefcase className="h-10 w-10 text-primary mb-4" />
                <p className="text-4xl font-bold font-headline">20+</p>
                <p className="text-lg text-muted-foreground">Years of Experience</p>
            </div>
            <div className="flex flex-col items-center justify-center p-6 bg-card rounded-lg shadow-sm">
                <Users className="h-10 w-10 text-primary mb-4" />
                <p className="text-4xl font-bold font-headline">100+</p>
                <p className="text-lg text-muted-foreground">HVAC Dealers</p>
            </div>
        </div>

        <div
          className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
        >
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 animate-infinite-scroll">
            {LOGOS.map((logo, index) => (
              <li key={index} className="text-2xl font-semibold text-muted-foreground whitespace-nowrap">
                {logo}
              </li>
            ))}
          </ul>
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 animate-infinite-scroll" aria-hidden="true">
             {LOGOS.map((logo, index) => (
              <li key={index} className="text-2xl font-semibold text-muted-foreground whitespace-nowrap">
                {logo}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
