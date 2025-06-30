'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState, useTransition, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from './ui/skeleton';

const formSchema = z.object({
  contactEmail: z.string().email("Please enter a valid email."),
  whatsappNumber: z.string().min(10, "Please enter a valid phone number including country code.").regex(/^\d+$/, "Phone number must contain only digits."),
  contactPhone1: z.string().min(10, "Please enter a valid phone number."),
  contactPhone2: z.string().min(10, "Please enter a valid phone number."),
});

export function SiteContactManager() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contactEmail: 'trk0653705@gmail.com',
      whatsappNumber: '918686198748',
      contactPhone1: '+91 98497 26724',
      contactPhone2: '+91 97048 68999',
    },
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, 'settings', 'content');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          form.reset({
            contactEmail: data.contactEmail || 'trk0653705@gmail.com',
            whatsappNumber: data.whatsappNumber || '918686198748',
            contactPhone1: data.contactPhone1 || '+91 98497 26724',
            contactPhone2: data.contactPhone2 || '+91 97048 68999',
          });
        }
      } catch (error) {
        console.error("Error fetching contact settings:", error);
        toast({ variant: 'destructive', title: "Error", description: "Could not load contact settings." });
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, [form, toast]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        await setDoc(doc(db, "settings", "content"), values, { merge: true });
        toast({
          title: 'Settings Saved!',
          description: 'Your contact information has been updated.',
        });
      } catch (error) {
        console.error("Failed to save settings:", error);
        toast({
          variant: "destructive",
          title: "Update Failed",
          description: "Could not save settings. Please try again.",
        });
      }
    });
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64 mt-2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>Update the contact details displayed across the site and used for notifications.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Admin Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="admin@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="whatsappNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 918686198748" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <FormField
                  control={form.control}
                  name="contactPhone1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Phone 1</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., +91 98497 26724" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="contactPhone2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Phone 2</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., +91 97048 68999" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
             </div>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
