import Image from "next/image";
import Link from "next/link";
import { type Product } from "@/lib/products";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="h-full flex flex-col overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card border">
       <Link href={`/products/${product.id}`} className="block overflow-hidden">
        <CardHeader className="p-0 relative aspect-video bg-secondary">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
              data-ai-hint={product.imageHint}
            />
          </CardHeader>
       </Link>
      <CardContent className="p-6 flex flex-col flex-grow">
        <p className="text-sm text-primary font-semibold mb-1">{product.category}</p>
        <Link href={`/products/${product.id}`} className="block">
            <CardTitle className="font-heading mb-2 text-xl group-hover:text-primary transition-colors">{product.name}</CardTitle>
        </Link>
        <CardDescription className="text-sm flex-grow mb-6 text-muted-foreground">{product.description}</CardDescription>
        <div className="mt-auto">
          <Button asChild variant="link" className="p-0 h-auto text-primary font-semibold">
            <Link href={`/products/${product.id}`}>
              View Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
