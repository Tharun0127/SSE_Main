
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState, useTransition, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { type Product, products as staticProducts } from '@/lib/products';
import { db, storage } from '@/lib/firebase';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Loader2, Trash2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z.object({
  name: z.string().min(3, 'Title must be at least 3 characters.'),
  description: z.string().min(10, 'Short description must be at least 10 characters.'),
  longDescription: z.string().min(20, 'Full description must be at least 20 characters.'),
  category: z.enum(['Grills', 'Diffusers', 'Dampers', 'Others']),
  measurementUnit: z.string().optional(),
  availableSizes: z.string().optional(),
  image: z
    .any()
    .optional()
    .refine((files) => !files?.[0] || files?.[0]?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (files) => !files?.[0] || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export default function EditProductPage() {
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const productId = Number(params.id);

  const [isPending, startTransition] = useTransition();
  const [product, setProduct] = useState<Product | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      longDescription: '',
      measurementUnit: '',
      availableSizes: '',
    },
  });

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        try {
          const docRef = doc(db, 'products', String(productId));
          const docSnap = await getDoc(docRef);
          let productToEdit: Product | undefined;

          if (docSnap.exists()) {
            productToEdit = docSnap.data() as Product;
          } else {
            productToEdit = staticProducts.find(p => p.id === productId);
          }

          if (productToEdit) {
            setProduct(productToEdit);
            form.reset({
              ...productToEdit,
              availableSizes: productToEdit.availableSizes?.join(', '),
            });
            setImagePreview(productToEdit.imageUrl);
          } else {
            toast({
              variant: "destructive",
              title: "Product not found",
              description: "This product could not be found.",
            });
            router.replace('/admin/products');
          }
        } catch (error) {
          console.error("Error fetching product:", error);
           toast({ variant: "destructive", title: "Error", description: "Failed to load product data." });
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchProduct();
  }, [productId, router, form, toast]);

  const updateProductInFirebase = async (imageUrl: string, values: z.infer<typeof formSchema>) => {
    if (!product) return;

    const updatedProduct: Product = {
      ...product,
      id: productId,
      name: values.name,
      category: values.category,
      description: values.description,
      longDescription: values.longDescription,
      imageUrl: imageUrl,
      imageHint: values.name.toLowerCase().replace(/\s/g, ' '),
      measurementUnit: values.measurementUnit,
      availableSizes: values.availableSizes ? values.availableSizes.split(',').map(s => s.trim()) : [],
    };

    try {
      const docRef = doc(db, 'products', String(productId));
      await setDoc(docRef, updatedProduct, { merge: true });

      toast({
        title: 'Product Updated!',
        description: 'Your product has been successfully updated.',
      });

      router.push('/admin/products');
    } catch (error) {
      console.error("Failed to update product:", error);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "Could not save your changes. Please try again.",
      });
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const newImageFile = values.image?.[0];

      if (newImageFile) {
        try {
          const imageRef = ref(storage, `products/${productId}_${newImageFile.name}`);
          const snapshot = await uploadBytes(imageRef, newImageFile);
          const newImageUrl = await getDownloadURL(snapshot.ref);
          await updateProductInFirebase(newImageUrl, values);
        } catch (error) {
           console.error("Image upload failed:", error);
           toast({ variant: "destructive", title: "Image Error", description: "Could not upload the new image." });
        }
      } else {
        await updateProductInFirebase(product!.imageUrl, values);
      }
    });
  }

  const handleDelete = () => {
    startTransition(async () => {
      if (!product) return;
      try {
        // Delete Firestore document
        await deleteDoc(doc(db, "products", String(productId)));

        // Delete image from Cloud Storage if it's a Firebase URL
        if (product.imageUrl.includes('firebasestorage.googleapis.com')) {
          try {
            const imageRef = ref(storage, product.imageUrl);
            await deleteObject(imageRef);
          } catch (storageError) {
             // Log error but don't block deletion if image not found (e.g., already deleted)
             console.warn("Could not delete image from storage:", storageError);
          }
        }
        
        toast({
          title: 'Product Deleted',
          description: 'The product has been removed.',
        });
        router.push('/admin/products');
      } catch (error) {
        console.error("Failed to delete product:", error);
        toast({
          variant: "destructive",
          title: "Delete Failed",
          description: "Could not delete the product. Please try again.",
        });
      }
    });
  }

  if (isLoading) {
    return (
      <div className="bg-secondary min-h-screen">
        <div className="container py-12 md:py-20 max-w-3xl mx-auto">
           <Skeleton className="h-9 w-40 mb-8" />
           <Skeleton className="h-[900px] w-full" />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-secondary min-h-screen">
      <div className="container py-12 md:py-20 max-w-3xl mx-auto">
        <div className="mb-8">
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/products">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Catalog
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Edit Product</CardTitle>
            <CardDescription>
              Update the details for this product.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Linear Bar Grille" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormItem>
                  <FormLabel>Current Image</FormLabel>
                  {imagePreview && (
                    <div className="relative w-40 h-40 border rounded-md overflow-hidden bg-muted">
                      <Image src={imagePreview} alt="Current product image" fill className="object-cover" />
                    </div>
                  )}
                </FormItem>

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                      <FormLabel>Upload New Image (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          type="file" 
                          accept="image/*" 
                           {...rest}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              onChange(e.target.files);
                              setImagePreview(URL.createObjectURL(file));
                            }
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Only upload a new file if you want to replace the current image. Max 5MB.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Grills">Grills</SelectItem>
                          <SelectItem value="Diffusers">Diffusers</SelectItem>
                          <SelectItem value="Dampers">Dampers</SelectItem>
                          <SelectItem value="Others">Others</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="A brief, one-sentence summary for product cards."
                          className="resize-none"
                          rows={2}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="longDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="A detailed description for the product page."
                          className="resize-none"
                          rows={5}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <FormField
                    control={form.control}
                    name="measurementUnit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Measurement Unit (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Inches, mm" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="availableSizes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Available Sizes (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 6x6, 12x12, 24x24" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter sizes separated by commas.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full font-semibold" disabled={isPending}>
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="bg-destructive/5 border-t pt-6">
            <div className="w-full">
              <h3 className="font-semibold text-destructive">Danger Zone</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-4">
                  Deleting a product is a permanent action and cannot be undone.
              </p>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full sm:w-auto" disabled={isPending}>
                    <Trash2 className="mr-2 h-4 w-4" /> Delete Product
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the
                      product &quot;{product?.name}&quot; from the database.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-destructive hover:bg-destructive/90"
                    >
                      Yes, delete product
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
