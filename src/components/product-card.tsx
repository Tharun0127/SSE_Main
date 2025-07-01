
'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { type Product } from "@/lib/products";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EnquiryModal } from "@/components/enquiry-modal";

export function ProductCard({ product }: { product: Product }) {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  return (
    <>
      <Card className="flex h-full flex-col overflow-hidden rounded-lg shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
        <Link href={`/products/${product.id}`} className="block relative aspect-video w-full group">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            data-ai-hint={product.imageHint}
          />
        </Link>
        
        <div className="flex flex-1 flex-col border-t p-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">{product.category}</p>
          <h3 className="mt-2 font-heading text-2xl font-bold text-foreground">
              {product.name}
          </h3>
          <p className="mt-3 flex-1 text-sm text-muted-foreground">{product.description}</p>
          
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="default" className="w-full font-semibold">
              <Link href={`/products/${product.id}`}>View Details</Link>
            </Button>
            <Button 
                variant="outline" 
                className="w-full font-semibold"
                onClick={() => setIsEnquiryModalOpen(true)}
            >
                Enquire Now
            </Button>
          </div>
        </div>
      </Card>
      <EnquiryModal 
        product={product} 
        isOpen={isEnquiryModalOpen} 
        onOpenChange={setIsEnquiryModalOpen}
      />
    </>
  );
}
