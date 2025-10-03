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
import { useRigs } from "../hooks/use-rigs";
import { useInspections } from "@/hooks/use-inspections";
import { useFilteredInspections } from "@/hooks/useFilteredInspections";
import { useState } from "react";

export default function InspectionsPage() {
  const { data: rigs = [], isLoading, error } = useRigs();
  const { data: inspections = [], isLoading: loading } = useInspections();
  
  const [selectedPeriod, setSelectedPeriod] = useState("all"); // Changed to "all" since no period selector on this page
  const [selectedRig, setSelectedRig] = useState("all");
  const [selectedInspector, setSelectedInspector] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedSeverity, setSelectedSeverity] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // 🔧 FIX: Pass all parameters in correct order
  const filteredInspections = useFilteredInspections(
    inspections,
    selectedRig,
    selectedInspector,
    selectedPeriod,    // Must be 4th parameter
    "",                // startDate (empty since no date picker on this page)
    "",                // endDate (empty since no date picker on this page)
    selectedStatus,    // Now correctly positioned as 7th parameter
    selectedSeverity   // Now correctly positioned as 8th parameter
  );

  // 🔧 ADD: Search functionality
  const searchFilteredInspections = searchQuery
    ? filteredInspections.filter(
        (inspection) =>
          inspection.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          inspection.rig?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          inspection.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredInspections;

  console.log("Filtered Inspections:", searchFilteredInspections.length);

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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select
              value={selectedRig}
              onValueChange={setSelectedRig}
              data-testid="select-rig"
            >
              <SelectTrigger>
                <SelectValue placeholder="All Rigs" />
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

            <Select
              value={selectedStatus}
              onValueChange={setSelectedStatus}
              data-testid="select-status"
            >
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="fail">Fail</SelectItem>
              </SelectContent>
            </Select>

            <Select 
              value={selectedSeverity} 
              onValueChange={setSelectedSeverity} 
              data-testid="select-severity"
            >
              <SelectTrigger>
                <SelectValue placeholder="All Severities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
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
          <CardTitle>
            All Inspections
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              ({searchFilteredInspections.length} of {inspections.length})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <InspectionTable
            inspections={searchFilteredInspections}
            isLoading={loading}
          />
        </CardContent>
      </Card>
    </div>
  );
}