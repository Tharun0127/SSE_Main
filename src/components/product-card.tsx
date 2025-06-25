import Image from "next/image";
import Link from "next/link";
import { type Product } from "@/lib/products";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="h-full flex flex-col overflow-hidden group bg-card text-card-foreground rounded-lg border shadow-sm hover:border-primary transition-colors duration-300">
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-105 p-4"
            data-ai-hint={product.imageHint}
          />
        </Link>
      </div>
      <CardContent className="p-6 flex flex-col flex-grow">
        <CardDescription className="text-sm text-primary font-semibold mb-1">{product.category}</CardDescription>
        <CardTitle className="font-heading text-xl font-bold mb-2">
           <Link href={`/products/${product.id}`} className="hover:underline">{product.name}</Link>
        </CardTitle>
        <p className="text-muted-foreground text-sm flex-grow mb-4">{product.description}</p>
        <Button asChild size="sm" className="w-full font-semibold mt-auto">
          <Link href={`/products/${product.id}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
