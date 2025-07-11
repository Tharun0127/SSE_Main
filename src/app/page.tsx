
"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { motion } from "framer-motion";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import useEmblaCarousel from 'embla-carousel-react';

import { Button } from "@/components/ui/button";
import { ArrowRight, MoveHorizontal } from "lucide-react";
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
  {
    name: "Blue Star",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/srisaienterprises-892b9.firebasestorage.app/o/Trusted%20Companies%2Fblue-star-limited-logo-vector-removebg-preview.png?alt=media&token=98c9ebee-9477-4242-9e6e-0ee0d020900e",
    hint: "Blue Star logo",
  },
  {
    name: "MitsuBishi",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/srisaienterprises-892b9.firebasestorage.app/o/Trusted%20Companies%2Fnav-logo-black.svg?alt=media&token=56881520-54d1-4b0f-a755-09ebdb9c2434",
    hint: "Mistubishi logo",
  },
  {
    name: "Daikin",
    imageUrl:
      "https://logos-world.net/wp-content/uploads/2023/01/Daikin-Logo-1963.png",
    hint: "Daikin logo",
  },
  {
    name: "Hitachi",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/srisaienterprises-892b9.firebasestorage.app/o/Trusted%20Companies%2FHitachi-logo-Photoroom.png?alt=media&token=12722c41-48c2-4942-a0ae-3fec1b8d5c76",
    hint: "Hitachi logo",
  },
  {
    name: "Voltas",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/srisaienterprises-892b9.firebasestorage.app/o/Trusted%20Companies%2F08122024-image6-equitymaster-removebg-preview.png?alt=media&token=12a03c83-628e-444b-aa4a-2af25801870a",
    hint: "Voltas logo",
  },
  {
    name: "LG",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/srisaienterprises-892b9.firebasestorage.app/o/Trusted%20Companies%2Flogo-lg-100-44.svg?alt=media&token=294f24c0-92ac-4d6e-b672-22bd2592f09a",
    hint: "LG logo",
  },
];

const initialFeatures = [
  {
    title: "Proven Expertise",
    description: "With over 20 years of industry experience, we deliver dependable products and seamless project execution you can count on.",
    image: "https://placehold.co/600x450.png",
    imageHint: "gears handshake",
    firestoreField: "whyChooseUsImage1"
  },
  {
    title: "Tailored Manufacturing",
    description: "Our products are custom-engineered to meet your site-specific airflow requirements with precision and flexibility.",
    image: "https://placehold.co/600x450.png",
    imageHint: "blueprint ruler",
    firestoreField: "whyChooseUsImage2"
  },
  {
    title: "Industry Versatility",
    description: "Be it corporate spaces, cleanrooms, or infrastructure like metro stations — our ventilation solutions are designed for performance across diverse environments.",
    image: "https://placehold.co/600x450.png",
    imageHint: "cityscape factory",
    firestoreField: "whyChooseUsImage3"
  },
];

