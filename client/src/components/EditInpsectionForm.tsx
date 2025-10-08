import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Type for a single inspection
interface Inspection {
  _id?: string;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
  scheduleDate: string;
  estimatedDuration: number;
  rig: string;
  inspectors?: string[];
  status?: "pending" | "in-progress" | "completed" | "fail";
  completionRate?: number; // ✅ new
  issues?: string;         // ✅ new
  createdAt?: string;
  updatedAt?: string;
}

// Props for the edit form
interface EditInspectionFormProps {
  inspection: Inspection;
  onSave: (updatedInspection: Inspection) => void;
  onCancel?: () => void;
}

export default function EditInspectionForm({
  inspection,
  onSave,
  onCancel,
}: EditInspectionFormProps) {
  const [formData, setFormData] = useState<Inspection>(inspection);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "number" || e.target.type === "range"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <Input
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <Textarea
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Rig</label>
        <Input
          name="rig"
          value={formData.rig || ""}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Due Date</label>
        <Input
          type="date"
          name="scheduleDate"
          value={formData.scheduleDate?.split("T")[0] || ""}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          Estimated Duration (hrs)
        </label>
        <Input
          type="number"
          name="estimatedDuration"
          value={formData.estimatedDuration || ""}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Priority</label>
        <select
          name="priority"
          value={formData.priority || "Low"}
          onChange={handleChange}
          className="w-full border rounded-md p-2"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Urgent">Urgent</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Status</label>
        <select
          name="status"
          value={formData.status || "pending"}
          onChange={handleChange}
          className="w-full border rounded-md p-2"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="fail">Fail</option>
        </select>
      </div>

      {/* ✅ Completion Rate as range slider */}
      <div>
        <label className="block text-sm font-medium">
          Completion Rate: {formData.completionRate ?? 0}%
        </label>
        <input
          type="range"
          name="completionRate"
          min="0"
          max="100"
          step="1"
          value={formData.completionRate ?? 0}
          onChange={handleChange}
          className="w-full accent-blue-600 cursor-pointer"
        />
      </div>

      {/* ✅ New field: issues */}
      <div>
        <label className="block text-sm font-medium">Issues</label>
        <Textarea
          name="issues"
          value={formData.issues || ""}
          onChange={handleChange}
          placeholder="Describe any issues found during inspection"
        />
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
