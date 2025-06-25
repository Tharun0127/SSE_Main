import Image from "next/image";
import Link from "next/link";
import { type Product } from "@/lib/products";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wind } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="h-full flex flex-col overflow-hidden group bg-card text-card-foreground rounded-2xl border shadow-lg hover:border-primary transition-colors duration-300">
      <CardContent className="p-6 flex flex-col flex-grow">
        
        <div className="flex justify-between items-start mb-2 flex-shrink-0">
          <CardTitle className="font-heading uppercase text-xl md:text-2xl font-extrabold tracking-tight max-w-[85%]">
            {product.name}
          </CardTitle>
          <Wind className="h-6 w-6 text-muted-foreground/80 flex-shrink-0" />
        </div>

        <CardDescription className="text-sm text-muted-foreground mb-4 flex-shrink-0">
          {product.description}
        </CardDescription>
        
        <div className="flex-grow my-4 flex items-center justify-center relative min-h-48">
          <Link href={`/products/${product.id}`} className="w-full h-full">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-105"
              data-ai-hint={product.imageHint}
            />
          </Link>
        </div>
        
        <div className="mt-auto flex-shrink-0 pt-4">
          <Button asChild size="lg" className="w-full font-bold" variant="outline">
            <Link href={`/products/${product.id}`}>
              View Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
