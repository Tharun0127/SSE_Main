'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc, type DocumentData } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft,
  User,
  Calendar,
  Mail,
  Phone,
  Edit,
} from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

type EnquiryStatus = "New" | "Contacted" | "Quote Sent" | "In Production" | "Completed" | "Cancelled";

type Enquiry = { 
  id: string;
  name: string;
  email: string;
  phone?: string;
  projectDetails?: string;
  message?: string;
  date: string;
  status: EnquiryStatus;
};

const ALL_STATUSES: EnquiryStatus[] = ["New", "Contacted", "Quote Sent", "In Production", "Completed", "Cancelled"];

const StatusBadge = ({ status }: { status: EnquiryStatus }) => {
  const variant: 'default' | 'secondary' | 'destructive' | 'outline' =
    status === 'New'
      ? 'default'
      : status === 'Completed'
      ? 'secondary'
      : status === 'Cancelled'
      ? 'destructive'
      : 'outline';

  return (
    <Badge variant={variant} className="capitalize">
      {status}
    </Badge>
  );
};

export default function EnquiryDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const enquiryId = params.id as string;

  const [enquiry, setEnquiry] = useState<Enquiry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<EnquiryStatus | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (enquiryId) {
      const fetchEnquiry = async () => {
        try {
          const docRef = doc(db, 'enquiries', enquiryId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = { id: docSnap.id, ...docSnap.data() } as Enquiry;
            setEnquiry(data);
            setSelectedStatus(data.status);
          } else {
             toast({ variant: 'destructive', title: 'Error', description: 'Enquiry not found.' });
             router.replace('/admin');
          }
        } catch (error) {
          console.error("Error fetching enquiry:", error);
          toast({ variant: 'destructive', title: 'Error', description: 'Failed to fetch enquiry data.' });
        } finally {
          setIsLoading(false);
        }
      };
      fetchEnquiry();
    }
  }, [enquiryId, router, toast]);

  const handleStatusUpdate = async () => {
    if (selectedStatus && enquiry) {
      try {
        const docRef = doc(db, 'enquiries', enquiry.id);
        await updateDoc(docRef, { status: selectedStatus });
        setEnquiry({ ...enquiry, status: selectedStatus });
        toast({ title: 'Success', description: 'Enquiry status has been updated.' });
      } catch (error) {
        console.error("Error updating status:", error);
        toast({ variant: 'destructive', title: 'Error', description: 'Failed to update status.' });
      }
    }
    setIsDialogOpen(false);
  };

  if (isLoading) {
    return (
      <div className="bg-secondary min-h-screen">
        <div className="container py-12 md:py-20">
            <Skeleton className="h-8 w-40 mb-8" />
            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-2 space-y-4">
                <Skeleton className="h-[300px] w-full" />
              </div>
              <div className="space-y-6">
                <Skeleton className="h-[200px] w-full" />
                <Skeleton className="h-[150px] w-full" />
              </div>
            </div>
        </div>
      </div>
    );
  }

  if (!enquiry) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <h1 className="text-2xl font-bold">Enquiry Not Found</h1>
        <p className="text-muted-foreground">
          The requested enquiry could not be found.
        </p>
        <Button asChild className="mt-6">
          <Link href="/admin">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-secondary min-h-screen">
      <div className="container py-12 md:py-20">
        <div className="mb-8">
          <Button asChild variant="outline" size="sm">
            <Link href="/admin">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Link>
          </Button>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <CardTitle className="font-heading">
                    Enquiry Details
                  </CardTitle>
                  <StatusBadge status={enquiry.status} />
                </div>
                <CardDescription>Enquiry ID: {enquiry.id}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {enquiry.projectDetails && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Project Details</h3>
                    <div className="text-muted-foreground bg-muted p-4 rounded-lg border">
                      <p className="whitespace-pre-wrap">{enquiry.projectDetails}</p>
                    </div>
                  </div>
                )}
                 {enquiry.message && (
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Customer Message</h3>
                      <div className="text-muted-foreground bg-muted p-4 rounded-lg border">
                        <p className="whitespace-pre-wrap">{enquiry.message}</p>
                      </div>
                    </div>
                 )}
                 {!enquiry.projectDetails && !enquiry.message && (
                    <div>
                      <h3 className="font-semibold text-lg mb-2">No Details Provided</h3>
                      <div className="text-muted-foreground bg-muted p-4 rounded-lg border">
                        <p>The customer did not provide project details or a message.</p>
                      </div>
                    </div>
                 )}
              </CardContent>
              <CardFooter>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Edit className="mr-2 h-4 w-4" /> Update Status
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update Enquiry Status</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <Select
                        onValueChange={(value: EnquiryStatus) =>
                          setSelectedStatus(value)
                        }
                        defaultValue={selectedStatus}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                        <SelectContent>
                          {ALL_STATUSES.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button onClick={handleStatusUpdate}>Save Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-xl">
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-foreground">
                    {enquiry.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`mailto:${enquiry.email}`}
                    className="text-primary hover:underline break-all"
                  >
                    {enquiry.email}
                  </a>
                </div>
                 {enquiry.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`tel:${enquiry.phone}`}
                        className="text-muted-foreground hover:text-primary"
                      >
                        {enquiry.phone}
                      </a>
                    </div>
                 )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-xl">
                  Enquiry Meta
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Received on {new Date(enquiry.date).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
