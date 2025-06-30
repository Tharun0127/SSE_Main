'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Skeleton } from '@/components/ui/skeleton';

type Enquiry = { 
  id: string; // Firestore document ID
  name: string;
  email: string;
  date: string;
  timestamp: Timestamp;
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

export default function EnquiriesPage() {
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          setIsLoading(true);
          try {
            const enquiriesQuery = query(collection(db, "enquiries"), orderBy("timestamp", 'desc'));
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
    
      if (isLoading) {
        return (
            <Card>
                <CardHeader>
                  <Skeleton className="h-8 w-40" />
                  <Skeleton className="h-4 w-64 mt-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-80 w-full" />
                </CardContent>
            </Card>
        );
      }

      return (
        <Card>
            <CardHeader>
                <CardTitle>All Enquiries</CardTitle>
                <CardDescription>A list of all customer enquiries received.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="md:hidden space-y-4">
                  {enquiries.map((enquiry) => (
                    <Card key={enquiry.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-grow pr-4">
                          <div className="font-medium">{enquiry.name}</div>
                          <div className="text-sm text-muted-foreground truncate">{enquiry.email}</div>
                        </div>
                        <Button asChild size="sm" variant="outline" className="flex-shrink-0">
                          <Link href={`/admin/enquiries/${enquiry.id}`}>Details</Link>
                        </Button>
                      </div>
                      <div className="mt-3 pt-3 border-t flex items-center justify-between text-sm">
                          <StatusBadge status={enquiry.status} />
                          <span className="text-muted-foreground">{new Date(enquiry.date).toLocaleDateString()}</span>
                      </div>
                    </Card>
                  ))}
                </div>
                <div className="hidden md:block">
                  <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Received</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {enquiries.map((enquiry) => (
                        <TableRow key={enquiry.id}>
                            <TableCell className="font-medium">{enquiry.name}</TableCell>
                            <TableCell className="text-muted-foreground">{enquiry.email}</TableCell>
                            <TableCell><StatusBadge status={enquiry.status} /></TableCell>
                            <TableCell className="text-muted-foreground">{new Date(enquiry.date).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">
                                <Button asChild size="sm" variant="outline">
                                    <Link href={`/admin/enquiries/${enquiry.id}`}>View Details <ExternalLink className="ml-2 h-3 w-3" /></Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
                 {enquiries.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>No enquiries found.</p>
                  </div>
                )}
            </CardContent>
        </Card>
      );
}
