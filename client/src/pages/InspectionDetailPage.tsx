// InspectionDetailPage.tsx
import { ChecklistView } from "@/components/ChecklistView";
import { PhotoGallery } from "@/components/PhotoGallery";
import { CARPanel } from "@/components/CARPanel";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/StatusBadge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Save, Share, Download } from "lucide-react";

// Type for a single inspection
interface Inspection {
  _id: string;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
  scheduleDate: string;
  estimatedDuration: number;
  rig: string;
  inspectors: string[];
  status?: "pending" | "in-progress" | "completed" | "fail";
  createdAt: string;
  updatedAt: string;
}

// Props type
interface InspectionDetailPageProps {
  inspections?: Inspection | null;
}

// Component as a normal function
export default function InspectionDetailPage({ inspections = null }: InspectionDetailPageProps) {
  if (!inspections) return <p>No inspection data available.</p>;

  const {
    title,
    description,
    priority,
    scheduleDate,
    estimatedDuration,
    rig,
    inspectors,
    status,
    createdAt,
    
  } = inspections;

  const formatDate = (dateStr?: string) => dateStr ? new Date(dateStr).toLocaleDateString() : "N/A";

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold">{title}</h1>
                <StatusBadge status={status} />
                <StatusBadge severity={priority.toLowerCase() as "low" | "medium" | "high"} variant="severity" />

              </div>
              <p className="text-muted-foreground mb-4">{description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="font-medium">Created</p>
                  <p className="text-muted-foreground">{formatDate(createdAt)}</p>
                </div>
                <div>
                  <p className="font-medium">Due Date</p>
                  <p className="text-muted-foreground">{formatDate(scheduleDate)}</p>
                </div>
                <div>
                  <p className="font-medium">Duration</p>
                  <p className="text-muted-foreground">{estimatedDuration} hrs</p>
                </div>
                <div>
                  <p className="font-medium">Rig</p>
                  <p className="text-muted-foreground">{rig}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <h3 className="font-medium mb-2">Assigned Inspectors</h3>
            <div className="flex gap-2 flex-wrap">
              {inspectors.length > 0 ? (
                inspectors.map((inspector) => (
                  <div key={inspector} className="flex items-center gap-2 bg-muted p-2 rounded-lg">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {inspector.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{inspector}</span>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No inspectors assigned.</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
