
'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { products as staticProducts, type Product } from '@/lib/products';
import { ArrowLeft, PlusCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminProductsPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userProducts = JSON.parse(localStorage.getItem('user-products') || '[]') as Product[];
    const userProductIds = new Set(userProducts.map(p => p.id));
    const uniqueStaticProducts = staticProducts.filter(p => !userProductIds.has(p.id));
    // Show newest user products first, then the remaining static products
    const combined = [...userProducts.reverse(), ...uniqueStaticProducts]; 
    setAllProducts(combined);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="bg-secondary min-h-screen">
        <div className="container py-12 md:py-20">
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
             <Skeleton className="h-9 w-40" />
             <Skeleton className="h-9 w-44" />
          </div>
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-4 w-64 mt-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-80 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-secondary min-h-screen">
      <div className="container py-12 md:py-20">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Button asChild variant="outline" size="sm">
            <Link href="/admin">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Link>
          </Button>
          <Button asChild>
            <Link href="/admin/products/new">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Product
            </Link>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Product Catalog</CardTitle>
            <CardDescription>
              A list of all products in your catalog. All products can be edited.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] hidden sm:table-cell">
                      Image
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Category</TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Description
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="hidden sm:table-cell">
                        <div className="w-16 h-16 relative rounded-md overflow-hidden bg-background border">
                          <Image
                            alt={product.name}
                            className="object-contain p-1"
                            fill
                            src={product.imageUrl}
                            data-ai-hint={product.imageHint}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline">{product.category}</Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell max-w-sm truncate">
                        {product.description}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/admin/products/edit/${product.id}`}>Edit</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
