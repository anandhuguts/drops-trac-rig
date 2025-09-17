import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { FileBarChart, Download, Share, Calendar, TrendingUp, AlertTriangle, CheckCircle, Users, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

const dailySummary = {
  date: "2024-01-15",
  totalInspections: 13,
  criticalIssues: 4,
  majorIssues: 8,
  minorIssues: 15,
  passRate: 76,
  topIssue: "missing secondary retention",
  affectedRigs: ["Rig-02", "Rig-05"],
  inspectorEfficiency: 94,
  timeSpent: 127, // minutes
  complianceScore: 88
};

const weeklySummary = {
  week: "Week of Jan 8-14, 2024",
  totalInspections: 89,
  trendsAnalysis: {
    criticalIncreased: true,
    percentChange: 23,
    primaryCause: "Aging equipment in offshore rigs"
  },
  topPerformer: "Lisa Chen",
  riskCategories: [
    { category: "Safety Systems", score: 92 },
    { category: "Mechanical", score: 78 },
    { category: "Electrical", score: 85 },
    { category: "Structural", score: 91 }
  ],
  recommendations: [
    "Schedule maintenance for Rig-02 pressure systems",
    "Increase inspection frequency for wire rope components",
    "Conduct safety training for new inspectors"
  ]
};

const executiveSummary = {
  period: "Q4 2023 Executive Summary",
  kpis: [
    { metric: "Overall Compliance", value: 87, target: 90, trend: "up" },
    { metric: "Critical Issues", value: 156, target: 120, trend: "up" },
    { metric: "Inspection Efficiency", value: 94, target: 85, trend: "up" },
    { metric: "Cost Savings", value: 2.3, target: 2.0, trend: "up", unit: "M" }
  ],
  narrative: `During Q4 2023, Drops Trac managed 1,247 inspections across 6 drilling rigs with an overall compliance rate of 87%. 
  While critical issues increased by 23% compared to Q3, inspection efficiency improved significantly, saving an estimated $2.3M in potential downtime costs. 
  The AI-powered severity prediction system achieved 92% accuracy, enabling proactive maintenance decisions.`,
  boardRecommendations: [
    "Invest in preventive maintenance programs for aging equipment",
    "Expand AI analytics capabilities to additional rig locations", 
    "Consider staff augmentation for high-risk operational periods"
  ]
};

const inspectionTrends = [
  { month: "Jul", inspections: 234, issues: 45, compliance: 85 },
  { month: "Aug", inspections: 267, issues: 52, compliance: 82 },
  { month: "Sep", inspections: 298, issues: 48, compliance: 87 },
  { month: "Oct", inspections: 312, issues: 61, compliance: 84 },
  { month: "Nov", inspections: 289, issues: 39, compliance: 91 },
  { month: "Dec", inspections: 298, issues: 44, compliance: 89 }
];

const rigPerformance = [
  { rig: "Rig-001", score: 89 },
  { rig: "Rig-002", score: 76 },
  { rig: "Rig-003", score: 92 },
  { rig: "Rig-004", score: 84 },
  { rig: "Rig-005", score: 88 },
  { rig: "Rig-006", score: 81 }
];

const complianceBreakdown = [
  { area: "Safety", score: 95 },
  { area: "Environmental", score: 88 },
  { area: "Quality", score: 91 },
  { area: "Regulatory", score: 84 },
  { area: "Operational", score: 87 }
];

const issueDistribution = [
  { severity: "Critical", count: 23, color: "#ef4444" },
  { severity: "Major", count: 67, color: "#f97316" },
  { severity: "Minor", count: 134, color: "#eab308" },
  { severity: "Info", count: 198, color: "#22c55e" }
];

const getTrendIcon = (trend: string) => {
  return trend === "up" ? <TrendingUp className="h-4 w-4 text-green-600" /> : <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />;
};

const getComplianceColor = (score: number) => {
  if (score >= 90) return "text-green-600";
  if (score >= 80) return "text-yellow-600";
  return "text-red-600";
};

export default function AISummariesPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("daily");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2500);
  };

  const handleExportReport = () => {
    // Export functionality would be implemented here
    console.log("Exporting report...");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" data-testid="heading-ai-summaries">AI Summaries</h1>
          <p className="text-muted-foreground">Automated insights and executive reporting</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32" data-testid="select-period">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleExportReport} data-testid="button-export">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleGenerateReport} disabled={isGenerating} data-testid="button-generate">
            {isGenerating ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <FileBarChart className="h-4 w-4 mr-2" />
                Generate
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="daily" data-testid="tab-daily">Daily Summary</TabsTrigger>
          <TabsTrigger value="weekly" data-testid="tab-weekly">Weekly Insights</TabsTrigger>
          <TabsTrigger value="executive" data-testid="tab-executive">Executive Report</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-6">
          {/* Daily Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Daily Inspection Summary - {new Date(dailySummary.date).toLocaleDateString()}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm leading-relaxed">
                  <strong>{dailySummary.totalInspections} inspections</strong> completed today across multiple rigs. 
                  <strong className="text-red-600"> {dailySummary.criticalIssues} critical issues</strong> found on {dailySummary.affectedRigs.join(" and ")}, 
                  with the top issue being <strong>"{dailySummary.topIssue}"</strong>. 
                  Overall pass rate was <strong className={getComplianceColor(dailySummary.passRate)}>{dailySummary.passRate}%</strong>, 
                  with inspector efficiency at <strong>{dailySummary.inspectorEfficiency}%</strong>.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{dailySummary.criticalIssues}</div>
                  <p className="text-sm text-muted-foreground">Critical Issues</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{dailySummary.majorIssues}</div>
                  <p className="text-sm text-muted-foreground">Major Issues</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{dailySummary.minorIssues}</div>
                  <p className="text-sm text-muted-foreground">Minor Issues</p>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getComplianceColor(dailySummary.passRate)}`}>
                    {dailySummary.passRate}%
                  </div>
                  <p className="text-sm text-muted-foreground">Pass Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Daily Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Issue Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={issueDistribution}
                      dataKey="count"
                      nameKey="severity"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={(entry) => `${entry.severity}: ${entry.count}`}
                    >
                      {issueDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rig Performance Scores</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={rigPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="rig" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Performance Score']} />
                    <Bar dataKey="score" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-6">
          {/* Weekly Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Weekly Analysis - {weeklySummary.week}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm leading-relaxed">
                  This week saw <strong>{weeklySummary.totalInspections} total inspections</strong> with critical issues 
                  {weeklySummary.trendsAnalysis.criticalIncreased ? ' increasing' : ' decreasing'} by 
                  <strong className="text-red-600"> {weeklySummary.trendsAnalysis.percentChange}%</strong> primarily due to 
                  <strong> {weeklySummary.trendsAnalysis.primaryCause}</strong>. 
                  Top performing inspector was <strong>{weeklySummary.topPerformer}</strong> with consistently high accuracy ratings.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Key Recommendations:</h4>
                <div className="space-y-2">
                  {weeklySummary.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Inspection Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={inspectionTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="inspections" fill="#3b82f6" opacity={0.3} />
                    <Line yAxisId="right" type="monotone" dataKey="compliance" stroke="#22c55e" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Category Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <RadarChart data={weeklySummary.riskCategories}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" />
                    <PolarRadiusAxis domain={[0, 100]} />
                    <Radar
                      dataKey="score"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.3}
                    />
                    <Tooltip formatter={(value) => [`${value}%`, 'Score']} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="executive" className="space-y-6">
          {/* Executive Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                {executiveSummary.period}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* KPI Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {executiveSummary.kpis.map((kpi, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium">{kpi.metric}</h4>
                      {getTrendIcon(kpi.trend)}
                    </div>
                    <div className="flex items-end gap-2">
                      <div className="text-2xl font-bold">
                        {kpi.unit === "M" ? `$${kpi.value}${kpi.unit}` : `${kpi.value}${kpi.unit || '%'}`}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        / {kpi.unit === "M" ? `$${kpi.target}${kpi.unit}` : `${kpi.target}${kpi.unit || '%'}`}
                      </div>
                    </div>
                    <Progress 
                      value={kpi.unit === "M" ? (kpi.value / kpi.target) * 100 : Math.min(100, (kpi.value / kpi.target) * 100)} 
                      className="mt-2" 
                    />
                  </div>
                ))}
              </div>

              <Separator />

              {/* Executive Narrative */}
              <div className="bg-muted/50 p-6 rounded-lg">
                <h4 className="font-medium mb-3">Executive Summary</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {executiveSummary.narrative}
                </p>
              </div>

              <Separator />

              {/* Board Recommendations */}
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Board Recommendations
                </h4>
                <div className="space-y-3">
                  {executiveSummary.boardRecommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <Badge variant="secondary" className="mt-0.5">
                        {index + 1}
                      </Badge>
                      <p className="text-sm">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Executive Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quarterly Compliance Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={complianceBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="area" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Compliance Score']} />
                    <Bar dataKey="score" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6-Month Inspection Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={inspectionTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="inspections"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Action Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Priority Action Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950 rounded-lg">
                  <Badge variant="destructive">High</Badge>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Schedule emergency maintenance for critical pressure systems</p>
                    <p className="text-xs text-muted-foreground">Due: Within 48 hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950 rounded-lg">
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">Medium</Badge>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Review and update inspection protocols for wire rope components</p>
                    <p className="text-xs text-muted-foreground">Due: End of month</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950 rounded-lg">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">Low</Badge>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Conduct quarterly safety training for inspection staff</p>
                    <p className="text-xs text-muted-foreground">Due: Next quarter</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}