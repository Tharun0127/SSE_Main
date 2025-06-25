"use client";

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products as staticProducts, type Product } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";

const ProductGrid = ({ products }: { products: Product[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
    {products.length > 0 ? (
      products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))
    ) : (
      <p className="md:col-span-2 lg:col-span-3 text-center text-muted-foreground">
        No products found in this category.
      </p>
    )}
  </div>
);

const ProductGridSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[480px] rounded-lg" />
        ))}
    </div>
);


function ProductsTabs() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [allProducts, setAllProducts] = useState<Product[]>(staticProducts);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userProducts = JSON.parse(localStorage.getItem('user-products') || '[]');
    setAllProducts([...staticProducts, ...userProducts]);
    setIsLoading(false);
  }, []);

  const categories = Array.from(new Set(allProducts.map(p => p.category)));
  const defaultTab = categoryParam && categories.includes(categoryParam) ? categoryParam : 'All';
  
  if (isLoading) {
    return (
        <div>
            <Skeleton className="h-10 w-96 mx-auto rounded-md" />
            <ProductGridSkeleton />
        </div>
    )
  }

  return (
     <Tabs defaultValue={defaultTab} className="w-full">
      <div className="flex justify-center">
        <div className="overflow-x-auto pb-2">
            <TabsList className="inline-flex">
            <TabsTrigger value="All">All</TabsTrigger>
            {categories.map((category) => (
                <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
            ))}
            </TabsList>
        </div>
      </div>

      <TabsContent value="All">
        <ProductGrid products={allProducts} />
      </TabsContent>

      {categories.map((category) => (
        <TabsContent key={category} value={category}>
          <ProductGrid products={allProducts.filter(p => p.category === category)} />
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default function ProductsPage() {
  return (
    <div className="bg-background">
      <div className="container py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold font-heading text-foreground">Our Products</h1>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">Explore our full catalog of premium HVAC solutions.</p>
        </div>
        
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductsTabs />
        </Suspense>
      </div>
    </div>
  );
}
