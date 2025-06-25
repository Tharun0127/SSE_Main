'use client';

import Link from 'next/link';
import { useState, useMemo, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowUpDown, ShoppingBag, BarChart as BarChartIcon, Package, CheckCircle2 } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { Pie, PieChart, Cell, Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { format, parseISO } from 'date-fns';
import { products } from '@/lib/products';
import { Skeleton } from '@/components/ui/skeleton';

type Enquiry = { 
  id: string;
  name: string;
  email: string;
  phone?: string;
  projectDetails?: string;
  message?: string;
  date: string;
  status: "New" | "Contacted" | "Quote Sent" | "In Production" | "Completed" | "Cancelled";
};

const StatusBadge = ({ status }: { status: Enquiry["status"] }) => {
  const variant: "default" | "secondary" | "destructive" | "outline" =
    status === "New" ? "default" :
    status === "Completed" ? "secondary" :
    status === "Cancelled" ? "destructive" :
    "outline";

  return <Badge variant={variant} className="capitalize">{status}</Badge>;
};

const lineChartConfig = {
  enquiries: {
    label: "Enquiries",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const pieChartConfig = {
  count: {
    label: "Enquiries",
  },
  active: {
    label: "Active",
    color: "hsl(var(--chart-1))",
  },
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-2))",
  },
  cancelled: {
    label: "Cancelled",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function AdminDashboard() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    // Fetch enquiries from localStorage when the component mounts
    const storedEnquiries = JSON.parse(localStorage.getItem('enquiries') || '[]');
    setEnquiries(storedEnquiries);
    setIsLoading(false);
  }, []);
  
  const totalEnquiries = enquiries.length;
  const inProduction = enquiries.filter(e => e.status === 'In Production').length;
  const completedEnquiries = enquiries.filter(e => e.status === 'Completed').length;

  const sortedEnquiries = useMemo(() => {
    return [...enquiries].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - a.date.localeCompare(b.date);
    });
  }, [sortOrder, enquiries]);

  const lineChartData = useMemo(() => {
    const enquiriesByDate = enquiries.reduce((acc, enquiry) => {
      const date = enquiry.date;
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date]++;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.keys(enquiriesByDate)
      .map(date => ({
        date,
        enquiries: enquiriesByDate[date],
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [enquiries]);

  const pieData = useMemo(() => {
    const counts = enquiries.reduce(
      (acc, enquiry) => {
        if (enquiry.status === 'Completed') {
          acc.completed += 1;
        } else if (enquiry.status === 'Cancelled') {
          acc.cancelled += 1;
        } else {
          acc.active += 1;
        }
        return acc;
      },
      { completed: 0, cancelled: 0, active: 0 }
    );
    return [
      { status: 'active', count: counts.active, fill: 'var(--color-active)' },
      { status: 'completed', count: counts.completed, fill: 'var(--color-completed)' },
      { status: 'cancelled', count: counts.cancelled, fill: 'var(--color-cancelled)' },
    ];
  }, [enquiries]);

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-muted/40 p-4 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-[124px]" />
          <Skeleton className="h-[124px]" />
          <Skeleton className="h-[124px]" />
        </div>
        <div className="mt-8 grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Skeleton className="h-[400px] xl:col-span-2" />
          <Skeleton className="h-[400px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Enquiries</CardTitle>
                        <BarChartIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalEnquiries}</div>
                        <p className="text-xs text-muted-foreground">All time customer enquiries</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">In Production</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{inProduction}</div>
                        <p className="text-xs text-muted-foreground">Orders currently being fulfilled</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{completedEnquiries}</div>
                        <p className="text-xs text-muted-foreground">Fulfilled and completed enquiries</p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                <div className="grid gap-4 md:grid-cols-2 xl:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Enquiry Status</CardTitle>
                            <CardDescription>Breakdown of all enquiries by status.</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-8">
                            <ChartContainer config={pieChartConfig} className="mx-auto aspect-square max-h-[250px]">
                                <PieChart>
                                    <ChartTooltip content={<ChartTooltipContent nameKey="count" hideLabel />} />
                                    <Pie data={pieData} dataKey="count" nameKey="status" innerRadius={60}>
                                      {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                      ))}
                                    </Pie>
                                    <ChartLegend content={<ChartLegendContent nameKey="status" />} />
                                </PieChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Enquiries Over Time</CardTitle>
                            <CardDescription>Growth of customer enquiries.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <ChartContainer config={lineChartConfig} className="min-h-[250px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                        data={lineChartData}
                                        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis 
                                            dataKey="date" 
                                            tickFormatter={(str) => format(parseISO(str), "MMM d")}
                                            stroke="#888888"
                                            fontSize={12}
                                        />
                                        <YAxis allowDecimals={false} stroke="#888888" fontSize={12}/>
                                        <ChartTooltip
                                            cursor={{ fill: 'hsl(var(--muted))' }}
                                            content={<ChartTooltipContent />}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="enquiries"
                                            stroke="hsl(var(--primary))"
                                            strokeWidth={2}
                                            dot={{ fill: "hsl(var(--primary))", r: 4 }}
                                            activeDot={{ r: 8 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-4 md:space-y-8 xl:col-span-1">
                  <Card className="h-full flex flex-col">
                      <CardHeader className="flex flex-row items-center justify-between">
                          <div>
                              <CardTitle>Recent Enquiries</CardTitle>
                              <CardDescription>Your {sortedEnquiries.length} most recent enquiries.</CardDescription>
                          </div>
                          <Button variant="outline" size="sm" onClick={toggleSortOrder}>
                              <ArrowUpDown className="mr-2 h-4 w-4" />
                              Sort
                          </Button>
                      </CardHeader>
                      <CardContent className="flex-grow overflow-hidden">
                           {sortedEnquiries.length > 0 ? (
                            <div className="h-full overflow-y-auto">
                               <Table>
                                  <TableHeader>
                                      <TableRow>
                                          <TableHead>Customer</TableHead>
                                          <TableHead className="hidden sm:table-cell">Status</TableHead>
                                          <TableHead className="text-right">Action</TableHead>
                                      </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                      {sortedEnquiries.slice(0, 6).map((enquiry) => (
                                      <TableRow key={enquiry.id}>
                                          <TableCell>
                                              <div className="font-medium">{enquiry.name}</div>
                                              <div className="hidden text-sm text-muted-foreground md:inline truncate max-w-[150px]">{enquiry.projectDetails || 'No details'}</div>
                                          </TableCell>
                                          <TableCell className="hidden sm:table-cell"><StatusBadge status={enquiry.status} /></TableCell>
                                          <TableCell className="text-right">
                                              <Button asChild size="sm" variant="outline">
                                                  <Link href={`/admin/enquiries/${enquiry.id}`}>Details <ExternalLink className="ml-2 h-3 w-3" /></Link>
                                              </Button>
                                          </TableCell>
                                      </TableRow>
                                      ))}
                                  </TableBody>
                              </Table>
                            </div>
                           ) : (
                                <div className="flex items-center justify-center h-full text-center text-muted-foreground p-8">
                                    <p>No enquiries yet. <br /> New enquiries from the contact form will appear here.</p>
                                </div>
                           )}
                      </CardContent>
                  </Card>
                   <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-lg font-heading">Product Catalog</CardTitle>
                          <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            You currently have {products.length} products. Add, edit, or view products in your catalog.
                          </p>
                          <Button asChild className="w-full">
                              <Link href="/admin/products">Manage Products</Link>
                          </Button>
                      </CardContent>
                  </Card>
                </div>
            </div>
        </main>
    </div>
  );
}
