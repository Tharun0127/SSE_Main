import Image from "next/image";
import Link from "next/link";
import { type Product } from "@/lib/products";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="h-full flex flex-col overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-card border">
       <CardHeader className="p-0 relative aspect-square">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            data-ai-hint={product.imageHint}
          />
        </CardHeader>
      <CardContent className="p-6 flex flex-col flex-grow">
        <p className="text-sm text-primary font-semibold mb-1">{product.category}</p>
        <CardTitle className="font-heading mb-2 text-xl">{product.name}</CardTitle>
        <CardDescription className="text-base flex-grow mb-6 text-muted-foreground">{product.description}</CardDescription>
        <div className="flex justify-between items-center mt-auto pt-4 border-t">
          <p className="text-lg font-semibold font-heading text-muted-foreground">Request a Quote</p>
          <Button asChild>
            <Link href="/contact">
              Enquiry
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
