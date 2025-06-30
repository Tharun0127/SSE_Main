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
      <Card className="relative min-h-[480px] w-full overflow-hidden rounded-lg group text-primary-foreground shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
        <div className="absolute inset-0">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            data-ai-hint={product.imageHint}
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
        
        <div className="relative z-10 flex h-full flex-col p-6">
          <div>
            <h3 className="font-heading text-2xl font-bold uppercase">
                {product.name}
            </h3>
            <p className="mt-1 text-sm text-primary-foreground/90">{product.description}</p>
          </div>
          
          <div className="mt-auto flex flex-col items-center text-center space-y-3">
             <Button asChild variant="secondary" className="w-full max-w-xs font-semibold">
               <Link href={`/products/${product.id}`}>View Details</Link>
             </Button>
             <Button 
                variant="outline" 
                className="w-full max-w-xs font-semibold bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                onClick={() => setIsEnquiryModalOpen(true)}
             >
                Enquire Now
            </Button>
             <p className="!mt-4 text-xs uppercase tracking-wider text-primary-foreground/80">{product.category}</p>
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
