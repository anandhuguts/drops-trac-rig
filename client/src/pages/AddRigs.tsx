import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Edit } from "lucide-react";
import { useRigs, useAddRig, useUpdateRig, useDeleteRig } from "./../hooks/use-rigs.ts";

interface Rig {
  _id: string;
  name: string;
  location: string;
}

export default function AddRigs() {
  const { data: rigs = [], isLoading, error } = useRigs();
  const addRig = useAddRig();
  const updateRig = useUpdateRig();
  const deleteRig = useDeleteRig();

  const [formData, setFormData] = useState({ name: "", location: "" });
  const [editingRigId, setEditingRigId] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!formData.name || !formData.location) {
      alert("Please enter both name and location.");
      return;
    }

    try {
      if (editingRigId) {
        await updateRig.mutateAsync({ id: editingRigId, data: formData });
        setEditingRigId(null);
      } else {
        await addRig.mutateAsync(formData);
      }
      setFormData({ name: "", location: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to save rig");
    }
  };

  const handleEdit = (rig: Rig) => {
    setFormData({ name: rig.name, location: rig.location });
    setEditingRigId(rig._id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this rig?")) return;
    try {
      await deleteRig.mutateAsync(id);
    } catch (err) {
      console.error(err);
      alert("Failed to delete rig");
    }
  };

if (isLoading)
  return (
    <div className="flex items-center justify-center h-[50vh]">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
    </div>
  );

if (error)
  return (
    <div className="flex items-center justify-center h-[50vh] text-red-500">
      Error loading rigs
    </div>
  );


  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>{editingRigId ? "Edit Rig" : "Add New Rig"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Rig Name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          />
          <Input
            placeholder="Location"
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
          />
          <div className="flex gap-4 mt-2">
            <Button onClick={handleSubmit} className="flex-1">
              {editingRigId ? "Update Rig" : "Add Rig"}
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                setFormData({ name: "", location: "" });
                setEditingRigId(null);
              }}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Rigs List */}
      <div className="space-y-2">
        {(rigs as Rig[]).map((rig) => (
          <Card key={rig._id} className="p-3 flex justify-between items-center">
            <div>
              <p className="font-medium">{rig.name}</p>
              <p className="text-sm text-muted-foreground">{rig.location}</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => handleEdit(rig)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(rig._id)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}