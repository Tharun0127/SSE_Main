'use client';

import { useState, useEffect, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { sendEnquiryEmail } from '@/app/actions/send-enquiry';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ShoppingBag, Trash2, Send, Loader2 } from 'lucide-react';
import type { ProductEnquiry } from '@/app/actions/types';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(1, "Phone number is required."),
  message: z.string().optional(),
});

export default function EnquiriesPage() {
    const [enquiries, setEnquiries] = useState<ProductEnquiry[]>([]);
    const [isClient, setIsClient] = useState(false);
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    useEffect(() => {
        setIsClient(true);
        const storedEnquiries = JSON.parse(localStorage.getItem('product-enquiries') || '[]');
        setEnquiries(storedEnquiries);
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            message: "",
        },
    });

    const handleRemoveItem = (productId: number) => {
        const updatedEnquiries = enquiries.filter(item => item.productId !== productId);
        setEnquiries(updatedEnquiries);
        localStorage.setItem('product-enquiries', JSON.stringify(updatedEnquiries));
        window.dispatchEvent(new Event('storage'));
        toast({ title: "Item Removed", description: "The product has been removed from your list." });
    };
    
    async function onSubmit(values: z.infer<typeof formSchema>) {
        startTransition(async () => {
            const projectDetails = enquiries.map(item => {
                let details = `Product: ${item.productName} (ID: ${item.productId})\nQuantity: ${item.displayValue}`;
                if (item.measurement) {
                    details += `\nMeasurements: ${item.measurement}`;
                }
                if (item.description) {
                    details += `\nDescription: ${item.description}`;
                }
                return details;
            }).join('\n\n---\n\n');

            try {
                await addDoc(collection(db, "enquiries"), {
                    name: values.name,
                    email: values.email,
                    phone: values.phone,
                    message: values.message,
                    projectDetails,
                    date: new Date().toISOString().split('T')[0],
                    timestamp: serverTimestamp(),
                    status: 'New' as const,
                });

                 // Send email notification in the background
                sendEnquiryEmail({
                    name: values.name,
                    email: values.email,
                    phone: values.phone,
                    message: values.message,
                    projectDetails,
                });
                
                toast({
                    title: "Enquiry Sent!",
                    description: "Thank you! We have received your enquiry and will be in touch shortly.",
                });

                form.reset();
                setEnquiries([]);
                localStorage.removeItem('product-enquiries');
                window.dispatchEvent(new Event('storage'));

            } catch (error) {
                console.error("Failed to submit enquiry:", error);
                toast({
                    variant: "destructive",
                    title: "Submission Failed",
                    description: "Could not send your enquiry. Please try again later.",
                });
            }
        });
    }

    if (!isClient) {
        return null;
    }
    
    return (
        <div className="container py-16 md:py-24">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold font-heading text-foreground">My Enquiry List</h1>
                <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">Review your selected products below and submit your enquiry to our team.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 xl:gap-12 max-w-7xl mx-auto">
                <div className="lg:col-span-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Products for Enquiry ({enquiries.length})</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {enquiries.length === 0 ? (
                                <div className="text-center py-12 text-muted-foreground">
                                    <ShoppingBag className="mx-auto h-12 w-12 mb-4" />
                                    <p className="font-semibold">Your enquiry list is empty.</p>
                                    <Button asChild variant="link" className="mt-2">
                                        <Link href="/products">Browse Products</Link>
                                    </Button>
                                </div>
                            ) : (
                                <ul className="space-y-6">
                                    {enquiries.map(item => (
                                        <li key={item.productId} className="flex items-start gap-4 border-b pb-6 last:border-b-0 last:pb-0">
                                            <div className="relative w-20 h-20 rounded-md border bg-background flex-shrink-0 overflow-hidden">
                                                <Image src={item.productImage} alt={item.productName} fill className="object-contain p-1" />
                                            </div>
                                            <div className="flex-grow">
                                                <h3 className="font-bold text-foreground">{item.productName}</h3>
                                                <p className="text-sm font-semibold text-primary mt-1">{item.displayValue}</p>
                                                {item.measurement && <p className="text-sm text-muted-foreground mt-1"><strong>Measurements:</strong> {item.measurement}</p>}
                                                {item.description && <p className="text-sm text-muted-foreground mt-1"><strong>Notes:</strong> {item.description}</p>}
                                            </div>
                                            <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.productId)}>
                                                <Trash2 className="h-4 w-4" />
                                                <span className="sr-only">Remove</span>
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {enquiries.length > 0 && (
                    <div className="lg:col-span-2">
                        <Card>
                             <CardHeader>
                                <CardTitle>Submit All Enquiries</CardTitle>
                                <CardDescription>Please provide your contact details to proceed.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                        <FormField control={form.control} name="name" render={({ field }) => (
                                            <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                        <FormField control={form.control} name="email" render={({ field }) => (
                                            <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input placeholder="john.doe@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                        <FormField control={form.control} name="phone" render={({ field }) => (
                                            <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input placeholder="(123) 456-7890" {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                        <FormField control={form.control} name="message" render={({ field }) => (
                                            <FormItem><FormLabel>Additional Message (Optional)</FormLabel><FormControl><Textarea placeholder="Any other details or questions..." {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                         <Button type="submit" className="w-full font-semibold" disabled={isPending}>
                                            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                                            Submit All Enquiries
                                        </Button>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}
