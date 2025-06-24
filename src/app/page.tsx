import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { products } from "@/lib/products";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const featuredProducts = products.filter((product) => product.featured);

  return (
    <div className="flex flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-background to-blue-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                  Stay Cool, Live Better
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Discover our innovative range of air cooling solutions designed for ultimate comfort and efficiency.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="font-semibold">
                  <Link href="/products">
                    Explore Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="font-semibold">
                  <Link href="/contact">
                    Contact Sales
                  </Link>
                </Button>
              </div>
            </div>
            <Image
              src="https://placehold.co/600x500.png"
              width="600"
              height="500"
              alt="Hero Product"
              data-ai-hint="modern living room"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
            />
          </div>
        </div>
      </section>

      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-semibold">Featured Products</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Cooling You Can Count On</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Check out our top-rated products, loved by customers for their performance, design, and reliability.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3 pt-12">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="h-full flex flex-col transition-shadow duration-300 hover:shadow-xl">
                <CardHeader className="p-0">
                  <div className="aspect-video relative">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="rounded-t-lg object-cover"
                      data-ai-hint={product.imageHint}
                    />
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow p-6">
                  <CardTitle className="font-headline mb-2">{product.name}</CardTitle>
                  <CardDescription className="flex-grow">{product.description}</CardDescription>
                  <p className="text-lg font-semibold mt-4">{product.price}</p>
                   <Button asChild className="mt-4 w-full font-semibold">
                    <Link href="/products">View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
