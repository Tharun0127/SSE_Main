
"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { products as staticProducts, type Product } from "@/lib/products";
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
  { name: "Blue Star", imageUrl: "https://consumer.bluestarindia.com/cdn/shop/files/Untitled_design_-_2024-09-19T165059.397.png?v=1726744919", hint: "Blue Star logo" },
  { name: "Daikin", imageUrl: "https://logos-world.net/wp-content/uploads/2023/01/Daikin-Logo-1963.png", hint: "Daikin logo" },
  { name: "Hitachi", imageUrl: "https://1000logos.net/wp-content/uploads/2018/01/Hitachi-logo.jpg", hint: "Hitachi logo" },
  { name: "Voltas", imageUrl: "https://cdn.i.haymarketmedia.asia/?n=campaign-india%2Fcontent%2F20160517214624452404_Voltas_logo_460.gif&h=630&w=1200&q=75&v=20250320&c=1", hint: "Voltas logo" },
  { name: "Trane", imageUrl: "data:image/png;base64,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", hint: "Trane logo" },
  { name: "LG", imageUrl: "https://kreafolk.com/cdn/shop/articles/lg-logo-design-history-and-evolution-kreafolk_03aeb70a-1702-4330-a3d7-91c344688e97.jpg?v=1717725016&width=2048", hint: "LG logo" },
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
  const [allProducts, setAllProducts] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const userProducts: Product[] = JSON.parse(localStorage.getItem('user-products') || '[]');
    
    const productMap = new Map<number, Product>();
    // Base order is static products
    staticProducts.forEach(p => productMap.set(p.id, p));
    // Overwrite with user products (edited or new)
    userProducts.forEach(p => productMap.set(p.id, p));

    setAllProducts(Array.from(productMap.values()));
    setIsLoading(false);
  }, []);

  const categories = ['All', 'Grills', 'Diffusers', 'Dampers', 'Others'];
  const featuredProducts = allProducts.filter(p => p.featured);

  return (
    <div className="flex flex-col bg-background">
      <section className="w-full bg-background text-foreground">
        <div className="container grid md:grid-cols-2 gap-12 items-center py-20 md:py-32">
          <div className="flex flex-col items-start text-left">
              <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight"
              >
                  Experience Pure Comfort
              </motion.h1>
              <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="max-w-xl text-muted-foreground md:text-lg mt-6"
              >
                  Innovative HVAC solutions designed for your lifestyle. Stay cool, calm, and collected all year round.
              </motion.p>
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                  className="mt-8"
              >
                  <Button asChild size="lg">
                      <Link href="/products">
                          Explore Products
                          <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                  </Button>
              </motion.div>
          </div>
          <div className="flex justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative w-full max-w-md aspect-[4/3]"
            >
                <Image
                    src="https://placehold.co/600x450.png"
                    alt="Modern Air Cooling Unit"
                    fill
                    className="object-cover rounded-2xl shadow-2xl bg-accent"
                    data-ai-hint="modern air conditioner"
                    priority
                />
            </motion.div>
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
                    src={logo.imageUrl}
                    width={120}
                    height={40}
                    alt={`${logo.name} logo`}
                    data-ai-hint={`${logo.name.toLowerCase()} logo`}
                    className="object-contain"
                  />
                </li>
              ))}
            </ul>
          </div>
        
          <div className="pt-16">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold font-heading">Featured Products</h2>
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
                    {allProducts.filter(p => p.category === category).slice(0, 3).map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                  <div className="md:hidden">
                    <Carousel opts={{ align: "start" }} className="w-full">
                      <CarouselContent className="-ml-4">
                        {allProducts.filter(p => p.category === category).slice(0, 3).map((product) => (
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
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading">Why Choose Sri Sai Enterprises?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We blend cutting-edge technology with sophisticated design to create HVAC products that elevate your comfort and your space.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={cn(
                  "flex rounded-2xl shadow-lg p-6 space-y-6 text-center transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:-translate-y-1",
                  index % 2 === 1 ? "flex-col-reverse space-y-reverse" : "flex-col",
                  ["bg-card", "bg-secondary", "bg-card"][index % 3]
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
                  <h3 className="text-2xl font-bold font-heading mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section className="w-full py-16 md:py-24 bg-primary">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-primary/80 backdrop-blur-sm p-8 rounded-2xl text-center flex flex-col justify-center items-center shadow-lg text-primary-foreground border border-primary-foreground/20">
              <h3 className="text-5xl md:text-6xl font-extrabold font-heading">20+</h3>
              <p className="mt-2 text-primary-foreground/80">Years of Experience</p>
            </div>
            <div className="bg-primary/80 backdrop-blur-sm p-8 rounded-2xl text-center flex flex-col justify-center items-center shadow-lg text-primary-foreground border border-primary-foreground/20">
              <h3 className="text-5xl md:text-6xl font-extrabold font-heading">100+</h3>
              <p className="mt-2 text-primary-foreground/80">HVAC Dealers</p>
            </div>
          </div>
        </div>
      </section>

      <section id="consult-us" className="w-full py-16 md:py-24 bg-background">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center bg-card p-8 md:p-12 rounded-2xl shadow-lg border transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading">Have a Project in Mind?</h2>
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
