import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { X, Plus, Calendar, MapPin, Users } from "lucide-react";

const availableInspectors = [
  { id: "1", name: "John Smith", specialties: ["Safety", "Structural"] },
  { id: "2", name: "Sarah Jones", specialties: ["Environmental", "Operations"] },
  { id: "3", name: "Mike Wilson", specialties: ["Equipment", "Maintenance"] },
  { id: "4", name: "Lisa Chen", specialties: ["Safety", "Quality"] },
];

const availableRigs = [
  { id: "1", name: "Deep Water Horizon II", location: "Gulf of Mexico" },
  { id: "2", name: "Ocean Explorer", location: "North Sea" },
  { id: "3", name: "North Sea Pioneer", location: "Norwegian Sector" },
];

export default function NewInspectionPage() {
  const [availableRigs, setAvailableRigs] = useState<{ id: string; name: string; location: string }[]>([]);
const [availableInspectors, setAvailableInspectors] = useState<{ id: string; name: string; specialties: string[] }[]>([]);

  const [selectedInspectors, setSelectedInspectors] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    rigId: "",
    scheduledDate: "",
    description: "",
    priority: "medium",
    estimatedDuration: "",
  });

    const fetchRigs = async () => {
    try {
      const res = await axios.get("https://drop-stack-backend.onrender.com/api/rigs");
      // Assuming backend returns array of rigs with _id, name, location
      const rigsData = res.data.map((rig: any) => ({
        id: rig._id,
        name: rig.name,
        location: rig.location,
      }));
      setAvailableRigs(rigsData);
    } catch (err: any) {
      console.error("Error fetching rigs:", err.response?.data || err.message);
    }
  };

  // Fetch inspectors from backend
  const fetchInspectors = async () => {
    try {
      const res = await axios.get("https://drop-stack-backend.onrender.com/api/inspectors"); // Make sure you have this route
      const inspectorsData = res.data.map((inspector: any) => ({
        id: inspector._id,
        name: inspector.name,
        specialties: inspector.specialties || [],
      }));
      setAvailableInspectors(inspectorsData);
    } catch (err: any) {
      console.error("Error fetching inspectors:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchRigs();
    fetchInspectors();
  }, []);

  const addInspector = (inspectorId: string) => {
    if (!selectedInspectors.includes(inspectorId)) {
      setSelectedInspectors([...selectedInspectors, inspectorId]);
    }
  };

  const removeInspector = (inspectorId: string) => {
    setSelectedInspectors(selectedInspectors.filter(id => id !== inspectorId));
  };

const handleSubmit = async () => {
  try {
    // Prepare payload
    const payload = {
      title: formData.title,
      priority: formData.priority.charAt(0).toUpperCase() + formData.priority.slice(1), // 'medium' -> 'Medium'
      description: formData.description,
      scheduleDate: formData.scheduledDate,
      estimatedDuration: Number(formData.estimatedDuration),
      rig: selectedRig?.name || "",
      inspectors: selectedInspectors.map(id => {
        const inspector = availableInspectors.find(i => i.id === id);
        return inspector ? inspector.name : "";
      })
    };

    // Send POST request
    const response = await axios.post("https://drop-stack-backend.onrender.com/inspections", payload);

    console.log("Inspection created successfully:", response.data);
    alert("Inspection created successfully!");

    // Reset form
    setFormData({
      title: "",
      rigId: "",
      scheduledDate: "",
      description: "",
      priority: "medium",
      estimatedDuration: "",
    });
    setSelectedInspectors([]);

  } catch (err: any) {
    console.error("Error creating inspection:", err.response?.data || err.message);
    alert("Failed to create inspection: " + (err.response?.data?.error || err.message));
  }
};

  const selectedRig = availableRigs.find(rig => rig.id === formData.rigId);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">New Inspection</h1>
        <p className="text-muted-foreground">Create and schedule a new inspection for your rigs</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Inspection Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Inspection Title</label>
              <Input
                placeholder="e.g., Weekly Safety Inspection"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                data-testid="input-inspection-title"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
              >
                <SelectTrigger data-testid="select-priority">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              placeholder="Detailed description of the inspection scope and objectives..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              data-testid="textarea-description"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Scheduled Date</label>
              <Input
                type="datetime-local"
                value={formData.scheduledDate}
                onChange={(e) => setFormData(prev => ({ ...prev, scheduledDate: e.target.value }))}
                data-testid="input-scheduled-date"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Estimated Duration (hours)</label>
              <Input
                type="number"
                placeholder="8"
                value={formData.estimatedDuration}
                onChange={(e) => setFormData(prev => ({ ...prev, estimatedDuration: e.target.value }))}
                data-testid="input-duration"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Select Rig
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={formData.rigId}
            onValueChange={(value) => setFormData(prev => ({ ...prev, rigId: value }))}
          >
            <SelectTrigger data-testid="select-rig">
              <SelectValue placeholder="Choose a rig for inspection" />
            </SelectTrigger>
            <SelectContent>
              {availableRigs.map((rig) => (
                <SelectItem key={rig.id} value={rig.id}>
                  {rig.name} - {rig.location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {selectedRig && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <h3 className="font-medium">{selectedRig.name}</h3>
              <p className="text-sm text-muted-foreground">{selectedRig.location}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Assign Inspectors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Available Inspectors</label>
            <div className="grid gap-2 md:grid-cols-2">
              {availableInspectors.map((inspector) => (
                <div
                  key={inspector.id}
                  className={`p-3 border rounded-lg cursor-pointer hover-elevate ${
                    selectedInspectors.includes(inspector.id) ? "border-primary bg-primary/5" : ""
                  }`}
                  onClick={() => 
                    selectedInspectors.includes(inspector.id) 
                      ? removeInspector(inspector.id)
                      : addInspector(inspector.id)
                  }
                  data-testid={`inspector-card-${inspector.id}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {inspector.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{inspector.name}</p>
                        <div className="flex gap-1">
                          {inspector.specialties.map((specialty) => (
                            <Badge key={specialty} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    {selectedInspectors.includes(inspector.id) && (
                      <div className="text-primary">✓</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedInspectors.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Selected Inspectors ({selectedInspectors.length})</label>
              <div className="flex flex-wrap gap-2">
                {selectedInspectors.map((inspectorId) => {
                  const inspector = availableInspectors.find(i => i.id === inspectorId);
                  return inspector ? (
                    <div key={inspectorId} className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                      {inspector.name}
                      <button
                        onClick={() => removeInspector(inspectorId)}
                        className="hover:bg-primary/20 rounded-full p-1"
                        data-testid={`remove-inspector-${inspectorId}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button
          onClick={handleSubmit}
          className="flex-1"
          disabled={!formData.title || !formData.rigId || selectedInspectors.length === 0}
          data-testid="button-create-inspection"
        >
          Create Inspection
        </Button>
        <Button variant="outline" data-testid="button-cancel">
          Cancel
        </Button>
      </div>
    </div>
  );
}