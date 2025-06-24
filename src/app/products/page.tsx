"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products, type Product } from "@/lib/products";
import { ArrowRight } from "lucide-react";

function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="h-full flex flex-col overflow-hidden group border-border/60 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-secondary">
       <CardHeader className="p-0 relative">
          <div className="aspect-video overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              data-ai-hint={product.imageHint}
            />
          </div>
        </CardHeader>
      <CardContent className="p-6 flex flex-col flex-grow">
        <CardTitle className="font-headline mb-2 text-xl text-primary-foreground">{product.name}</CardTitle>
        <CardDescription className="text-base flex-grow mb-6 text-muted-foreground">{product.longDescription}</CardDescription>
        <div className="flex justify-between items-center mt-auto pt-4">
          <p className="text-xl font-bold text-primary">{product.price}</p>
          <Button asChild className="font-semibold">
            <Link href="/contact">
              Enquiry Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

const ProductGrid = ({ products }: { products: Product[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);

export default function ProductsPage() {
  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <div className="bg-background">
      <div className="container py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary-foreground">Our Products</h1>
          <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">Explore our full catalog of premium HVAC components.</p>
        </div>
        
        <Tabs defaultValue="All" className="w-full">
          <div className="flex justify-center">
            <TabsList className="bg-secondary">
              <TabsTrigger value="All">All</TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="All">
            <ProductGrid products={products} />
          </TabsContent>

          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <ProductGrid products={products.filter(p => p.category === category)} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}