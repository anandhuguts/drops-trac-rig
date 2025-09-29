import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Edit } from "lucide-react";

export default function AddRigs() {
  const [formData, setFormData] = useState({ name: "", location: "" });
  const [rigs, setRigs] = useState<any[]>([]);
  const [editingRigId, setEditingRigId] = useState<string | null>(null);

  // Fetch all rigs
  const fetchRigs = async () => {
    try {
      const res = await axios.get("https://drop-stack-backend.onrender.com/api/rigs");
      setRigs(res.data);
    } catch (err: any) {
      console.error("Error fetching rigs:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchRigs();
  }, []);

  // Add or Update rig
  const handleSubmit = async () => {
    if (!formData.name || !formData.location) {
      alert("Please enter both name and location.");
      return;
    }

    try {
      if (editingRigId) {
        await axios.put(`https://drop-stack-backend.onrender.com/rigs/${editingRigId}`, formData);
        alert("Rig updated successfully!");
      } else {
        await axios.post("https://drop-stack-backend.onrender.com/rigs", formData);
        alert("Rig added successfully!");
      }

      setFormData({ name: "", location: "" });
      setEditingRigId(null);
      fetchRigs();
    } catch (err: any) {
      console.error("Error adding/updating rig:", err.response?.data || err.message);
      alert("Failed to add/update rig: " + (err.response?.data?.error || err.message));
    }
  };

  // Edit rig
  const handleEdit = (rig: any) => {
    setFormData({ name: rig.name, location: rig.location });
    setEditingRigId(rig._id);
  };

  // Delete rig
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this rig?")) return;
    try {
      await axios.delete(`https://drop-stack-backend.onrender.com/api/rigs/${id}`);
      alert("Rig deleted successfully!");
      fetchRigs();
    } catch (err: any) {
      console.error("Error deleting rig:", err.response?.data || err.message);
      alert("Failed to delete rig: " + (err.response?.data?.error || err.message));
    }
  };

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
        {rigs.map((rig) => (
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
