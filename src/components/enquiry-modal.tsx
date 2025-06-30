'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState, useTransition, useEffect } from 'react';
import Image from 'next/image';
import { Loader2, Send } from 'lucide-react';

import { type Product } from '@/lib/products';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { ProductEnquiry } from '@/app/enquiries/page';

interface EnquiryModalProps {
  product: Product;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const formSchema = z.object({
  unit: z.enum(['SFT', 'Each Piece']),
  quantity: z.coerce.number().min(1, 'Quantity must be at least 1.'),
  measurement: z.string().optional(),
  description: z.string().optional(),
});

export function EnquiryModal({ product, isOpen, onOpenChange }: EnquiryModalProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      unit: 'SFT',
      quantity: 1,
      measurement: '',
      description: '',
    },
  });

  const quantity = form.watch('quantity');
  const unit = form.watch('unit');
  const [livePreview, setLivePreview] = useState('');

  useEffect(() => {
    if (quantity > 0 && unit) {
      setLivePreview(`${quantity} ${unit}`);
    } else {
      setLivePreview('');
    }
  }, [quantity, unit]);
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      const existingEnquiries: ProductEnquiry[] = JSON.parse(
        localStorage.getItem('product-enquiries') || '[]'
      );
      
      const productIndex = existingEnquiries.findIndex(item => item.productId === product.id);

      const newEnquiry: ProductEnquiry = {
        productId: product.id,
        productName: product.name,
        productImage: product.imageUrl,
        unit: values.unit,
        quantity: values.quantity,
        displayValue: `${values.quantity} ${values.unit}`,
        measurement: values.measurement,
        description: values.description,
      };

      if (productIndex > -1) {
        existingEnquiries[productIndex] = newEnquiry;
      } else {
        existingEnquiries.push(newEnquiry);
      }

      localStorage.setItem('product-enquiries', JSON.stringify(existingEnquiries));
      window.dispatchEvent(new Event('storage')); // Notify header of change
      
      toast({
        title: 'Product Added to Enquiries',
        description: `${product.name} has been added to your enquiry list.`,
      });
      
      onOpenChange(false);
      form.reset();
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">Enquire About Product</DialogTitle>
          <DialogDescription>Enter your specifications for the product below.</DialogDescription>
        </DialogHeader>
        <div className="flex gap-4 mt-4 border-b pb-4">
          <div className="relative w-20 h-20 rounded-lg border bg-background flex-shrink-0 overflow-hidden">
            <Image src={product.imageUrl} alt={product.name} fill className="object-contain p-2" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{product.category}</p>
            <h2 className="text-lg font-bold font-heading">{product.name}</h2>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="e.g., 10" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="unit"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Unit</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a unit" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="SFT">SFT</SelectItem>
                                    <SelectItem value="Each Piece">Each Piece</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
             {livePreview && (
                <div className="p-3 bg-muted rounded-md text-center">
                    <p className="font-medium text-foreground">{livePreview}</p>
                </div>
            )}
            <FormField
              control={form.control}
              name="measurement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Measurements (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 24x24 Inches" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Any custom notes or requests..." className="resize-none" rows={3} {...field} />
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
      </DialogContent>
    </Dialog>
  );
}
