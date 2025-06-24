import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { products, type Product } from "@/lib/products";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

export default function ProductsPage() {
  return (
    <div className="bg-background">
      <div className="container py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Our Products</h1>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">Explore our full catalog of premium air cooling solutions.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
