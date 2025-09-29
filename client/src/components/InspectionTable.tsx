import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Eye, Edit, Download } from "lucide-react";
import { useEffect, useState } from "react";
import InspectionDetailPage from "@/pages/InspectionDetailPage";
import EditInspectionForm from "./EditInpsectionForm";


export function InspectionTable() {
  const [inspections, setInspections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedInspection, setSelectedInspection] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchInspections = async () => {
      try {
        const response = await axios.get("https://drop-stack-backend.onrender.com/inspections");
        setInspections(response.data);
      } catch (err) {
        console.error("Failed to fetch inspections:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInspections();
  }, []);

  // ---------- Handlers ----------
  const handleView = (inspection: any) => {
    setSelectedInspection(inspection);
    console.log(inspection);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleEdit = (inspection: any) => {
    setSelectedInspection(inspection);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleSaveEdit = async (updatedInspection: any) => {
    try {
      await axios.put(
        `https://drop-stack-backend.onrender.com/inspections/${updatedInspection._id}`,
        updatedInspection
      );

      // Update list locally
      setInspections((prev) =>
        prev.map((i) =>
          i._id === updatedInspection._id ? updatedInspection : i
        )
      );

      setIsModalOpen(false);
      setIsEditMode(false);
    } catch (err) {
      console.error("Failed to update inspection:", err);
    }
  };

 const handleDownload = async (id: string) => {
  try {
    const response = await axios.get(
      `https://drop-stack-backend.onrender.com/api/inspections/${id}/pdf`,
      { responseType: "blob" } // important for binary data
    );

    // Create a URL for the PDF blob
    const url = window.URL.createObjectURL(new Blob([response.data]));

    // Create a temporary link and click it to trigger download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `inspection_${id}.pdf`);
    document.body.appendChild(link);
    link.click();

    // Clean up
    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Failed to download PDF:", err);
  }
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
          {loading ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-4">
                Loading...
              </TableCell>
            </TableRow>
          ) : inspections.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-4">
                No inspections found.
              </TableCell>
            </TableRow>
          ) : (
            inspections.map((inspection: any) => (
              <TableRow key={inspection._id} className="hover-elevate">
                <TableCell className="font-medium">{inspection._id}</TableCell>
                <TableCell>{inspection.rig}</TableCell>
                <TableCell>
                  <div className="flex -space-x-2">
                    {inspection.inspectors.map((name: string, idx: number) => (
                      <Avatar
                        key={idx}
                        className="h-8 w-8 border-2 border-background"
                      >
                        <AvatarFallback className="text-xs">
                          {name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(inspection.scheduleDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <StatusBadge status={inspection.status || "pending"} />
                </TableCell>
                <TableCell>
                  <StatusBadge
                    severity={inspection.priority || "low"}
                    variant="severity"
                  />
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleView(inspection)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>

                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleEdit(inspection)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDownload(inspection._id)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Modal for view / edit */}
      {isModalOpen && selectedInspection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg w-4/5 max-w-6xl p-6 relative overflow-auto">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>

            {isEditMode ? (
              <EditInspectionForm
                inspection={selectedInspection}
                onSave={handleSaveEdit}
                onCancel={() => setIsModalOpen(false)}
              />
            ) : (
              <InspectionDetailPage inspections={selectedInspection} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
