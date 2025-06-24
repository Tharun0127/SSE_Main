"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Thermometer, Leaf } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const slides = [
  {
    title: "Experience Pure Comfort",
    description: "Innovative cooling solutions designed for your lifestyle. Stay cool, calm, and collected all year round.",
    image: "https://placehold.co/1920x1080.png",
    imageHint: "modern living room cool",
    link: "/products",
    linkLabel: "Explore Products"
  },
  {
    title: "Engineered for Silence",
    description: "Our whisper-quiet technology ensures you get powerful cooling without the noise. Perfect for bedrooms and offices.",
    image: "https://placehold.co/1920x1080.png",
    imageHint: "serene bedroom minimalist",
    link: "/products",
    linkLabel: "See Our Fans"
  },
  {
    title: "Smart, Efficient, & Eco-Friendly",
    description: "Lower your energy bills and your carbon footprint with our ENERGY STAR® certified air conditioners.",
    image: "https://placehold.co/1920x1080.png",
    imageHint: "green leaf technology",
    link: "/products",
    linkLabel: "Learn More"
  }
];

const features = [
  {
    icon: Thermometer,
    title: "Powerful Cooling",
    description: "Our products are engineered to deliver maximum cooling performance, keeping you comfortable even on the hottest days.",
  },
  {
    icon: Zap,
    title: "Energy Efficient",
    description: "With high EER ratings and smart features, our units save you money while protecting the planet.",
  },
  {
    icon: Leaf,
    title: "Sleek, Modern Design",
    description: "Cool Breeze products don't just feel good, they look good. Enhance your space with our stylish designs.",
  },
];

export default function Home() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const categories = ['All', 'Grills', 'Diffusers', 'Dampers', 'Others'];
  const featuredProducts = products.filter(p => p.featured);

  return (
    <div className="flex flex-col">
      <section className="w-full relative bg-background">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          opts={{ loop: true }}
        >
          <CarouselContent className="-ml-0">
            {slides.map((slide, index) => (
              <CarouselItem key={index} className="pl-0">
                <div className="min-h-[500px] md:min-h-[600px] lg:min-h-[700px] w-full relative flex items-center justify-center">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    data-ai-hint={slide.imageHint}
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-black/50" />
                  <div className="relative text-center text-primary-foreground p-4">
                      {isMounted && <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight drop-shadow-lg max-w-4xl"
                      >
                          {slide.title}
                      </motion.h1>}
                      {isMounted && <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="max-w-2xl text-primary-foreground/80 md:text-lg mt-6 mx-auto drop-shadow-md"
                      >
                          {slide.description}
                      </motion.p>}
                      {isMounted && <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.6 }}
                      >
                        <Button asChild size="lg" className="mt-8 font-semibold text-lg">
                          <Link href={slide.link}>
                            {slide.linkLabel}
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Link>
                        </Button>
                      </motion.div>}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

      <section id="why-us" className="w-full py-12 md:py-20 bg-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-foreground">Why Choose Cool Breeze?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We blend cutting-edge technology with sophisticated design to create air cooling products that elevate your comfort and your home.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <TabsList className="grid grid-cols-2 sm:grid-cols-5 w-full max-w-lg">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value="All">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProducts.slice(0, 3).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="text-center mt-12">
                <Button asChild size="lg" variant="outline">
                  <Link href="/products">View All Products <ArrowRight className="ml-2"/></Link>
                </Button>
              </div>
            </TabsContent>

            {categories.filter(c => c !== 'All').map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.filter(p => p.category === category).slice(0, 3).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
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
    </div>
  );
}
