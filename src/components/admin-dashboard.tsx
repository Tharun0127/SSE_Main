'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
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
import { MoreHorizontal, Package, Users, BarChart as BarChartIcon, ExternalLink, ArrowUpDown, ShoppingBag } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig
} from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { format, parseISO } from 'date-fns';
import { products } from '@/lib/products';

const enquiries = [
  { id: "ENQ-001", name: "Alice Johnson", email: "alice@example.com", phone: "123-456-7890", product: "Linear Bar Grille", message: "I'd like to get a quote for 10 units for a commercial project.", date: "2023-10-26", status: "New" },
  { id: "ENQ-002", name: "Bob Smith", email: "bob@example.com", phone: "234-567-8901", product: "Adjustable Air Diffuser", message: "What are the available sizes for this diffuser?", date: "2023-10-25", status: "Quote Sent" },
  { id: "ENQ-003", name: "Charlie Brown", email: "charlie@example.com", phone: "345-678-9012", product: "Motorized Fire Damper", message: "Enquiring about bulk pricing for a new office building.", date: "2023-10-24", status: "In Production" },
  { id: "ENQ-004", name: "Diana Prince", email: "diana@example.com", phone: "456-789-0123", product: "4-Way Ceiling Diffuser", message: "Please send me the technical specifications.", date: "2023-10-23", status: "Completed" },
  { id: "ENQ-005", name: "Ethan Hunt", email: "ethan@example.com", phone: "567-890-1234", product: "Weatherproof Louvre", message: "Can this be customized to a specific color?", date: "2023-10-22", status: "Contacted" },
  { id: "ENQ-006", name: "Fiona Glenanne", email: "fiona@example.com", phone: "678-901-2345", product: "Heavy-Duty Floor Grille", message: "What is the lead time for an order of 50?", date: "2023-10-21", status: "Cancelled" },
];
type Enquiry = (typeof enquiries)[0];

const StatusBadge = ({ status }: { status: Enquiry["status"] }) => {
  const variant: "default" | "secondary" | "destructive" | "outline" =
    status === "New" ? "default" :
    status === "Completed" ? "secondary" :
    status === "Cancelled" ? "destructive" :
    "outline";

  return <Badge variant={variant} className="capitalize">{status}</Badge>;
};

// Process data for the growth chart
const enquiriesByDate = enquiries.reduce((acc, enquiry) => {
  const date = enquiry.date;
  if (!acc[date]) {
    acc[date] = 0;
  }
  acc[date]++;
  return acc;
}, {} as Record<string, number>);

const chartData = Object.keys(enquiriesByDate)
  .map(date => ({
    date,
    enquiries: enquiriesByDate[date],
  }))
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

const chartConfig = {
  enquiries: {
    label: "Enquiries",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;


export function AdminDashboard() {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const totalEnquiries = enquiries.length;
  const newEnquiries = enquiries.filter(e => e.status === 'New').length;
  const inProduction = enquiries.filter(e => e.status === 'In Production').length;

  const sortedEnquiries = useMemo(() => {
    return [...enquiries].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }, [sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
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
                        <CardTitle className="text-sm font-medium">New Enquiries</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+{newEnquiries}</div>
                        <p className="text-xs text-muted-foreground">Requires immediate attention</p>
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
            </div>
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                <Card className="xl:col-span-2">
                    <CardHeader>
                        <CardTitle>Enquiries Over Time</CardTitle>
                        <CardDescription>Growth of customer enquiries over the past week.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={chartData}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis 
                                        dataKey="date" 
                                        tickFormatter={(str) => format(parseISO(str), "MMM d")}
                                        stroke="#888888"
                                    />
                                    <YAxis allowDecimals={false} stroke="#888888"/>
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
                <div className="space-y-4 md:space-y-8">
                  <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                          <div>
                              <CardTitle>Enquiries</CardTitle>
                              <CardDescription>The {sortedEnquiries.length} most recent customer enquiries.</CardDescription>
                          </div>
                          <Button variant="outline" size="sm" onClick={toggleSortOrder}>
                              <ArrowUpDown className="mr-2 h-4 w-4" />
                              Sort by Date
                          </Button>
                      </CardHeader>
                      <CardContent>
                          <Table>
                              <TableHeader>
                                  <TableRow>
                                      <TableHead>Customer</TableHead>
                                      <TableHead>Status</TableHead>
                                      <TableHead className="text-right">Action</TableHead>
                                  </TableRow>
                              </TableHeader>
                              <TableBody>
                                  {sortedEnquiries.slice(0, 6).map((enquiry) => (
                                  <TableRow key={enquiry.id}>
                                      <TableCell>
                                          <div className="font-medium">{enquiry.name}</div>
                                          <div className="hidden text-sm text-muted-foreground md:inline">{enquiry.product}</div>
                                      </TableCell>
                                      <TableCell><StatusBadge status={enquiry.status as Enquiry['status']} /></TableCell>
                                      <TableCell className="text-right">
                                          <Button asChild size="sm" variant="outline">
                                              <Link href={`/admin/enquiries/${enquiry.id}`}>Details <ExternalLink className="ml-2 h-3 w-3" /></Link>
                                          </Button>
                                      </TableCell>
                                  </TableRow>
                                  ))}
                              </TableBody>
                          </Table>
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
