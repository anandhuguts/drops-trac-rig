import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Edit, Download } from "lucide-react";
import { format } from "date-fns";

//todo: remove mock functionality
const mockInspections = [
  {
    id: "INS-001",
    rigName: "Deep Water Horizon II",
    inspectors: [{ name: "John Smith", avatar: null }, { name: "Sarah Jones", avatar: null }],
    date: new Date("2024-01-15"),
    status: "completed" as const,
    severity: "medium" as const,
    completionRate: 95,
    issues: 3,
  },
  {
    id: "INS-002", 
    rigName: "Ocean Explorer",
    inspectors: [{ name: "Mike Wilson", avatar: null }],
    date: new Date("2024-01-14"),
    status: "in-progress" as const,
    severity: "low" as const,
    completionRate: 65,
    issues: 1,
  },
  {
    id: "INS-003",
    rigName: "North Sea Pioneer",
    inspectors: [{ name: "Lisa Chen", avatar: null }, { name: "David Brown", avatar: null }],
    date: new Date("2024-01-13"),
    status: "fail" as const,
    severity: "high" as const,
    completionRate: 100,
    issues: 8,
  },
];

export function InspectionTable() {
  const handleView = (id: string) => {
    console.log("View inspection:", id);
  };

  const handleEdit = (id: string) => {
    console.log("Edit inspection:", id);
  };

  const handleDownload = (id: string) => {
    console.log("Download inspection report:", id);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Inspection ID</TableHead>
            <TableHead>Rig</TableHead>
            <TableHead>Inspectors</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Completion</TableHead>
            <TableHead>Issues</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockInspections.map((inspection) => (
            <TableRow 
              key={inspection.id} 
              className="hover-elevate"
              data-testid={`row-inspection-${inspection.id}`}
            >
              <TableCell className="font-medium">{inspection.id}</TableCell>
              <TableCell>{inspection.rigName}</TableCell>
              <TableCell>
                <div className="flex -space-x-2">
                  {inspection.inspectors.map((inspector, idx) => (
                    <Avatar key={idx} className="h-8 w-8 border-2 border-background">
                      <AvatarImage src={inspector.avatar || undefined} />
                      <AvatarFallback className="text-xs">
                        {inspector.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </TableCell>
              <TableCell>{format(inspection.date, "MMM dd, yyyy")}</TableCell>
              <TableCell>
                <StatusBadge status={inspection.status} />
              </TableCell>
              <TableCell>
                <StatusBadge severity={inspection.severity} variant="severity" />
              </TableCell>
              <TableCell>{inspection.completionRate}%</TableCell>
              <TableCell>
                <span className={inspection.issues > 5 ? "text-destructive font-medium" : ""}>
                  {inspection.issues}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    size="icon" 
                    variant="ghost"
                    onClick={() => handleView(inspection.id)}
                    data-testid={`button-view-${inspection.id}`}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost"
                    onClick={() => handleEdit(inspection.id)}
                    data-testid={`button-edit-${inspection.id}`}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost"
                    onClick={() => handleDownload(inspection.id)}
                    data-testid={`button-download-${inspection.id}`}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}