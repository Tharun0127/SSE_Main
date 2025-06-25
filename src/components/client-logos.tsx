import React from 'react';
import Image from 'next/image';

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
    <section className="w-full py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
            Trusted by industry leading companies
          </p>
        </div>
        
        <div
          className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_10%,_black_90%,transparent_100%)]"
        >
          <ul className="flex items-center justify-center animate-infinite-scroll">
            {LOGOS.concat(LOGOS).map((logo, index) => (
              <li key={index} className="mx-8 flex-shrink-0">
                <Image
                  src={`https://placehold.co/120x40.png?text=${logo.name.replace(/\s/g, '+')}`}
                  width={120}
                  height={40}
                  alt={`${logo.name} logo`}
                  data-ai-hint={`${logo.name.toLowerCase()} logo`}
                  className="object-contain"
                  style={{ filter: 'grayscale(100%)', opacity: 0.6 }}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
