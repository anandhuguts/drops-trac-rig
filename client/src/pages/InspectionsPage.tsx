import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InspectionTable } from "@/components/InspectionTable";
import { Search, Filter, Plus } from "lucide-react";
import { Link } from "wouter";
import { useRigs } from "../hooks/use-rigs"; // import your hook
import { useInspections } from "@/hooks/use-inspections";
import { useFilteredInspections } from "@/hooks/useFilteredInspections";
import { useState } from "react";

export default function InspectionsPage() {
  const { data: rigs = [], isLoading, error } = useRigs();
   const { data: inspections = [],isLoading:loading } = useInspections();
    const [selectedPeriod, setSelectedPeriod] = useState("last-30-days");
     const [selectedRig, setSelectedRig] = useState("all");
     const [selectedInspector, setSelectedInspector] = useState("all");

    const filteredInspections = useFilteredInspections(
       inspections,
       selectedRig,
       selectedInspector
     );

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Inspections</h1>
          <p className="text-muted-foreground">
            Manage and review all inspection activities
          </p>
        </div>
        <Button data-testid="button-new-inspection">
          <Link to="/inspections/new" className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            New Inspection
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search inspections..."
                className="pl-10"
                data-testid="input-search-inspections"
              />
            </div>

                  <Select value={selectedRig} onValueChange={setSelectedRig} data-testid="select-rig">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
           <SelectContent>
                <SelectItem value="all">All Rigs</SelectItem>
                {rigs.map((rig: any) => (
                  <SelectItem key={rig._id} value={rig.name}>
                    {rig.name}
                  </SelectItem>
                ))}
              </SelectContent>
              </Select>

            <Select>
              <SelectTrigger data-testid="select-status-filter">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger data-testid="select-severity-filter">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Inspections</CardTitle>
        </CardHeader>
        <CardContent>
          <InspectionTable inspections={filteredInspections} isLoading={loading} />
        </CardContent>
      </Card>
    </div>
  );
}
