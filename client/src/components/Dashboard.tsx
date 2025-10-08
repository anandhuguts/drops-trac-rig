import { KPICard } from "./KPICard";
import { InspectionTable } from "./InspectionTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Clock, AlertTriangle, Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useRigs } from "@/hooks/use-rigs";
import { useInspectors } from "@/hooks/useInspector";
import { useState } from "react";
import { useInspections } from "@/hooks/use-inspections";             
import { useFilteredInspections } from "@/hooks/useFilteredInspections";

export function Dashboard() {
  const { data: rigs = [], isLoading, error } = useRigs();
  const { data: inspectors = [] } = useInspectors();
  const { data: inspections = [], isLoading: loading } = useInspections();
  
  const [selectedPeriod, setSelectedPeriod] = useState("last-30-days");
  const [selectedRig, setSelectedRig] = useState("all");
  const [selectedInspector, setSelectedInspector] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedSeverity, setSelectedSeverity] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // 🔧 FIX: Pass startDate and endDate to the hook
  const filteredInspections = useFilteredInspections(
    inspections,
    selectedRig,
    selectedInspector,
    selectedPeriod,
    startDate,
    endDate,
    selectedStatus,
    selectedSeverity
  );

  console.log('inspections', inspections);
  
  const totalInspections = filteredInspections.length;

  const passCount = filteredInspections.filter(
    (i) => i.status.toLowerCase() === "completed" || i.status.toLowerCase() === "pass"
  ).length;

  const failCount = totalInspections - passCount;

  const passFailData = [
    { name: "Pass", value: totalInspections ? Math.round((passCount / totalInspections) * 100) : 0, fill: "hsl(var(--chart-2))" },
    { name: "Fail", value: totalInspections ? Math.round((failCount / totalInspections) * 100) : 0, fill: "hsl(var(--chart-4))" },
  ];

  const severityLevels = ["low", "medium", "high", "urgent"];
  const severityColors = [
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--destructive))",
  ];

  const severityData = severityLevels.map((level, index) => {
    const count = filteredInspections.filter(
      (i) => i.priority?.toLowerCase() === level
    ).length;

    return {
      name: level.charAt(0).toUpperCase() + level.slice(1),
      count,
      fill: severityColors[index],
    };
  });

  // 🔧 ADD: Reset function
  const handleReset = () => {
    setSelectedPeriod("last-30-days");
    setSelectedRig("all");
    setSelectedInspector("all");
    setSelectedStatus("all");
    setSelectedSeverity("all");
    setStartDate("");
    setEndDate("");
  };
 
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Inspections"
          value={inspections.length}
          change={{ value: 12, type: "increase" }}
          icon={CheckCircle}
          description="Filtered results"
        />
        <KPICard
          title="Pending Reviews"
          value={inspections.filter(i => i.status.toLowerCase() === "pending").length}
          change={{ value: 5, type: "decrease" }}
          icon={Clock}
          description="Awaiting approval"
        />
        <KPICard
          title="Critical Issues"
          value={ inspections.filter(i => i.priority === "Urgent").length}
          change={{ value: 15, type: "increase" }}
          icon={AlertTriangle}
          description="Requires attention"
        />
        <KPICard
          title="Pass Rate"
          value={totalInspections > 0 ? `${Math.round((passCount / totalInspections) * 100)}%` : "0%"}
          change={{ value: 3, type: "increase" }}
          icon={CheckCircle}
          description="Overall compliance"
        />
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
          <CardDescription>
            Filter inspections by date range, rig, inspector, or severity level
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <div className="flex gap-1">
                <Input 
                  type="date" 
                  className="text-xs" 
                  data-testid="input-start-date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    setSelectedPeriod("custom");
                  }}
                  placeholder="Start"
                />
                <Input 
                  type="date" 
                  className="text-xs" 
                  data-testid="input-end-date"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    setSelectedPeriod("custom");
                  }}
                  placeholder="End"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Rig</label>
              <Select value={selectedRig} onValueChange={setSelectedRig} data-testid="select-rig">
                <SelectTrigger>
                  <SelectValue placeholder="Select rig" />
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
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Inspector</label>
              <Select value={selectedInspector} onValueChange={setSelectedInspector} data-testid="select-inspector">
                <SelectTrigger>
                  <SelectValue placeholder="Select inspector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Inspectors</SelectItem>
                  {inspectors.map((inspector: any) => (
                    <SelectItem key={inspector._id} value={inspector.name}>
                      {inspector.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Severity</label>
              <Select value={selectedSeverity} onValueChange={setSelectedSeverity} data-testid="select-severity">
                <SelectTrigger>
                  <SelectValue placeholder="Select severity" />
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
          </div>
          <div className="flex gap-2 mt-4">
            <Button data-testid="button-apply-filters" onClick={() => console.log('Filters applied')}>
              Apply Filters
            </Button>
            <Button variant="outline" data-testid="button-reset-filters" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Issues by Severity</CardTitle>
            <CardDescription>Distribution of inspection findings</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={severityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pass/Fail Ratio</CardTitle>
            <CardDescription>Overall inspection outcomes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={passFailData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {passFailData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Inspections */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Inspections</CardTitle>
          <CardDescription>
            Showing {filteredInspections.length} of {inspections.length} total inspections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InspectionTable inspections={filteredInspections} isLoading={loading} />
        </CardContent>
      </Card>
    </div>
  );
}