export default function Home() {
  const [allProducts, setAllProducts] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [heroImageUrl, setHeroImageUrl] = React.useState("https://placehold.co/1200x800.png");
  const [features, setFeatures] = React.useState(initialFeatures);


  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch products
        const productMap = new Map<number, Product>();
        staticProducts.forEach(p => productMap.set(p.id, p));

        const productSnapshot = await getDocs(collection(db, "products"));
        productSnapshot.forEach((doc) => {
          const firestoreProduct = doc.data() as Product;
          productMap.set(firestoreProduct.id, firestoreProduct);
        });
        
        setAllProducts(Array.from(productMap.values()));

        // Fetch content
        const contentDocRef = doc(db, 'settings', 'content');
        const contentDocSnap = await getDoc(contentDocRef);
        if (contentDocSnap.exists()) {
            const data = contentDocSnap.data();
            setHeroImageUrl(data.heroImageUrl || "https://placehold.co/1200x800.png");
            setFeatures(prevFeatures => prevFeatures.map(feature => ({
                ...feature,
                image: data[feature.firestoreField] || feature.image
            })));
        }

      } catch (error) {
        console.error("Error fetching data, falling back to static data:", error);
        setAllProducts(staticProducts);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    containScroll: 'trimSnaps',
  });
  
  const [tweenValues, setTweenValues] = React.useState<number[]>([]);

  const onScroll = React.useCallback(() => {
    if (!emblaApi) return;
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();

    const styles = emblaApi.scrollSnapList().map((scrollSnap, index) => {
      if (!emblaApi.slidesInView().includes(index)) return 0;
      let diffToTarget = scrollSnap - scrollProgress;

      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.target();
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target);
            if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
            if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
          }
        });
      }
      return 1 - Math.abs(diffToTarget * 1.5);
    });
    setTweenValues(styles);
  }, [emblaApi, setTweenValues]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onScroll();
    emblaApi.on('scroll', onScroll);
    emblaApi.on('reInit', onScroll);
  }, [emblaApi, onScroll]);

  const categories = ['All', 'Grills', 'Diffusers', 'Dampers', 'Others'];
  const featuredProducts = allProducts.filter(p => p.featured);

  return (
    <div className="flex flex-col bg-background">
      <section className="w-full bg-background text-foreground">
        <div className="container flex flex-col lg:flex-row items-center gap-12 py-20 md:py-24 lg:py-32">
          {/* Left Column: Text Content */}
          <div className="lg:w-1/2 lg:pr-8 flex flex-col items-center lg:items-start text-center lg:text-left">
              <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight"
              >
                  Engineered Airflow, Trusted Ventilation Partner
              </motion.h1>
              <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="max-w-xl text-muted-foreground md:text-lg mt-6"
              >
                  Delivering high-performance air distribution solutions for the Pharma, IT, and Infrastructure sectors since 2003.
              </motion.p>
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                  className="mt-8"
              >
                  <Button asChild size="lg">
                      <Link href="/products">
                          Explore Our Products
                          <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                  </Button>
              </motion.div>
          </div>
          {/* Right Column: Image */}
          <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full lg:w-1/2 aspect-[4/3] max-w-lg lg:max-w-none"
          >
              <Image
                  src={heroImageUrl}
                  alt="Modern Air Cooling Unit"
                  fill
                  className="object-cover rounded-2xl shadow-2xl bg-accent"
                  data-ai-hint="modern air conditioner"
                  priority
              />
          </motion.div>
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
      
      <section id="why-us" className="w-full py-16 md:py-24 bg-background overflow-hidden">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading">Why Choose Sri Sai Enterprises?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We combine advanced technology with elegant design to deliver HVAC products that enhance both your comfort and your environment.
            </p>
          </div>
          
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={cn(
                  "flex flex-col rounded-2xl shadow-lg p-6 space-y-6 text-center",
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

          <div className="md:hidden">
              <div className="overflow-hidden -mx-4" ref={emblaRef}>
                  <div className="flex">
                      {features.map((feature, index) => (
                          <div
                              className="flex-shrink-0 flex-grow-0 basis-[85%] sm:basis-3/5 px-4"
                              key={feature.title}
                          >
                               <div
                                  style={{
                                    ...(tweenValues.length && {
                                        filter: `blur(${Math.max(0, 4 - 4 * tweenValues[index])}px)`,
                                        transform: `scale(${0.92 + 0.08 * tweenValues[index]})`,
                                        opacity: Math.max(0.5, tweenValues[index])
                                    })
                                  }}
                                  className={cn(
                                    "flex flex-col rounded-2xl shadow-lg p-6 space-y-6 text-center transition-opacity",
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
                          </div>
                      ))}
                  </div>
              </div>
              <p className="mt-6 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
                  <MoveHorizontal className="h-4 w-4" />
                  Drag to Scroll
              </p>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 bg-primary">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-primary-foreground">
              Delivering Results That Matter
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-secondary p-6 rounded-2xl text-center flex flex-col justify-center items-center shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <div className="text-4xl mb-2">🛠️</div>
              <h3 className="text-2xl font-bold font-heading text-primary">20+</h3>
              <p className="mt-1 text-muted-foreground text-sm">Years of HVAC Manufacturing Experience</p>
            </div>
            <div className="bg-secondary p-6 rounded-2xl text-center flex flex-col justify-center items-center shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <div className="text-4xl mb-2">🤝</div>
              <h3 className="text-2xl font-bold font-heading text-primary">200+</h3>
              <p className="mt-1 text-muted-foreground text-sm">Clients Across India</p>
            </div>
            <div className="bg-secondary p-6 rounded-2xl text-center flex flex-col justify-center items-center shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <div className="text-4xl mb-2">🌐</div>
              <h3 className="text-2xl font-bold font-heading text-primary">15+</h3>
              <p className="mt-1 text-muted-foreground text-sm">Sectors Served with Custom Solutions</p>
            </div>
            <div className="bg-secondary p-6 rounded-2xl text-center flex flex-col justify-center items-center shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <div className="text-4xl mb-2">📦</div>
              <h3 className="text-2xl font-bold font-heading text-primary">10,000+</h3>
              <p className="mt-1 text-muted-foreground text-sm">Units Manufactured Annually</p>
            </div>
          </div>
        </div>
      </section>

      <section id="consult-us" className="w-full py-16 md:py-24 bg-background">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center bg-card p-8 md:p-12 rounded-2xl shadow-lg border transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading">Looking for HVAC Products That Power Your Vision?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Whether you're an architect, builder, or homeowner, we’re here to craft customized HVAC solutions that bring your projects to life. Share your requirements — and our team will connect with you directly to provide expert guidance tailored to your needs.
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
