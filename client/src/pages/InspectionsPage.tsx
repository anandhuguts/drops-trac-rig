import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InspectionTable } from "@/components/InspectionTable";
import { Search, Filter, Plus } from "lucide-react";
import { Link } from "wouter";

export default function InspectionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Inspections</h1>
          <p className="text-muted-foreground">Manage and review all inspection activities</p>
        </div>
        <Button data-testid="button-new-inspection">
          <Link to="/inspections/new" className={"flex items-center"}>
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
            <Select>
              <SelectTrigger data-testid="select-rig-filter">
                <SelectValue placeholder="Select rig" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Rigs</SelectItem>
                <SelectItem value="deepwater-horizon-ii">Deep Water Horizon II</SelectItem>
                <SelectItem value="ocean-explorer">Ocean Explorer</SelectItem>
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
          <InspectionTable />
        </CardContent>
      </Card>
    </div>
  );
}