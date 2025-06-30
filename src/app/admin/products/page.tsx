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
import { PlusCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { AdminStatsCards } from '@/components/admin-stats-cards';

export default function AdminProductsPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const productMap = new Map<number, Product>();
        staticProducts.forEach(p => productMap.set(p.id, p));

        const querySnapshot = await getDocs(collection(db, "products"));
        querySnapshot.forEach((doc) => {
          const firestoreProduct = doc.data() as Product;
          productMap.set(firestoreProduct.id, firestoreProduct);
        });

        const combined = Array.from(productMap.values()).sort((a, b) => b.id - a.id);
        setAllProducts(combined);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
        <div className="flex flex-col gap-4 md:gap-8">
          <AdminStatsCards />
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
    )
  }

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <AdminStatsCards />
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="font-heading">Product Catalog</CardTitle>
            <CardDescription>
              A list of all products in your catalog. All products can be edited.
            </CardDescription>
          </div>
          <Button asChild size="sm">
              <Link href="/admin/products/new">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add New Product
              </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {/* Mobile View: Card List */}
          <div className="md:hidden space-y-4">
            {allProducts.map((product) => (
              <Card key={product.id} className="flex items-center gap-4 p-3">
                <div className="relative w-16 h-16 rounded-md overflow-hidden bg-background border flex-shrink-0">
                  <Image
                    alt={product.name}
                    className="object-contain p-1"
                    fill
                    src={product.imageUrl}
                    data-ai-hint={product.imageHint}
                  />
                </div>
                <div className="flex-grow">
                  <div className="font-medium">{product.name}</div>
                  <Badge variant="outline">{product.category}</Badge>
                </div>
                <Button asChild size="sm" variant="outline" className="flex-shrink-0">
                  <Link href={`/admin/products/edit/${product.id}`}>Edit</Link>
                </Button>
              </Card>
            ))}
          </div>

          {/* Desktop View: Table */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
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
                    <TableCell>
                      <Badge variant="outline">{product.category}</Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
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
  );
}
