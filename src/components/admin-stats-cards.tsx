'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart as BarChartIcon, Package, CheckCircle2 } from "lucide-react";

type Enquiry = { 
  status: "New" | "Contacted" | "Quote Sent" | "In Production" | "Completed" | "Cancelled";
};

type Stats = {
  total: number;
  inProduction: number;
  completed: number;
};

export function AdminStatsCards() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "enquiries"));
        const enquiries = querySnapshot.docs.map(doc => doc.data()) as Enquiry[];

        const total = enquiries.length;
        const inProduction = enquiries.filter(e => e.status === 'In Production').length;
        const completed = enquiries.filter(e => e.status === 'Completed').length;

        setStats({ total, inProduction, completed });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading || !stats) {
    return (
      <div className="grid gap-4 px-4 sm:px-6 md:grid-cols-3 lg:gap-8">
        <Skeleton className="h-[124px]" />
        <Skeleton className="h-[124px]" />
        <Skeleton className="h-[124px]" />
      </div>
    );
  }

  return (
    <div className="grid gap-4 px-4 sm:px-6 md:grid-cols-3 lg:gap-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Enquiries</CardTitle>
            <BarChartIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">All time customer enquiries</p>
        </CardContent>
      </Card>
      <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Production</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
              <div className="text-2xl font-bold">{stats.inProduction}</div>
              <p className="text-xs text-muted-foreground">Orders currently being fulfilled</p>
          </CardContent>
      </Card>
      <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
              <div className="text-2xl font-bold">{stats.completed}</div>
              <p className="text-xs text-muted-foreground">Fulfilled and completed enquiries</p>
          </CardContent>
      </Card>
    </div>
  );
}
