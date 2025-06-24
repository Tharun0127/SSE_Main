"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ClientLogos } from "@/components/client-logos";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const slides = [
  {
    title: "Slide 1: Engineered for Excellence",
    description: "Providing top-tier Grills, Diffusers, and Dampers for optimal HVAC performance.",
    image: "https://placehold.co/1920x1080.png",
    imageHint: "modern architecture vents",
    link: "/products",
    linkLabel: "Explore Products"
  },
  {
    title: "Slide 2: Decades of Dedication",
    description: "For over 20 years, we have been a leading manufacturer of high-quality HVAC components, delivering innovative and reliable solutions.",
    image: "https://placehold.co/1920x1080.png",
    imageHint: "HVAC factory",
    link: "/#about-us",
    linkLabel: "About Us"
  },
  {
    title: "Slide 3: Innovative Solutions",
    description: "From large commercial buildings to custom residential homes, our products are designed to meet the most demanding specifications.",
    image: "https://placehold.co/1920x1080.png",
    imageHint: "building blueprint HVAC",
    link: "/contact",
    linkLabel: "Contact Us"
  }
];

export default function Home() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <div className="flex flex-col">
      <section className="w-full relative bg-background">
        <Carousel
          plugins={[plugin.current]}
          className="w-full group"
          opts={{
              loop: true,
          }}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="-ml-0">
            {slides.map((slide, index) => (
              <CarouselItem key={index} className="pl-0">
                <div className="h-[70vh] w-full relative">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    data-ai-hint={slide.imageHint}
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
                    <div className="container">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline text-white drop-shadow-lg">
                            {slide.title}
                        </h1>
                        <p className="max-w-[700px] mx-auto text-neutral-200 md:text-xl mt-4 drop-shadow-md">
                            {slide.description}
                        </p>
                        <Button asChild size="lg" className="mt-8 font-semibold">
                          <Link href={slide.link}>
                            {slide.linkLabel}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/20 text-white opacity-0 transition-opacity hover:bg-white/40 group-hover:opacity-100" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/20 text-white opacity-0 transition-opacity hover:bg-white/40 group-hover:opacity-100" />
        </Carousel>
      </section>

      <section id="about-us" className="w-full py-12 md:py-16 lg:py-20 bg-card">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-semibold">About Us</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Decades of Dedication to Quality</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  At Sri Sai Enterprises, we are committed to engineering excellence. For over 20 years, we have been a leading manufacturer of high-quality HVAC components, delivering innovative and reliable solutions for commercial and residential projects worldwide. Our mission is to enhance air management through superior design, performance, and customer service.
                </p>
              </div>
            </div>
            <Image
              alt="Factory"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
              height="400"
              src="https://placehold.co/600x400.png"
              data-ai-hint="HVAC factory"
              width="600"
            />
          </div>
        </div>
      </section>

      <ClientLogos />
    </div>
  );
}
