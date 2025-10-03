import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  BarChart3,
  Download,
  Calendar,
  Filter,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  PieChart,
  Users,
  MapPin,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import { useInspectors } from "@/hooks/useInspector";
import { useRigs } from "@/hooks/use-rigs";
import { useInspections } from "@/hooks/use-inspections";
import { useFilteredInspections } from "@/hooks/useFilteredInspections";
import getMonthlyInspectionStats from "@/hooks/getMontlyInpsection";
import getRigPerformance from "@/hooks/getRigsCompliance";


const COLORS = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#3b82f6",
  "#8b5cf6",
];

const monthlyInspections = [
  { month: "Jan", total: 45, completed: 42, overdue: 3 },
  { month: "Feb", total: 52, completed: 48, overdue: 10 },
  { month: "Mar", total: 38, completed: 36, overdue: 2 },
  { month: "Apr", total: 67, completed: 61, overdue: 6 },
  { month: "May", total: 58, completed: 54, overdue: 4 },
  { month: "Jun", total: 71, completed: 67, overdue: 4 },
];

const complianceTrend = [
  { week: "Week 1", compliance: 89 },
  { week: "Week 2", compliance: 92 },
  { week: "Week 3", compliance: 87 },
  { week: "Week 4", compliance: 94 },
  { week: "Week 5", compliance: 91 },
  { week: "Week 6", compliance: 96 },
];

const rigPerformance = [
  { rig: "Rig-001", inspections: 24, issues: 8, compliance: 92 },
  { rig: "Rig-002", inspections: 31, issues: 12, compliance: 87 },
  { rig: "Rig-003", inspections: 18, issues: 3, compliance: 98 },
  { rig: "Rig-004", inspections: 29, issues: 15, compliance: 76 },
  { rig: "Rig-005", inspections: 22, issues: 6, compliance: 94 },
];

const inspectorStats = [
  { inspector: "John Smith", inspections: 67, avgTime: 45, quality: 94 },
  { inspector: "Sarah Jones", inspections: 54, avgTime: 38, quality: 97 },
  { inspector: "Mike Wilson", inspections: 72, avgTime: 52, quality: 89 },
  { inspector: "Lisa Chen", inspections: 43, avgTime: 41, quality: 96 },
  { inspector: "David Brown", inspections: 58, avgTime: 47, quality: 91 },
];

