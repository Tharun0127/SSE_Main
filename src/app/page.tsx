
"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClientLogos } from "@/components/client-logos";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const features = [
  {
    title: "Optimal Airflow",
    description: "Our products are engineered to deliver maximum airflow performance, keeping you comfortable.",
    image: "https://placehold.co/450x600.png",
    imageHint: "air vent pattern"
  },
  {
    title: "Energy Efficient",
    description: "With high EER ratings and smart features, our units save you money while protecting the planet.",
    image: "https://placehold.co/450x600.png",
    imageHint: "green leaf power"
  },
  {
    title: "Sleek, Modern Design",
    description: "Our products don't just feel good, they look good. Enhance your space with our stylish designs.",
    image: "https://placehold.co/450x600.png",
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
    <div className="flex flex-col">
      <section className="w-full bg-primary text-primary-foreground">
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
                  className="max-w-xl text-primary-foreground/80 md:text-lg mt-6"
              >
                  Innovative HVAC solutions designed for your lifestyle. Stay cool, calm, and collected all year round.
              </motion.p>}
              {isMounted && <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                  className="mt-8"
              >
                  <Button asChild size="lg" className="font-semibold text-lg bg-white text-primary hover:bg-white/90">
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

      <section id="why-us" className="w-full py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-foreground">Why Choose Sri Sai Enterprises?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We blend cutting-edge technology with sophisticated design to create HVAC products that elevate your comfort and your space.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="bg-card border text-center flex flex-col items-center p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                <div className="relative w-full aspect-[3/4] mb-6 rounded-lg overflow-hidden">
                    <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        data-ai-hint={feature.imageHint}
                    />
                </div>
                <h3 className="text-2xl font-bold font-heading mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground lg:text-base">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="featured-products" className="w-full py-16 md:py-24 bg-secondary">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-foreground">Featured Products</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Discover our top-rated and most popular products, handpicked for their quality and performance.
            </p>
          </div>
          <Tabs defaultValue="All" className="w-full">
            <div className="flex justify-center mb-10">
              <div className="overflow-x-auto pb-2">
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

      <ClientLogos />
    </div>
  );
}
