"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products, type Product } from "@/lib/products";

function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="h-full flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
       <CardHeader className="p-0">
          <div className="aspect-video relative">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              data-ai-hint={product.imageHint}
            />
          </div>
        </CardHeader>
      <CardContent className="p-6 flex flex-col flex-grow">
        <CardTitle className="font-headline mb-2 text-xl">{product.name}</CardTitle>
        <CardDescription className="text-base flex-grow mb-4">{product.longDescription}</CardDescription>
        <div className="flex justify-between items-center mt-auto pt-4">
          <p className="text-xl font-bold text-primary">{product.price}</p>
          <Button asChild className="font-semibold">
            <Link href="/contact">
              Enquiry Now
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

const ProductGrid = ({ products }: { products: Product[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);

export default function ProductsPage() {
  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <div className="bg-background">
      <div className="container py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Our Products</h1>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">Explore our full catalog of premium HVAC components.</p>
        </div>
        
        <Tabs defaultValue="All" className="w-full">
          <div className="flex justify-center">
            <TabsList>
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
