
'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { products as staticProducts, type Product } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Scaling, Ruler } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = parseInt(params.id as string, 10);
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (productId) {
      const userProducts: Product[] = JSON.parse(localStorage.getItem('user-products') || '[]');
      
      const productMap = new Map<number, Product>();
      staticProducts.forEach(p => productMap.set(p.id, p));
      userProducts.forEach(p => productMap.set(p.id, p));
      
      const foundProduct = productMap.get(productId);
      setProduct(foundProduct);
      setIsLoading(false);
    }
  }, [productId]);

  if (isLoading) {
    return (
      <div className="bg-secondary">
        <div className="container py-16 md:py-24">
          <Skeleton className="h-9 w-44 mb-8" />
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
            <Skeleton className="aspect-square rounded-lg" />
            <div className="space-y-6">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-20 w-full" />
              <Separator />
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Button asChild className="mt-6">
          <Link href="/products">
            <ArrowLeft className="mr-2" /> Back to Products
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-secondary">
        <div className="container py-16 md:py-24">
             <div className="mb-8">
                <Button asChild variant="outline" size="sm">
                    <Link href="/products">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Products
                    </Link>
                </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
                <div className="relative aspect-square rounded-lg overflow-hidden border bg-background shadow-md">
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-contain p-8"
                        data-ai-hint={product.imageHint}
                        priority
                    />
                </div>

                <div className="space-y-6">
                    <div>
                        <Badge variant="outline" className="mb-2">{product.category}</Badge>
                        <h1 className="text-3xl md:text-4xl font-extrabold font-heading">{product.name}</h1>
                        <p className="mt-4 text-lg text-muted-foreground">{product.longDescription}</p>
                    </div>

                    <Separator />
                    
                    <Card className="transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
                      <CardHeader>
                        <CardTitle className="text-xl font-heading">Product Specifications</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {product.measurementUnit && (
                          <div className="flex items-center gap-4">
                            <Ruler className="h-6 w-6 text-primary flex-shrink-0" />
                            <div>
                              <h3 className="font-semibold text-foreground">Measurement Unit</h3>
                              <p className="text-muted-foreground">{product.measurementUnit}</p>
                            </div>
                          </div>
                        )}
                        {product.availableSizes && product.availableSizes.length > 0 && (
                          <div className="flex items-start gap-4">
                            <Scaling className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold text-foreground">Available Sizes</h3>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {product.availableSizes.map(size => (
                                        <Badge key={size} variant="secondary">{size}</Badge>
                                    ))}
                                </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <Button asChild size="lg" className="w-full">
                       <Link href="/contact">
                            Enquire Now
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    </div>
  );
}
