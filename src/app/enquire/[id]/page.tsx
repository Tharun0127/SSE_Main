
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useEffect, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Loader2, ArrowLeft, Send } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';

import { type Product, products as staticProducts } from '@/lib/products';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

export type ProductEnquiry = {
  productId: number;
  productName: string;
  productImage: string;
  measurements: string;
  quantity: string;
};

const formSchema = z.object({
  measurements: z.string().min(1, 'Measurements are required.'),
  quantity: z.string().min(1, 'Quantity is required.'),
});

export default function EnquireProductPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const productId = parseInt(params.id as string, 10);

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      measurements: '',
      quantity: '',
    },
  });
  
  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        setIsLoading(true);
        try {
          const docRef = doc(db, 'products', String(productId));
          const docSnap = await getDoc(docRef);
          let foundProduct: Product | undefined;
          
          if (docSnap.exists()) {
            foundProduct = docSnap.data() as Product;
          } else {
            foundProduct = staticProducts.find(p => p.id === productId);
          }
          setProduct(foundProduct || null);
        } catch (error) {
          console.error("Error fetching product:", error);
          setProduct(staticProducts.find(p => p.id === productId) || null);
        } finally {
          setIsLoading(false);
        }
      };
      fetchProduct();
    }
  }, [productId]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
        if (!product) return;
        
        const existingEnquiries: ProductEnquiry[] = JSON.parse(localStorage.getItem('product-enquiries') || '[]');
        
        // Check if product already in enquiries, if so update it. Otherwise add.
        const productIndex = existingEnquiries.findIndex(item => item.productId === product.id);

        const newEnquiry: ProductEnquiry = {
            productId: product.id,
            productName: product.name,
            productImage: product.imageUrl,
            measurements: values.measurements,
            quantity: values.quantity,
        };

        if (productIndex > -1) {
            existingEnquiries[productIndex] = newEnquiry;
        } else {
            existingEnquiries.push(newEnquiry);
        }

        localStorage.setItem('product-enquiries', JSON.stringify(existingEnquiries));
        window.dispatchEvent(new Event('storage')); // Notify header of change
        
        toast({
            title: "Product Added to Enquiries",
            description: `${product.name} has been added to your enquiry list.`,
        });

        router.push('/enquiries');
    });
  }

  if (isLoading) {
    return (
       <div className="bg-secondary min-h-screen">
        <div className="container py-12 md:py-20 max-w-2xl mx-auto">
           <Skeleton className="h-9 w-40 mb-8" />
           <Skeleton className="h-[600px] w-full" />
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
    <div className="bg-secondary min-h-screen">
      <div className="container py-12 md:py-20 max-w-2xl mx-auto">
        <div className="mb-8">
            <Button asChild variant="outline" size="sm">
                <Link href={`/products/${product.id}`}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Product
                </Link>
            </Button>
        </div>
        <Card>
            <CardHeader>
                <CardTitle className="font-heading text-2xl">Enquire About Product</CardTitle>
                <CardDescription>Enter your specifications for the product below.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex gap-6 mb-8 border-b pb-8">
                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-lg border bg-background flex-shrink-0 overflow-hidden">
                        <Image src={product.imageUrl} alt={product.name} fill className="object-contain p-2" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                        <h2 className="text-xl sm:text-2xl font-bold font-heading">{product.name}</h2>
                        <p className="text-muted-foreground mt-2 text-sm">{product.description}</p>
                    </div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="measurements"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Required Measurements</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., 24x24 Inches, 300mm Diameter" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="quantity"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Required Quantity</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., 15 units" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full font-semibold" disabled={isPending}>
                            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                            Add to Enquiry List
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
