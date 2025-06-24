import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Package, Calendar, Mail, Phone, Edit } from "lucide-react";
import Link from 'next/link';

// Mock data - In a real app, this would be fetched from a database
const enquiries = [
  { id: "ENQ-001", name: "Alice Johnson", email: "alice@example.com", phone: "123-456-7890", product: "Linear Bar Grille", message: "I'd like to get a quote for 10 units for a commercial project. What is the lead time for this order?", date: "2023-10-26", status: "New" },
  { id: "ENQ-002", name: "Bob Smith", email: "bob@example.com", phone: "234-567-8901", product: "Adjustable Air Diffuser", message: "What are the available sizes for this diffuser? Can you send me a spec sheet?", date: "2023-10-25", status: "Quote Sent" },
  { id: "ENQ-003", name: "Charlie Brown", email: "charlie@example.com", phone: "345-678-9012", product: "Motorized Fire Damper", message: "Enquiring about bulk pricing for a new office building. We need around 50 dampers.", date: "2023-10-24", status: "In Production" },
  { id: "ENQ-004", name: "Diana Prince", email: "diana@example.com", phone: "456-789-0123", product: "4-Way Ceiling Diffuser", message: "Please send me the technical specifications for the 4-way diffuser.", date: "2023-10-23", status: "Completed" },
  { id: "ENQ-005", name: "Ethan Hunt", email: "ethan@example.com", phone: "567-890-1234", product: "Weatherproof Louvre", message: "Can this be customized to a specific RAL color? We need a dark bronze finish.", date: "2023-10-22", status: "Contacted" },
  { id: "ENQ-006", name: "Fiona Glenanne", email: "fiona@example.com", phone: "678-901-2345", product: "Heavy-Duty Floor Grille", message: "What is the lead time for an order of 50 heavy-duty floor grilles?", date: "2023-10-21", status: "Cancelled" },
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


// In a real app, you'd fetch a single enquiry based on the ID.
// For this example, we'll find it in our mock data.
function getEnquiryById(id: string) {
  return enquiries.find(e => e.id === id);
}

export default function EnquiryDetailsPage({ params }: { params: { id: string } }) {
  const enquiry = getEnquiryById(params.id);

  if (!enquiry) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
            <h1 className="text-2xl font-bold">Enquiry Not Found</h1>
            <p className="text-muted-foreground">The requested enquiry could not be found.</p>
            <Button asChild className="mt-6">
                <Link href="/admin"><ArrowLeft className="mr-2" /> Back to Dashboard</Link>
            </Button>
        </div>
    );
  }

  return (
    <div className="bg-muted/40 min-h-screen">
      <div className="container py-12 md:py-20">
          <div className="mb-8">
              <Button asChild variant="outline" size="sm">
                  <Link href="/admin"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard</Link>
              </Button>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-2">
                  <Card>
                      <CardHeader>
                          <CardTitle className="flex justify-between items-center font-heading">
                              <span>Enquiry Details</span>
                              <StatusBadge status={enquiry.status as Enquiry['status']} />
                          </CardTitle>
                          <CardDescription>Enquiry ID: {enquiry.id}</CardDescription>
                      </CardHeader>
                      <CardContent>
                          <h3 className="font-semibold text-lg mb-4">Customer Message</h3>
                          <div className="text-muted-foreground bg-muted p-4 rounded-lg border">
                            <p className="whitespace-pre-wrap">{enquiry.message}</p>
                          </div>
                      </CardContent>
                      <CardFooter>
                          <Button><Edit className="mr-2 h-4 w-4" /> Update Status</Button>
                      </CardFooter>
                  </Card>
              </div>
              <div className="space-y-6">
                  <Card>
                      <CardHeader>
                          <CardTitle className="font-heading text-xl">Customer Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 text-sm">
                          <div className="flex items-center gap-3">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium text-foreground">{enquiry.name}</span>
                          </div>
                          <div className="flex items-center gap-3">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <a href={`mailto:${enquiry.email}`} className="text-primary hover:underline">{enquiry.email}</a>
                          </div>
                          <div className="flex items-center gap-3">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <a href={`tel:${enquiry.phone}`} className="text-muted-foreground hover:text-primary">{enquiry.phone}</a>
                          </div>
                      </CardContent>
                  </Card>
                  <Card>
                      <CardHeader>
                          <CardTitle className="font-heading text-xl">Enquiry Meta</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 text-sm">
                          <div className="flex items-center gap-3">
                              <Package className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium text-foreground">{enquiry.product}</span>
                          </div>
                          <div className="flex items-center gap-3">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Received on {enquiry.date}</span>
                          </div>
                      </CardContent>
                  </Card>
              </div>
          </div>
      </div>
    </div>
  );
}
