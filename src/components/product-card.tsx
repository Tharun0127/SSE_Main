import Image from "next/image";
import Link from "next/link";
import { type Product } from "@/lib/products";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="h-full flex flex-col min-h-[480px] overflow-hidden group bg-card text-card-foreground rounded-lg border hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0 flex flex-col flex-grow">
        {/* Top Content: Text */}
        <div className="p-6 pb-4">
          <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
          <h3 className="font-heading text-2xl font-bold uppercase mb-2">
            <Link href={`/products/${product.id}`} className="hover:underline">{product.name}</Link>
          </h3>
          <p className="text-muted-foreground text-sm">{product.description}</p>
        </div>

        {/* Middle Content: Image (takes up available space) */}
        <div className="relative w-full flex-grow overflow-hidden bg-white flex items-center justify-center p-4">
          <Link href={`/products/${product.id}`} className="relative w-full h-full">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-105"
              data-ai-hint={product.imageHint}
            />
          </Link>
        </div>

        {/* Bottom Content: Button */}
        <div className="p-6 pt-4">
          <Button asChild variant="secondary" className="w-full font-semibold">
            <Link href={`/products/${product.id}`}>
              View Details <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
