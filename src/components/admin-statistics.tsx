'use client';

import { useState, useMemo, useEffect } from 'react';
import { collection, getDocs, orderBy, query, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
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
import { Pie, PieChart, Cell, Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { format, parseISO } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

type Enquiry = { 
  id: string; 
  date: string;
  status: "New" | "Contacted" | "Quote Sent" | "In Production" | "Completed" | "Cancelled";
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


export function AdminStatistics() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
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
    ].filter(item => item.count > 0);
  }, [enquiries]);


  if (isLoading) {
    return (
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Skeleton className="h-[400px] xl:col-span-2" />
          <Skeleton className="h-[400px]" />
        </div>
    );
  }

  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <div className="grid gap-4 lg:grid-cols-2 xl:col-span-3">
            <Card>
                <CardHeader>
                    <CardTitle>Enquiry Status</CardTitle>
                    <CardDescription>Breakdown of all enquiries by status.</CardDescription>
                </CardHeader>
                <CardContent className="pb-8">
                    <ChartContainer config={pieChartConfig} className="mx-auto aspect-square max-h-[250px]">
                        {pieData.length > 0 ? (
                            <PieChart>
                                <ChartTooltip content={<ChartTooltipContent nameKey="count" hideLabel />} />
                                <Pie data={pieData} dataKey="count" nameKey="status" innerRadius={60}>
                                {pieData.map((entry) => (
                                    <Cell key={`cell-${entry.status}`} fill={entry.fill} />
                                ))}
                                </Pie>
                                <ChartLegend content={<ChartLegendContent nameKey="status" />} />
                            </PieChart>
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                                No data to display
                            </div>
                        )}
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
                            {lineChartData.length > 0 ? (
                                <LineChart
                                    data={lineChartData}
                                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis 
                                        dataKey="date" 
                                        tickFormatter={(str) => format(parseISO(str), "MMM d")}
                                        fontSize={12}
                                    />
                                    <YAxis allowDecimals={false} fontSize={12}/>
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
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                                    No data to display
                                </div>
                            )}
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
