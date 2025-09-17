import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "./StatusBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Edit, Trash2, User, Calendar } from "lucide-react";
import { format } from "date-fns";

interface CAR {
  id: string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "pending" | "in-progress" | "completed";
  assignedTo: string;
  createdBy: string;
  createdAt: Date;
  dueDate: Date;
  actions: CARAction[];
}

interface CARAction {
  id: string;
  description: string;
  completedBy?: string;
  completedAt?: Date;
  status: "pending" | "completed";
}

//todo: remove mock functionality
const mockCARs: CAR[] = [
  {
    id: "CAR-001",
    title: "Pressure relief valve malfunction",
    description: "Safety valve failed to operate within specified parameters during testing",
    severity: "high",
    status: "pending", 
    assignedTo: "John Smith",
    createdBy: "Sarah Jones",
    createdAt: new Date("2024-01-15"),
    dueDate: new Date("2024-01-22"),
    actions: [
      {
        id: "ACT-001",
        description: "Replace faulty valve components",
        status: "pending",
      },
      {
        id: "ACT-002", 
        description: "Conduct pressure test verification",
        status: "pending",
      },
    ],
  },
  {
    id: "CAR-002",
    title: "Structural weld defect identified",
    description: "Minor weld imperfection found during routine inspection",
    severity: "medium",
    status: "in-progress",
    assignedTo: "Mike Wilson", 
    createdBy: "Lisa Chen",
    createdAt: new Date("2024-01-14"),
    dueDate: new Date("2024-01-28"),
    actions: [
      {
        id: "ACT-003",
        description: "Schedule repair work",
        completedBy: "Mike Wilson",
        completedAt: new Date("2024-01-16"),
        status: "completed",
      },
      {
        id: "ACT-004",
        description: "Perform weld repair",
        status: "pending",
      },
    ],
  },
];

export function CARPanel() {
  const [cars, setCars] = useState<CAR[]>(mockCARs);
  const [isCreating, setIsCreating] = useState(false);
  const [newCAR, setNewCAR] = useState({
    title: "",
    description: "",
    severity: "medium" as const,
    assignedTo: "",
    dueDate: "",
  });

  const handleCreateCAR = () => {
    if (!newCAR.title.trim()) return;
    
    const car: CAR = {
      id: `CAR-${String(cars.length + 1).padStart(3, '0')}`,
      title: newCAR.title,
      description: newCAR.description,
      severity: newCAR.severity,
      status: "pending",
      assignedTo: newCAR.assignedTo,
      createdBy: "Current User",
      createdAt: new Date(),
      dueDate: new Date(newCAR.dueDate),
      actions: [],
    };
    
    setCars(prev => [...prev, car]);
    setNewCAR({ title: "", description: "", severity: "medium", assignedTo: "", dueDate: "" });
    setIsCreating(false);
    console.log("Created new CAR:", car);
  };

  const updateCARStatus = (id: string, status: "pending" | "in-progress" | "completed") => {
    setCars(prev => prev.map(car => car.id === id ? { ...car, status } : car));
    console.log(`Updated CAR ${id} status to ${status}`);
  };

  const addAction = (carId: string, description: string) => {
    setCars(prev => prev.map(car => 
      car.id === carId 
        ? {
            ...car,
            actions: [
              ...car.actions,
              {
                id: `ACT-${Date.now()}`,
                description,
                status: "pending" as const,
              }
            ]
          }
        : car
    ));
    console.log(`Added action to CAR ${carId}:`, description);
  };

  const completeAction = (carId: string, actionId: string) => {
    setCars(prev => prev.map(car => 
      car.id === carId
        ? {
            ...car,
            actions: car.actions.map(action =>
              action.id === actionId
                ? {
                    ...action,
                    status: "completed" as const,
                    completedBy: "Current User",
                    completedAt: new Date(),
                  }
                : action
            )
          }
        : car
    ));
    console.log(`Completed action ${actionId} for CAR ${carId}`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Corrective Action Requests (CARs)
            <Button 
              onClick={() => setIsCreating(true)}
              data-testid="button-create-car"
            >
              <Plus className="h-4 w-4 mr-2" />
              New CAR
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isCreating && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Create New CAR</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="CAR Title"
                  value={newCAR.title}
                  onChange={(e) => setNewCAR(prev => ({ ...prev, title: e.target.value }))}
                  data-testid="input-car-title"
                />
                
                <Textarea
                  placeholder="Description of the issue"
                  value={newCAR.description}
                  onChange={(e) => setNewCAR(prev => ({ ...prev, description: e.target.value }))}
                  data-testid="textarea-car-description"
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Severity</label>
                    <select
                      value={newCAR.severity}
                      onChange={(e) => setNewCAR(prev => ({ ...prev, severity: e.target.value as any }))}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      data-testid="select-car-severity"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Assigned To</label>
                    <Input
                      placeholder="Inspector name"
                      value={newCAR.assignedTo}
                      onChange={(e) => setNewCAR(prev => ({ ...prev, assignedTo: e.target.value }))}
                      data-testid="input-car-assigned-to"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Due Date</label>
                  <Input
                    type="date"
                    value={newCAR.dueDate}
                    onChange={(e) => setNewCAR(prev => ({ ...prev, dueDate: e.target.value }))}
                    data-testid="input-car-due-date"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={handleCreateCAR} data-testid="button-save-car">
                    Create CAR
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsCreating(false)}
                    data-testid="button-cancel-car"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="space-y-4">
            {cars.map((car) => (
              <Card key={car.id} className="hover-elevate">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{car.id}</h3>
                        <StatusBadge status={car.status} />
                        <StatusBadge severity={car.severity} variant="severity" />
                      </div>
                      <h4 className="text-lg font-medium">{car.title}</h4>
                      <p className="text-muted-foreground">{car.description}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={car.status === "in-progress" ? "default" : "outline"}
                        onClick={() => updateCARStatus(car.id, "in-progress")}
                        data-testid={`button-progress-${car.id}`}
                      >
                        In Progress
                      </Button>
                      <Button
                        size="sm"
                        variant={car.status === "completed" ? "default" : "outline"}
                        onClick={() => updateCARStatus(car.id, "completed")}
                        data-testid={`button-complete-${car.id}`}
                      >
                        Complete
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>Assigned to: {car.assignedTo}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Due: {format(car.dueDate, "MMM dd, yyyy")}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h5 className="font-medium">Actions:</h5>
                    {car.actions.map((action) => (
                      <div key={action.id} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                        <div className="flex-1">
                          <p className={`text-sm ${action.status === "completed" ? "line-through text-muted-foreground" : ""}`}>
                            {action.description}
                          </p>
                          {action.completedBy && (
                            <p className="text-xs text-muted-foreground">
                              Completed by {action.completedBy} on {format(action.completedAt!, "MMM dd")}
                            </p>
                          )}
                        </div>
                        {action.status === "pending" && (
                          <Button
                            size="sm"
                            onClick={() => completeAction(car.id, action.id)}
                            data-testid={`button-complete-action-${action.id}`}
                          >
                            Complete
                          </Button>
                        )}
                      </div>
                    ))}
                    
                    <div className="flex gap-2 mt-2">
                      <Input
                        placeholder="Add new action..."
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && e.currentTarget.value.trim()) {
                            addAction(car.id, e.currentTarget.value);
                            e.currentTarget.value = "";
                          }
                        }}
                        data-testid={`input-add-action-${car.id}`}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}