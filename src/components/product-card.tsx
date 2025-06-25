import Image from "next/image";
import Link from "next/link";
import { type Product } from "@/lib/products";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="relative min-h-[480px] w-full overflow-hidden rounded-lg group text-primary-foreground shadow-lg">
      {/* Background Image */}
      <Link href={`/products/${product.id}`} className="absolute inset-0">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          data-ai-hint={product.imageHint}
        />
      </Link>
      
      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
      
      {/* Content Overlay */}
      <div className="relative z-10 flex h-full flex-col p-6">
        {/* Top Text */}
        <div>
          <h3 className="font-heading text-2xl font-bold uppercase">
            <Link href={`/products/${product.id}`} className="hover:underline">
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-primary-foreground/90">{product.description}</p>
        </div>
        
        {/* Bottom Content */}
        <div className="mt-auto flex flex-col items-center text-center">
           <Button asChild variant="secondary" className="w-full max-w-xs font-semibold">
             <Link href={`/products/${product.id}`}>View Details</Link>
           </Button>
           <p className="mt-3 text-xs uppercase tracking-wider text-primary-foreground/80">{product.category}</p>
        </div>
      </div>
    </Card>
  );
}
