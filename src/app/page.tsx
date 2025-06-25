"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";

import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Thermometer, Leaf } from "lucide-react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    icon: Thermometer,
    title: "Optimal Airflow",
    description: "Our products are engineered to deliver maximum airflow performance, keeping you comfortable in any environment.",
  },
  {
    icon: Zap,
    title: "Energy Efficient",
    description: "With high EER ratings and smart features, our units save you money while protecting the planet.",
  },
  {
    icon: Leaf,
    title: "Sleek, Modern Design",
    description: "Our products don't just feel good, they look good. Enhance your space with our stylish designs.",
  },
];

export default function Home() {
  const [isMounted, setIsMounted] = React.useState(false);
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const categories = ['All', 'Grills', 'Diffusers', 'Dampers', 'Others'];
  const featuredProducts = products.filter(p => p.featured);

  return (
    <div className="flex flex-col">
      <section className="w-full bg-foreground text-background">
        <div className="container grid md:grid-cols-2 gap-12 items-center py-24 md:py-40">
          <div className="flex flex-col items-start text-left">
              {isMounted && <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight text-white"
              >
                  Experience Pure Comfort
              </motion.h1>}
              {isMounted && <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="max-w-xl text-white/90 md:text-lg mt-6"
              >
                  Innovative HVAC solutions designed for your lifestyle. Stay cool, calm, and collected all year round.
              </motion.p>}
              {isMounted && <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                  className="mt-8"
              >
                  <Button asChild size="lg" variant="secondary" className="font-semibold text-lg">
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

      <section id="why-us" className="w-full py-12 md:py-20 bg-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-foreground">Why Choose Sri Sai Enterprises?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We blend cutting-edge technology with sophisticated design to create HVAC products that elevate your comfort and your space.
            </p>
          </div>
          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 bg-card rounded-lg border transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold font-heading mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
          {/* Mobile Carousel */}
           <div className="md:hidden">
            <Carousel
              plugins={[plugin.current]}
              className="w-full max-w-xs mx-auto"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselContent>
                {features.map((feature, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                       <Card className="text-center p-6 bg-card rounded-lg border h-full">
                          <div className="flex justify-center mb-4">
                            <div className="p-3 bg-primary/10 rounded-full">
                              <feature.icon className="h-7 w-7 text-primary" />
                            </div>
                          </div>
                          <h3 className="text-xl font-bold font-heading mb-2">{feature.title}</h3>
                          <p className="text-muted-foreground">{feature.description}</p>
                        </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </section>

      <section id="featured-products" className="w-full py-12 md:py-20 bg-muted/50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-foreground">Featured Products</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Discover our top-rated and most popular products, handpicked for their quality and performance.
            </p>
          </div>
          <Tabs defaultValue="All" className="w-full">
            <div className="flex justify-center mb-10">
              <div className="w-full overflow-x-auto">
                  <TabsList className="inline-flex">
                    {categories.map((category) => (
                      <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
                    ))}
                  </TabsList>
              </div>
            </div>

            <TabsContent value="All">
               <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProducts.slice(0, 3).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
               <div className="md:hidden">
                <Carousel opts={{ align: "start", loop: true }} className="w-full">
                  <CarouselContent className="-ml-2">
                    {featuredProducts.slice(0, 3).map((product) => (
                       <CarouselItem key={product.id} className="pl-4 basis-4/5 sm:basis-2/3">
                          <ProductCard product={product} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
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
                <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.filter(p => p.category === category).slice(0, 3).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                 <div className="md:hidden">
                  <Carousel opts={{ align: "start", loop: true }} className="w-full">
                    <CarouselContent className="-ml-2">
                      {products.filter(p => p.category === category).slice(0, 3).map((product) => (
                         <CarouselItem key={product.id} className="pl-4 basis-4/5 sm:basis-2/3">
                            <ProductCard product={product} />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
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
      <ClientLogos />
    </div>
  );
}
