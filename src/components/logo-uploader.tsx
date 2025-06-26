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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from './ui/skeleton';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/svg+xml"];

const formSchema = z.object({
  logo: z
    .any()
    .refine((files) => files?.[0], "A logo image is required.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max image size is 2MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png, .webp and .svg formats are supported."
    ),
});

export function LogoUploader() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [currentLogo, setCurrentLogo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const docRef = doc(db, 'settings', 'main');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().logoUrl) {
          setCurrentLogo(docSnap.data().logoUrl);
          setImagePreview(docSnap.data().logoUrl);
        } else {
          // Fallback to local logo if not in DB
          setCurrentLogo('/sse+logo.png');
          setImagePreview('/sse+logo.png');
        }
      } catch (error) {
        console.error("Error fetching logo:", error);
        setCurrentLogo('/sse+logo.png');
        setImagePreview('/sse+logo.png');
      } finally {
        setIsLoading(false);
      }
    };
    fetchLogo();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const file = values.logo[0];
      if (!file) {
        toast({ variant: "destructive", title: "Image is required." });
        return;
      }
      
      try {
        const imageRef = ref(storage, `site/logo_${Date.now()}_${file.name}`);
        
        const snapshot = await uploadBytes(imageRef, file);
        const imageUrl = await getDownloadURL(snapshot.ref);

        await setDoc(doc(db, "settings", "main"), { logoUrl: imageUrl });

        toast({
          title: 'Logo Updated!',
          description: 'Your new site logo has been saved. It may take a moment to update across the site.',
        });
        setCurrentLogo(imageUrl); // Update current logo preview in UI
        
      } catch (error) {
        console.error("Failed to update logo:", error);
        toast({
          variant: "destructive",
          title: "Update Failed",
          description: "Could not save your new logo. Please try again.",
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
                <Skeleton className="h-24 w-full" />
            </CardContent>
        </Card>
    )
  }

  return (
    <Card>
        <CardHeader>
            <CardTitle>Site Logo</CardTitle>
            <CardDescription>Update the logo that appears in the site header and footer.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="mb-6">
                <Label>Current Logo</Label>
                {imagePreview && (
                    <div className="mt-2 relative w-48 h-24 p-2 border rounded-md bg-muted">
                    <Image src={imagePreview} alt="Current site logo" fill className="object-contain" />
                    </div>
                )}
            </div>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                control={form.control}
                name="logo"
                render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                    <FormLabel>Upload New Logo</FormLabel>
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
                        Recommended size: 200x50 pixels. Max 2MB.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Upload className="mr-2 h-4 w-4" />
                Update Logo
                </Button>
            </form>
            </Form>
        </CardContent>
    </Card>
  );
}
