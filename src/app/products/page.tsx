"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products, type Product } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";

const ProductGrid = ({ products }: { products: Product[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);

function ProductsTabs() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const categories = Array.from(new Set(products.map(p => p.category)));
  const defaultTab = categoryParam && categories.includes(categoryParam) ? categoryParam : 'All';

  return (
     <Tabs defaultValue={defaultTab} className="w-full">
      <div className="flex justify-center">
        <TabsList className="bg-muted">
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
  )
}

export default function ProductsPage() {
  return (
    <div className="bg-background">
      <div className="container py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold font-heading text-foreground">Our Products</h1>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">Explore our full catalog of premium air cooling solutions.</p>
        </div>
        
        <Suspense fallback={<Skeleton className="h-10 w-96 mx-auto rounded-md" />}>
          <ProductsTabs />
        </Suspense>
      </div>
    </div>
  );
}
