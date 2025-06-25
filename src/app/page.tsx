
"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

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

const features = [
  {
    title: "Optimal Airflow",
    description: "Our products are engineered to deliver maximum airflow performance, keeping you comfortable.",
    image: "https://placehold.co/600x450.png",
    imageHint: "air vent pattern"
  },
  {
    title: "Energy Efficient",
    description: "With high EER ratings and smart features, our units save you money while protecting the planet.",
    image: "https://placehold.co/600x450.png",
    imageHint: "green leaf power"
  },
  {
    title: "Sleek, Modern Design",
    description: "Our products don't just feel good, they look good. Enhance your space with our stylish designs.",
    image: "https://placehold.co/600x450.png",
    imageHint: "modern interior design"
  },
];

export default function Home() {
  const [isMounted, setIsMounted] = React.useState(false);
  
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const categories = ['All', 'Grills', 'Diffusers', 'Dampers', 'Others'];
  const featuredProducts = products.filter(p => p.featured);

  return (
    <div className="flex flex-col bg-background">
      <section className="w-full bg-background text-foreground">
        <div className="container grid md:grid-cols-2 gap-12 items-center py-20 md:py-32">
          <div className="flex flex-col items-start text-left">
              {isMounted && <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight"
              >
                  Experience Pure Comfort
              </motion.h1>}
              {isMounted && <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="max-w-xl text-muted-foreground md:text-lg mt-6"
              >
                  Innovative HVAC solutions designed for your lifestyle. Stay cool, calm, and collected all year round.
              </motion.p>}
              {isMounted && <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                  className="mt-8"
              >
                  <Button asChild size="lg" className="font-semibold text-lg">
                      <Link href="/products">
                          Explore Products
                          <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                  </Button>
              </motion.div>}
          </div>
          <div className="flex justify-center">
            {isMounted && <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative w-full max-w-md aspect-[4/3]"
            >
                <Image
                    src="https://placehold.co/600x450.png"
                    alt="Modern Air Cooling Unit"
                    fill
                    className="object-cover rounded-2xl shadow-2xl"
                    data-ai-hint="modern air conditioner"
                    priority
                />
            </motion.div>}
          </div>
        </div>
      </section>

      <section className="w-full py-16 bg-secondary">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
              Trusted by industry leading companies
            </p>
          </div>
          <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_10%,_black_90%,transparent_100%)]">
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
        
          <div className="pt-16">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-foreground">Featured Products</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Discover our top-rated and most popular products, handpicked for their quality and performance.
              </p>
            </div>
            <Tabs defaultValue="All" className="w-full">
              <div className="flex justify-center mb-10">
                <div className="overflow-x-auto pb-2 no-scrollbar">
                    <TabsList className="inline-flex">
                      {categories.map((category) => (
                        <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
                      ))}
                    </TabsList>
                </div>
              </div>

              <TabsContent value="All">
                <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredProducts.slice(0, 3).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                <div className="md:hidden">
                  <Carousel opts={{ align: "start" }} className="w-full">
                    <CarouselContent className="-ml-4">
                      {featuredProducts.slice(0, 3).map((product) => (
                        <CarouselItem key={product.id} className="pl-4 basis-4/5 sm:basis-2/3">
                            <ProductCard product={product} />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <div className="flex justify-center mt-6">
                      <CarouselPrevious className="static -translate-x-1" />
                      <CarouselNext className="static translate-x-1" />
                    </div>
                  </Carousel>
                </div>
                <div className="text-center mt-12">
                  <Button asChild size="lg" variant="outline">
                    <Link href="/products">View All Products <ArrowRight className="ml-2"/></Link>
                  </Button>
                </div>
              </TabsContent>

              {categories.filter(c => c !== 'All').map((category) => (
                <TabsContent key={category} value={category}>
                  <p className="text-center text-muted-foreground mb-8">Showing our top products for {category}.</p>
                  <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.filter(p => p.category === category).slice(0, 3).map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                  <div className="md:hidden">
                    <Carousel opts={{ align: "start" }} className="w-full">
                      <CarouselContent className="-ml-4">
                        {products.filter(p => p.category === category).slice(0, 3).map((product) => (
                          <CarouselItem key={product.id} className="pl-4 basis-4/5 sm:basis-2/3">
                              <ProductCard product={product} />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <div className="flex justify-center mt-6">
                        <CarouselPrevious className="static -translate-x-1" />
                        <CarouselNext className="static translate-x-1" />
                      </div>
                    </Carousel>
                  </div>
                  <div className="text-center mt-12">
                    <Button asChild size="lg" variant="outline">
                      <Link href={`/products?category=${category}`}>View All {category} <ArrowRight className="ml-2"/></Link>
                    </Button>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>
      
      <section id="why-us" className="w-full py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-foreground">Why Choose Sri Sai Enterprises?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We blend cutting-edge technology with sophisticated design to create HVAC products that elevate your comfort and your space.
            </p>
          </div>

          <div className="md:hidden">
            <div className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory space-x-4 pb-4 no-scrollbar -mx-4 px-4">
              {features.map((feature, index) => (
                <div key={feature.title} className="snap-start flex-shrink-0 basis-4/5 sm:basis-2/3">
                    <div
                      className={cn(
                        "flex flex-col h-full p-6 rounded-2xl shadow-lg text-center",
                        ["bg-primary/5", "bg-secondary", "bg-primary/5"][index % 3]
                      )}
                    >
                      <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden">
                        <Image
                          src={feature.image}
                          alt={feature.title}
                          fill
                          className="object-cover"
                          data-ai-hint={feature.imageHint}
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold font-heading mb-2 text-foreground">{feature.title}</h3>
                        <p className="text-muted-foreground text-sm">{feature.description}</p>
                      </div>
                    </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={cn(
                  "flex rounded-2xl shadow-lg p-6 space-y-6 text-center",
                  index % 2 === 1 ? "flex-col-reverse space-y-reverse" : "flex-col",
                  ["bg-primary/5", "bg-secondary", "bg-primary/5"][index % 3]
                )}
              >
                <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover"
                    data-ai-hint={feature.imageHint}
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-heading mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section className="w-full py-16 md:py-24 bg-foreground">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-card p-8 rounded-2xl text-center flex flex-col justify-center items-center shadow-lg">
              <h3 className="text-5xl md:text-6xl font-extrabold text-primary font-heading">20+</h3>
              <p className="mt-2 text-card-foreground/80">Years of Experience</p>
            </div>
            <div className="bg-card p-8 rounded-2xl text-center flex flex-col justify-center items-center shadow-lg">
              <h3 className="text-5xl md:text-6xl font-extrabold text-primary font-heading">100+</h3>
              <p className="mt-2 text-card-foreground/80">HVAC Dealers</p>
            </div>
          </div>
        </div>
      </section>

      <section id="consult-us" className="w-full py-16 md:py-24 bg-background">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center bg-card p-8 md:p-12 rounded-2xl shadow-lg border">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-foreground">Have a Project in Mind?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Whether you're an architect, builder, or homeowner, our team is ready to provide expert consultation and tailor-made HVAC solutions for your specific needs.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/contact">
                  Consult Us Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
