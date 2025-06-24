
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState, useTransition } from 'react';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { ArrowLeft, Loader2 } from 'lucide-react';

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
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export default function NewProductPage() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      setTimeout(() => {
        console.log('New Product Submitted:', {
          ...values,
          // In a real app, you would upload the image and get a URL.
          // For now, we just log the file object.
          imageUrl: `(Pretend URL for ${values.image.name})`, 
        });

        toast({
          title: 'Product Submitted!',
          description: 'In a real app, this product would be saved to a database.',
        });

        form.reset();
        setImagePreview(null);
      }, 1000);
    });
  }

  return (
    <div className="bg-muted/40 min-h-screen">
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
            <CardTitle className="font-heading">Add New Product</CardTitle>
            <CardDescription>
              Fill out the form below to add a new product to your catalog.
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
                
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Image</FormLabel>
                      <FormControl>
                        <Input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              field.onChange(file);
                              const previewUrl = URL.createObjectURL(file);
                              setImagePreview(previewUrl);
                            }
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Upload a high-quality image of the product. Max 5MB.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {imagePreview && (
                  <div className="relative w-40 h-40 border rounded-md overflow-hidden">
                    <Image src={imagePreview} alt="Image preview" fill className="object-cover" />
                  </div>
                )}
                
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
                  Add Product
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
