"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products, type Product } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

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
      <div className="container py-20 md:py-28">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold font-heading text-foreground">Our Products</h1>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">Explore our full catalog of premium air cooling solutions.</p>
        </div>
        
        <Tabs defaultValue="All" className="w-full">
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
      </div>
    </div>
  );
}
