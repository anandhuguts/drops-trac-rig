import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { X, Calendar, MapPin, Users } from "lucide-react";

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

  // Function to get token from localStorage
  const getToken = () => localStorage.getItem("token") || "";

  const fetchRigs = async () => {
    try {
      const token = getToken();
      const res = await axios.get("https://drop-stack-backend.onrender.com/api/rigs", {
        headers: { Authorization: `Bearer ${token}` },
      });
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

  const fetchInspectors = async () => {
    try {
      const token = getToken();
      const res = await axios.get("https://drop-stack-backend.onrender.com/api/inspectors", {
        headers: { Authorization: `Bearer ${token}` },
      });
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

  const selectedRig = availableRigs.find(rig => rig.id === formData.rigId);

  const handleSubmit = async () => {
    try {
      const token = getToken();
      const payload = {
        title: formData.title,
        priority: formData.priority.charAt(0).toUpperCase() + formData.priority.slice(1),
        description: formData.description,
        scheduleDate: formData.scheduledDate,
        estimatedDuration: Number(formData.estimatedDuration),
        rig: selectedRig?.name || "",
        inspectors: selectedInspectors.map(id => availableInspectors.find(i => i.id === id)?.name || ""),
      };

      const response = await axios.post(
        "https://drop-stack-backend.onrender.com/inspections",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Inspection created successfully:", response.data);
      alert("Inspection created successfully!");

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

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">New Inspection</h1>
        <p className="text-muted-foreground">Create and schedule a new inspection for your rigs</p>
      </div>

      {/* Inspection Details */}
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
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
              >
                <SelectTrigger>
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
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Scheduled Date</label>
              <Input
                type="datetime-local"
                value={formData.scheduledDate}
                onChange={(e) => setFormData(prev => ({ ...prev, scheduledDate: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Estimated Duration (hours)</label>
              <Input
                type="number"
                placeholder="8"
                value={formData.estimatedDuration}
                onChange={(e) => setFormData(prev => ({ ...prev, estimatedDuration: e.target.value }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Select Rig */}
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
            <SelectTrigger>
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

      {/* Assign Inspectors */}
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
                  onClick={() => selectedInspectors.includes(inspector.id) ? removeInspector(inspector.id) : addInspector(inspector.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{inspector.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{inspector.name}</p>
                        <div className="flex gap-1">
                          {inspector.specialties.map(s => (
                            <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    {selectedInspectors.includes(inspector.id) && <div className="text-primary">✓</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedInspectors.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Selected Inspectors ({selectedInspectors.length})</label>
              <div className="flex flex-wrap gap-2">
                {selectedInspectors.map(id => {
                  const inspector = availableInspectors.find(i => i.id === id);
                  return inspector ? (
                    <div key={id} className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                      {inspector.name}
                      <button onClick={() => removeInspector(id)} className="hover:bg-primary/20 rounded-full p-1">
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
        <Button onClick={handleSubmit} className="flex-1" disabled={!formData.title || !formData.rigId || selectedInspectors.length === 0}>
          Create Inspection
        </Button>
        <Button variant="outline">Cancel</Button>
      </div>
    </div>
  );
}
