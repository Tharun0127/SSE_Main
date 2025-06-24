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
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

// Mock data for customer enquiries
const enquiries = [
  {
    id: "ENQ-001",
    name: "Alice Johnson",
    email: "alice@example.com",
    product: "Linear Bar Grille",
    date: "2023-10-26",
    status: "New",
  },
  {
    id: "ENQ-002",
    name: "Bob Smith",
    email: "bob@example.com",
    product: "Adjustable Air Diffuser",
    date: "2023-10-25",
    status: "Quote Sent",
  },
  {
    id: "ENQ-003",
    name: "Charlie Brown",
    email: "charlie@example.com",
    product: "Motorized Fire Damper",
    date: "2023-10-24",
    status: "In Production",
  },
  {
    id: "ENQ-004",
    name: "Diana Prince",
    email: "diana@example.com",
    product: "4-Way Ceiling Diffuser",
    date: "2023-10-23",
    status: "Completed",
  },
  {
    id: "ENQ-005",
    name: "Ethan Hunt",
    email: "ethan@example.com",
    product: "Weatherproof Louvre",
    date: "2023-10-22",
    status: "Contacted",
  },
   {
    id: "ENQ-006",
    name: "Fiona Glenanne",
    email: "fiona@example.com",
    product: "Heavy-Duty Floor Grille",
    date: "2023-10-21",
    status: "Cancelled",
  },
];

type Enquiry = (typeof enquiries)[0];

const StatusBadge = ({ status }: { status: Enquiry["status"] }) => {
  const variant: "default" | "secondary" | "destructive" | "outline" =
    status === "New" ? "default" :
    status === "Completed" ? "secondary" :
    status === "Cancelled" ? "destructive" :
    "outline";

  return <Badge variant={variant}>{status}</Badge>;
};


export default function AdminPage() {
  return (
    <div className="container py-12 md:py-20">
      <Card>
        <CardHeader>
          <CardTitle>Customer Enquiries</CardTitle>
          <CardDescription>
            A list of recent enquiries from the contact form.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox aria-label="Select all" />
                  </TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enquiries.map((enquiry) => (
                  <TableRow key={enquiry.id}>
                    <TableCell>
                      <Checkbox aria-label={`Select enquiry ${enquiry.id}`} />
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{enquiry.name}</div>
                      <div className="text-sm text-muted-foreground truncate">
                        {enquiry.email}
                      </div>
                    </TableCell>
                    <TableCell>{enquiry.product}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {enquiry.date}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={enquiry.status as Enquiry['status']} />
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Mark as Contacted</DropdownMenuItem>
                          <DropdownMenuItem>Send Quote</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}