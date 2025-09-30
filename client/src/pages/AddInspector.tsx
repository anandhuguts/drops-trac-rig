import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Edit } from "lucide-react";
import {
  useInspectors,
  useAddInspector,
  useUpdateInspector,
  useDeleteInspector,
} from "../hooks/useInspector.ts";

interface Inspector {
  _id: string;
  name: string;
  specialties: string[];
}

export default function AddInspector() {
  const [formData, setFormData] = useState({ name: "", specialties: "" });
  const [specialtiesList, setSpecialtiesList] = useState<string[]>([]);
  const [editingInspector, setEditingInspector] = useState<string | null>(null);

  // React Query hooks
  const { data: inspectors = [], isLoading } = useInspectors();
  const addInspector = useAddInspector();
  const updateInspector = useUpdateInspector();
  const deleteInspector = useDeleteInspector();

  const addSpecialty = () => {
    const specialty = formData.specialties.trim();
    if (specialty && !specialtiesList.includes(specialty)) {
      setSpecialtiesList([...specialtiesList, specialty]);
      setFormData((prev) => ({ ...prev, specialties: "" }));
    }
  };

  const removeSpecialty = (specialty: string) => {
    setSpecialtiesList(specialtiesList.filter((s) => s !== specialty));
  };

  const handleSubmit = () => {
    if (!formData.name || specialtiesList.length === 0) {
      alert("Please enter a name and at least one specialty.");
      return;
    }

    const payload = { name: formData.name, specialties: specialtiesList };

    if (editingInspector) {
      updateInspector.mutate({ id: editingInspector, data: payload });
      alert("Inspector updated successfully!");
    } else {
      addInspector.mutate(payload);
      alert("Inspector added successfully!");
    }

    setFormData({ name: "", specialties: "" });
    setSpecialtiesList([]);
    setEditingInspector(null);
  };

  const handleEdit = (inspector: Inspector) => {
    setEditingInspector(inspector._id);
    setFormData({ name: inspector.name, specialties: "" });
    setSpecialtiesList(inspector.specialties);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this inspector?")) {
      deleteInspector.mutate(id);
      alert("Inspector deleted successfully!");
    }
  };

  if (isLoading) return  <div className="flex items-center justify-center h-[50vh]">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
    </div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Add Inspectors</h1>
        <p className="text-muted-foreground">
          Manage and add new inspectors to the system
        </p>
      </div>

      {/* Add / Edit Inspector Form */}
      <Card>
        <CardHeader>
          <CardTitle>
            {editingInspector ? "Edit Inspector" : "Add Inspector"} Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Inspector Name</label>
            <Input
              placeholder="e.g., John Smith"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Specialties</label>
            <div className="flex gap-2">
              <Input
                placeholder="e.g., Safety"
                value={formData.specialties}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, specialties: e.target.value }))
                }
              />
              <Button onClick={addSpecialty}>Add</Button>
            </div>
            {specialtiesList.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {specialtiesList.map((specialty) => (
                  <div
                    key={specialty}
                    className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                  >
                    {specialty}
                    <button
                      onClick={() => removeSpecialty(specialty)}
                      className="hover:bg-primary/20 rounded-full p-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-4 mt-4">
            <Button onClick={handleSubmit} className="flex-1">
              {editingInspector ? "Update Inspector" : "Add Inspector"}
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                setFormData({ name: "", specialties: "" });
                setSpecialtiesList([]);
                setEditingInspector(null);
              }}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* List of Inspectors */}
      <div className="space-y-4">
        {inspectors.map((inspector: Inspector) => (
          <Card key={inspector._id} className="p-4">
            <div className="flex justify-between items-center">
              <div className="font-medium text-lg">{inspector.name}</div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(inspector)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(inspector._id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {inspector.specialties.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {inspector.specialties.map((specialty) => (
                  <Badge key={specialty} variant="secondary" className="text-sm">
                    {specialty}
                  </Badge>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
