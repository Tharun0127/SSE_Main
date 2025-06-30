'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState, useTransition, useEffect } from 'react';
import Image from 'next/image';
import { db, storage } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from './ui/skeleton';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z.object({
  image: z
    .any()
    .refine((files) => files?.[0], "An image is required.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max image size is 2MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png, and .webp formats are supported."
    ),
});

export function HeroImageUploader() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const docRef = doc(db, 'settings', 'content');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().heroImageUrl) {
          setImagePreview(docSnap.data().heroImageUrl);
        } else {
          setImagePreview('https://placehold.co/600x450.png');
        }
      } catch (error) {
        console.error("Error fetching hero image:", error);
        setImagePreview('https://placehold.co/600x450.png');
      } finally {
        setIsLoading(false);
      }
    };
    fetchImage();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const file = values.image[0];
      if (!file) return;
      
      try {
        const imageRef = ref(storage, `site/hero_${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(imageRef, file);
        const imageUrl = await getDownloadURL(snapshot.ref);

        await setDoc(doc(db, "settings", "content"), { heroImageUrl: imageUrl }, { merge: true });

        toast({
          title: 'Hero Image Updated!',
          description: 'The new hero image has been saved.',
        });
        setImagePreview(imageUrl); // Update current preview in UI
        
      } catch (error) {
        console.error("Failed to update hero image:", error);
        toast({
          variant: "destructive",
          title: "Update Failed",
          description: "Could not save the new image. Please try again.",
        });
      }
    });
  }

  if (isLoading) {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-48 mt-2" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-48 w-full" />
            </CardContent>
        </Card>
    )
  }

  return (
    <Card>
        <CardHeader>
            <CardTitle>Homepage Hero Image</CardTitle>
            <CardDescription>Update the main image displayed on the homepage.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="mb-6">
                <Label>Current Image</Label>
                {imagePreview && (
                    <div className="mt-2 relative w-full aspect-[4/3] border rounded-md bg-muted overflow-hidden">
                    <Image src={imagePreview} alt="Current hero image" fill className="object-cover" />
                    </div>
                )}
            </div>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                control={form.control}
                name="image"
                render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                    <FormLabel>Upload New Image</FormLabel>
                    <FormControl>
                        <Input 
                        type="file" 
                        accept="image/*" 
                        {...rest}
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                onChange(e.target.files);
                                const previewUrl = URL.createObjectURL(file);
                                setImagePreview(previewUrl);
                            }
                        }}
                        />
                    </FormControl>
                    <FormDescription>
                        Recommended aspect ratio: 4:3. Max 2MB.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Upload className="mr-2 h-4 w-4" />
                Update Hero Image
                </Button>
            </form>
            </Form>
        </CardContent>
    </Card>
  );
}
