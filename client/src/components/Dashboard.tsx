import { KPICard } from "./KPICard";
import { InspectionTable } from "./InspectionTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Clock, AlertTriangle, Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

//todo: remove mock functionality
const severityData = [
  { name: "Low", count: 45, fill: "hsl(var(--chart-2))" },
  { name: "Medium", count: 23, fill: "hsl(var(--chart-3))" },
  { name: "High", count: 12, fill: "hsl(var(--chart-4))" },
  { name: "Critical", count: 3, fill: "hsl(var(--destructive))" },
];

const passFailData = [
  { name: "Pass", value: 78, fill: "hsl(var(--chart-2))" },
  { name: "Fail", value: 22, fill: "hsl(var(--chart-4))" },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Inspections"
          value="1,247"
          change={{ value: 12, type: "increase" }}
          icon={CheckCircle}
          description="This month"
        />
        <KPICard
          title="Pending Reviews"
          value="23"
          change={{ value: 5, type: "decrease" }}
          icon={Clock}
          description="Awaiting approval"
        />
        <KPICard
          title="Critical Issues"
          value="8"
          change={{ value: 15, type: "increase" }}
          icon={AlertTriangle}
          description="Requires attention"
        />
        <KPICard
          title="Pass Rate"
          value="78%"
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
              <div className="flex gap-2">
                <Input type="date" placeholder="From" data-testid="input-date-from" />
                <Input type="date" placeholder="To" data-testid="input-date-to" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Rig</label>
              <Select>
                <SelectTrigger data-testid="select-rig">
                  <SelectValue placeholder="Select rig" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Rigs</SelectItem>
                  <SelectItem value="deepwater-horizon-ii">Deep Water Horizon II</SelectItem>
                  <SelectItem value="ocean-explorer">Ocean Explorer</SelectItem>
                  <SelectItem value="north-sea-pioneer">North Sea Pioneer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Inspector</label>
              <Select>
                <SelectTrigger data-testid="select-inspector">
                  <SelectValue placeholder="Select inspector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Inspectors</SelectItem>
                  <SelectItem value="john-smith">John Smith</SelectItem>
                  <SelectItem value="sarah-jones">Sarah Jones</SelectItem>
                  <SelectItem value="mike-wilson">Mike Wilson</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Severity</label>
              <Select>
                <SelectTrigger data-testid="select-severity">
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button data-testid="button-apply-filters">Apply Filters</Button>
            <Button variant="outline" data-testid="button-reset-filters">Reset</Button>
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
          <CardDescription>Latest inspection activities across all rigs</CardDescription>
        </CardHeader>
        <CardContent>
          <InspectionTable />
        </CardContent>
      </Card>
    </div>
  );
}