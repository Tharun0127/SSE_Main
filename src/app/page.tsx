import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ClientLogos } from "@/components/client-logos";

export default function Home() {

  return (
    <div className="flex flex-col">
      <section className="w-full py-12 md:py-20 lg:py-28 bg-gradient-to-br from-background to-blue-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                  Engineered for Excellence in Air Management
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Providing top-tier Grills, Diffusers, and Dampers for optimal HVAC performance.
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
                    Contact Us
                  </Link>
                </Button>
              </div>
            </div>
            <Image
              src="https://placehold.co/600x500.png"
              width="600"
              height="500"
              alt="Modern building with HVAC vents"
              data-ai-hint="modern architecture vents"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
            />
          </div>
        </div>
      </section>

      <section id="about-us" className="w-full py-12 md:py-16 lg:py-20 bg-card">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-semibold">About Us</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Decades of Dedication to Quality</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  At HVAC Solutions, we are committed to engineering excellence. For over 20 years, we have been a leading manufacturer of high-quality HVAC components, delivering innovative and reliable solutions for commercial and residential projects worldwide. Our mission is to enhance air management through superior design, performance, and customer service.
                </p>
              </div>
            </div>
            <Image
              alt="Factory"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
              height="400"
              src="https://placehold.co/600x400.png"
              data-ai-hint="HVAC factory"
              width="600"
            />
          </div>
        </div>
      </section>

      <ClientLogos />
    </div>
  );
}
