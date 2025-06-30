
'use client';

import { useState, useMemo, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { products as staticProducts, type Product } from '@/lib/products';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { Pie, PieChart, Cell, Bar, BarChart, Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { format, parseISO } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

type Enquiry = {
  id: string;
  date: string;
  projectDetails?: string;
  status: "New" | "Contacted" | "Quote Sent" | "In Production" | "Completed" | "Cancelled";
};

const lineChartConfig = {
  enquiries: { label: "Enquiries", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig;

const funnelChartConfig = {
  count: { label: "Count", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig;

const categoryChartConfig = {
    count: { label: "Enquiries" },
    Grills: { label: "Grills", color: "hsl(var(--chart-1))" },
    Diffusers: { label: "Diffusers", color: "hsl(var(--chart-2))" },
    Dampers: { label: "Dampers", color: "hsl(var(--chart-3))" },
    Others: { label: "Others", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig;

const topProductsChartConfig = {
    count: { label: "Enquiries", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;

export function AdminStatistics() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [allProducts, setAllProducts] = useState<Map<number, Product>>(new Map());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        setIsLoading(true);
        try {
            // Fetch products first and create a map
            const productMap = new Map<number, Product>();
            staticProducts.forEach(p => productMap.set(p.id, p));
            const productSnapshot = await getDocs(collection(db, "products"));
            productSnapshot.forEach((doc) => {
                const firestoreProduct = doc.data() as Product;
                productMap.set(firestoreProduct.id, firestoreProduct);
            });
            setAllProducts(productMap);

            // Fetch enquiries
            const enquiriesQuery = query(collection(db, "enquiries"), orderBy("date", 'desc'));
            const enquirySnapshot = await getDocs(enquiriesQuery);
            const fetchedEnquiries = enquirySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Enquiry[];
            setEnquiries(fetchedEnquiries);

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };
    fetchData();
  }, []);

  const { funnelData, categoryData, topProductsData, lineChartData } = useMemo(() => {
    if (!enquiries.length || !allProducts.size) {
        return { funnelData: [], categoryData: [], topProductsData: [], lineChartData: [] };
    }

    // Line Chart Data
    const enquiriesByDate = enquiries.reduce((acc, enquiry) => {
        const date = enquiry.date;
        acc[date] = (acc[date] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
    const lineChartData = Object.keys(enquiriesByDate)
        .map(date => ({
            date,
            enquiries: enquiriesByDate[date],
        }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Funnel Data
    const STATUS_ORDER: Enquiry['status'][] = ["New", "Contacted", "Quote Sent", "In Production", "Completed", "Cancelled"];
    const funnelCounts = STATUS_ORDER.reduce((acc, status) => {
        acc[status] = 0;
        return acc;
    }, {} as Record<Enquiry['status'], number>);
    enquiries.forEach(e => funnelCounts[e.status]++);
    const funnelData = STATUS_ORDER.map(status => ({ name: status, count: funnelCounts[status] }));

    // Category & Top Products Data
    const categoryCounts: Record<Product['category'], number> = { Grills: 0, Diffusers: 0, Dampers: 0, Others: 0 };
    const productCounts = new Map<number, number>();
    const productIDRegex = /Product:.*?\(ID: (\d+)\)/g;

    enquiries.forEach(enquiry => {
        if (enquiry.projectDetails) {
            const matches = [...enquiry.projectDetails.matchAll(productIDRegex)];
            const uniqueProductIdsInEnquiry = new Set(matches.map(m => parseInt(m[1], 10)));
            
            uniqueProductIdsInEnquiry.forEach(id => {
                productCounts.set(id, (productCounts.get(id) || 0) + 1);
                const product = allProducts.get(id);
                if (product) {
                    categoryCounts[product.category]++;
                }
            });
        }
    });

    const categoryData = Object.entries(categoryCounts).map(([name, count]) => ({
        name,
        count,
        fill: `var(--color-${name})`
    })).filter(item => item.count > 0);

    const topProductsData = Array.from(productCounts.entries())
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([id, count]) => ({
            name: allProducts.get(id)?.name.substring(0, 20) + (allProducts.get(id)!.name.length > 20 ? '...' : '') || `ID ${id}`,
            count,
        })).reverse();

    return { funnelData, categoryData, topProductsData, lineChartData };
  }, [enquiries, allProducts]);

  if (isLoading) {
    return (
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
            <Skeleton className="h-[350px]" />
            <Skeleton className="h-[350px]" />
            <Skeleton className="h-[350px]" />
            <Skeleton className="h-[350px]" />
        </div>
    );
  }

  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Enquiries Over Time</CardTitle>
                <CardDescription>Growth of customer enquiries.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={lineChartConfig} className="min-h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    {lineChartData.length > 0 ? (
                        <LineChart
                            data={lineChartData}
                            margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                                dataKey="date" 
                                tickFormatter={(str) => format(parseISO(str), "MMM d")}
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis allowDecimals={false} fontSize={12} tickLine={false} axisLine={false} />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent />}
                            />
                            <Line
                                type="monotone"
                                dataKey="enquiries"
                                stroke="hsl(var(--primary))"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    ) : (
                        <div className="flex h-full min-h-[250px] w-full items-center justify-center text-muted-foreground">
                            No enquiry data yet.
                        </div>
                    )}
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Enquiry Funnel</CardTitle>
                <CardDescription>Distribution of enquiries across different stages.</CardDescription>
            </CardHeader>
            <CardContent>
                 <ChartContainer config={funnelChartConfig} className="min-h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       {funnelData.some(d => d.count > 0) ? (
                            <BarChart data={funnelData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={12} dx={-5} />
                                <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} content={<ChartTooltipContent hideLabel />} />
                                <Bar dataKey="count" fill="hsl(var(--primary))" radius={4} />
                            </BarChart>
                       ) : (
                            <div className="flex h-full min-h-[250px] w-full items-center justify-center text-muted-foreground">
                                No enquiry data yet.
                            </div>
                       )}
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Enquiries by Category</CardTitle>
                <CardDescription>Breakdown of product enquiries by category.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={categoryChartConfig} className="mx-auto aspect-square max-h-[250px]">
                    {categoryData.length > 0 ? (
                        <PieChart>
                            <ChartTooltip content={<ChartTooltipContent nameKey="count" hideLabel />} />
                            <Pie data={categoryData} dataKey="count" nameKey="name">
                            {categoryData.map((entry) => (
                                <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                            ))}
                            </Pie>
                            <ChartLegend content={<ChartLegendContent nameKey="name" />} />
                        </PieChart>
                    ) : (
                         <div className="flex h-full min-h-[250px] w-full items-center justify-center text-muted-foreground">
                            No products have been enquired about.
                        </div>
                    )}
                </ChartContainer>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Top 5 Enquired Products</CardTitle>
                <CardDescription>The most frequently enquired-about products.</CardDescription>
            </CardHeader>
            <CardContent>
                 <ChartContainer config={topProductsChartConfig} className="min-h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        {topProductsData.length > 0 ? (
                            <BarChart data={topProductsData} layout="vertical" margin={{ top: 5, right: 20, left: 50, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={12} dx={-5} />
                                <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} content={<ChartTooltipContent hideLabel />} />
                                <Bar dataKey="count" fill="hsl(var(--chart-2))" radius={4} />
                            </BarChart>
                        ) : (
                            <div className="flex h-full min-h-[250px] w-full items-center justify-center text-muted-foreground">
                                No products have been enquired about.
                            </div>
                        )}
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    </div>
  );
}

    