const recentReports = [
  {
    id: "RPT-001",
    title: "Monthly Compliance Summary",
    type: "Compliance",
    generatedBy: "John Smith",
    date: "2024-01-15",
    status: "Ready",
    format: "PDF",
  },
  {
    id: "RPT-002",
    title: "Rig Performance Analysis Q1",
    type: "Performance",
    generatedBy: "Sarah Jones",
    date: "2024-01-14",
    status: "Processing",
    format: "Excel",
  },
  {
    id: "RPT-003",
    title: "Critical Issues Trend Report",
    type: "Safety",
    generatedBy: "Mike Wilson",
    date: "2024-01-13",
    status: "Ready",
    format: "PDF",
  },
];

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("last-30-days");
  const [selectedRig, setSelectedRig] = useState("all");
  const [selectedInspector, setSelectedInspector] = useState("all");

  // 🔧 ADD: State for custom date range
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data: rigs = [], isLoading, error } = useRigs();
  const { data: inspectors = [] } = useInspectors();
  const { data: inspections = [] } = useInspections();

  // 🔧 FIX: Pass startDate and endDate to the hook
  const filteredInspections = useFilteredInspections(
    inspections,
    selectedRig,
    selectedInspector,
    selectedPeriod,
    startDate,
    endDate
  );

  console.log("Reports Page State:", {
    selectedPeriod,
    startDate,
    endDate,
    totalInspections: inspections.length,
    filteredCount: filteredInspections.length,
  });

  const getSeverityBreakdown = () => {
    const highCount = filteredInspections.filter(
      (i) => i.priority === "High"
    ).length;
    const mediumCount = filteredInspections.filter(
      (i) => i.priority === "Medium"
    ).length;
    const lowCount = filteredInspections.filter(
      (i) => i.priority === "Low"
    ).length;
    const urgentCount = filteredInspections.filter(
      (i) => i.priority === "Urgent"
    ).length;

    return [
      { severity: "High Priority", count: highCount, color: "#ff0000" },
      { severity: "Medium Priority", count: mediumCount, color: "#ef4444" },
      { severity: "Urgent Priority", count: urgentCount, color: "#f97316" },
      { severity: "Low Priority", count: lowCount, color: "#22c55e" },
    ].filter((item) => item.count > 0);
  };

  const severityBreakdown = getSeverityBreakdown();

  const rigPerformance = getRigPerformance(rigs, inspections);

  const total = filteredInspections.length;
  const completed = filteredInspections.filter(
    (i) => i.status === "completed"
  ).length;
  const fail = filteredInspections.filter((i) => i.status === "fail").length;
  const critical = filteredInspections.filter(
    (i) => i.priority === "Low"
  ).length;

  const complianceRate = total === 0 ? 0 : (completed / total) * 100;
  const failRate = total === 0 ? 0 : (fail / total) * 100;
  const monthlyInspections = getMonthlyInspectionStats(inspections);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" data-testid="heading-reports">
            Reports & Analytics
          </h1>
          <p className="text-muted-foreground">
            Comprehensive inspection reports and performance analytics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="gap-2"
            data-testid="button-export-all"
          >
            <Download className="h-4 w-4" />
            Export All
          </Button>
          <Button className="gap-2" data-testid="button-generate-report">
            <FileText className="h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Report Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Time Period</label>
              <Select
                value={selectedPeriod}
                onValueChange={(value) => {
                  setSelectedPeriod(value);
                  // Clear custom dates when selecting a preset period
                  if (value !== "custom") {
                    setStartDate("");
                    setEndDate("");
                  }
                }}
                data-testid="select-time-period"
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                  <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                  <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                  <SelectItem value="last-year">Last Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Rig</label>
              <Select
                value={selectedRig}
                onValueChange={setSelectedRig}
                data-testid="select-rig"
              >
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
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Inspector</label>
              <Select
                value={selectedInspector}
                onValueChange={setSelectedInspector}
                data-testid="select-inspector"
              >
                <SelectTrigger>
                  <SelectValue />
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
              <label className="text-sm font-medium">Custom Date Range</label>
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
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Inspections
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div
              className="text-2xl font-bold"
              data-testid="metric-total-inspections"
            >
              {filteredInspections.length}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Compliance Rate
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div
              className="text-2xl font-bold text-green-600"
              data-testid="metric-compliance-rate"
            >
              {complianceRate.toFixed(2)}%
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.1%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Critical Issues
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div
              className="text-2xl font-bold text-red-600"
              data-testid="metric-critical-issues"
            >
              {failRate.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">+3</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Response Time
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div
              className="text-2xl font-bold"
              data-testid="metric-response-time"
            >
              2.3h
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">-0.4h</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Report Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" data-testid="tab-overview">
            Overview
          </TabsTrigger>
          <TabsTrigger value="compliance" data-testid="tab-compliance">
            Compliance
          </TabsTrigger>
          <TabsTrigger value="performance" data-testid="tab-performance">
            Performance
          </TabsTrigger>
          <TabsTrigger value="trends" data-testid="tab-trends">
            Trends
          </TabsTrigger>
          <TabsTrigger value="generated" data-testid="tab-generated">
            Generated Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Inspection Volume</CardTitle>
                <CardDescription>
                  Total inspections completed and overdue by month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyInspections}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completed" fill="#22c55e" name="Completed" />
                    <Bar dataKey="pending" fill="#facc15" name="Pending" />
                    <Bar dataKey="fail" fill="#ef4444" name="Fail" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Issue Severity Distribution</CardTitle>
                <CardDescription>
                  Breakdown of issues by severity level
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={severityBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="count"
                    >
                      {severityBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-4 flex-wrap">
                  {severityBreakdown.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm">
                        {item.severity}: {item.count}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Trend</CardTitle>
                <CardDescription>
                  Weekly compliance rate over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={complianceTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis domain={[80, 100]} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="compliance"
                      stroke="#22c55e"
                      fill="#22c55e"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rig Compliance Performance</CardTitle>
                <CardDescription>
                  Compliance rates by individual rig
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rigPerformance.map((rig, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{rig.rig}</span>
                        <span className="text-sm text-muted-foreground">
                          {rig.compliance}%
                        </span>
                      </div>
                      <Progress value={rig.compliance} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inspector Performance</CardTitle>
              <CardDescription>
                Performance metrics by inspector
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Inspector</th>
                      <th className="text-left p-2">Inspections</th>
                      <th className="text-left p-2">Avg Time (min)</th>
                      <th className="text-left p-2">Quality Score</th>
                      <th className="text-left p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inspectorStats.map((inspector, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2 font-medium">
                          {inspector.inspector}
                        </td>
                        <td className="p-2">{inspector.inspections}</td>
                        <td className="p-2">{inspector.avgTime}</td>
                        <td className="p-2">
                          <Badge
                            variant={
                              inspector.quality >= 95
                                ? "default"
                                : inspector.quality >= 90
                                ? "secondary"
                                : "destructive"
                            }
                          >
                            {inspector.quality}%
                          </Badge>
                        </td>
                        <td className="p-2">
                          <Badge variant="outline">Active</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rig Performance Comparison</CardTitle>
              <CardDescription>Issues vs inspections by rig</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={rigPerformance}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="rig" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="inspections"
                    fill="#3b82f6"
                    name="Inspections"
                  />
                  <Bar dataKey="issues" fill="#ef4444" name="Issues" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="generated" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>
                Generated reports and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="space-y-1">
                      <h4 className="font-medium">{report.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {report.generatedBy}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {report.date}
                        </span>
                        <Badge variant="outline">{report.type}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          report.status === "Ready" ? "default" : "secondary"
                        }
                      >
                        {report.status}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={report.status !== "Ready"}
                        data-testid={`button-download-${report.id}`}
                      >
                        <Download className="h-3 w-3 mr-1" />
                        {report.format}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
