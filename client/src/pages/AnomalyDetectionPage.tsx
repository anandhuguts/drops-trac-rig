import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, TrendingDown, TrendingUp, Eye, Users, Calendar, Filter, RefreshCw } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ScatterChart, Scatter, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

const rigAnomalies = [
  { rig: "Rig-001", normalRange: [15, 25], current: 42, severity: "high", trend: "increasing" },
  { rig: "Rig-002", normalRange: [10, 18], current: 12, severity: "normal", trend: "stable" },
  { rig: "Rig-003", normalRange: [8, 16], current: 31, severity: "high", trend: "increasing" },
  { rig: "Rig-004", normalRange: [12, 22], current: 18, severity: "normal", trend: "decreasing" },
  { rig: "Rig-005", normalRange: [20, 30], current: 6, severity: "low", trend: "decreasing" }
];

const inspectorConsistency = [
  { 
    inspector: "John Smith", 
    passRate: 78, 
    avgInspectionTime: 45, 
    consistencyScore: 92,
    flaggedItems: 2,
    status: "normal"
  },
  { 
    inspector: "Sarah Jones", 
    passRate: 95, 
    avgInspectionTime: 32, 
    consistencyScore: 88,
    flaggedItems: 1,
    status: "attention" // Too high pass rate
  },
  { 
    inspector: "Mike Wilson", 
    passRate: 52, 
    avgInspectionTime: 67, 
    consistencyScore: 76,
    flaggedItems: 5,
    status: "concerning" // Too low pass rate, slow
  },
  { 
    inspector: "Lisa Chen", 
    passRate: 82, 
    avgInspectionTime: 38, 
    consistencyScore: 94,
    flaggedItems: 0,
    status: "normal"
  }
];

const timeSeriesAnomalies = [
  { date: "2024-01-01", failures: 8, expected: 12 },
  { date: "2024-01-02", failures: 15, expected: 13 },
  { date: "2024-01-03", failures: 22, expected: 11 },
  { date: "2024-01-04", failures: 35, expected: 14 }, // Anomaly
  { date: "2024-01-05", failures: 41, expected: 12 }, // Anomaly
  { date: "2024-01-06", failures: 18, expected: 15 },
  { date: "2024-01-07", failures: 12, expected: 16 }
];

const categoryAnomalies = [
  { category: "Safety Systems", baseline: 85, current: 92, variance: 8.2 },
  { category: "Mechanical", baseline: 78, current: 65, variance: -16.7 },
  { category: "Electrical", baseline: 90, current: 88, variance: -2.2 },
  { category: "Structural", baseline: 82, current: 95, variance: 15.9 },
  { category: "Lifting Equipment", baseline: 75, current: 58, variance: -22.7 }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "high": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    case "normal": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "low": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "concerning": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    case "attention": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
    case "normal": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

export default function AnomalyDetectionPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const criticalAnomalies = rigAnomalies.filter(rig => rig.severity === "high").length;
  const concerningInspectors = inspectorConsistency.filter(i => i.status === "concerning").length;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" data-testid="heading-anomaly-detection">Anomaly Detection</h1>
          <p className="text-muted-foreground">AI-powered pattern analysis and consistency monitoring</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-24" data-testid="select-timeframe">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">1D</SelectItem>
              <SelectItem value="7d">7D</SelectItem>
              <SelectItem value="30d">30D</SelectItem>
              <SelectItem value="90d">90D</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isRefreshing}
            data-testid="button-refresh"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Alert Summary */}
      {(criticalAnomalies > 0 || concerningInspectors > 0) && (
        <Alert className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Anomalies Detected:</strong> {criticalAnomalies} rig patterns and {concerningInspectors} inspector consistency issues require attention.
          </AlertDescription>
        </Alert>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Critical Anomalies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{criticalAnomalies}</div>
            <p className="text-sm text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="h-4 w-4" />
              Inspector Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{concerningInspectors}</div>
            <p className="text-sm text-muted-foreground">Consistency problems</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Detection Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">94.2%</div>
            <p className="text-sm text-muted-foreground">Anomaly capture rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Avg Response Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">2.4h</div>
            <p className="text-sm text-muted-foreground">To anomaly resolution</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="patterns" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="patterns" data-testid="tab-patterns">Inspection Patterns</TabsTrigger>
          <TabsTrigger value="inspectors" data-testid="tab-inspectors">Inspector Consistency</TabsTrigger>
          <TabsTrigger value="trends" data-testid="tab-trends">Trend Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="patterns" className="space-y-6">
          {/* Rig Anomalies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Rig Performance Anomalies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rigAnomalies.map((rig) => (
                  <div key={rig.rig} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{rig.rig}</h4>
                        <Badge className={getSeverityColor(rig.severity)}>
                          {rig.severity}
                        </Badge>
                        <Badge variant="outline" className="gap-1">
                          {rig.trend === "increasing" ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          {rig.trend}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Normal range: {rig.normalRange[0]}-{rig.normalRange[1]} failures/week
                      </p>
                      <p className="text-sm">
                        <strong>Current:</strong> {rig.current} failures
                        {rig.severity !== "normal" && (
                          <span className="ml-2 text-red-600">
                            ({rig.current > rig.normalRange[1] ? '+' : ''}{((rig.current - (rig.normalRange[0] + rig.normalRange[1])/2) / ((rig.normalRange[0] + rig.normalRange[1])/2) * 100).toFixed(1)}%)
                          </span>
                        )}
                      </p>
                    </div>
                    <Progress 
                      value={Math.min(100, (rig.current / 50) * 100)} 
                      className="w-24"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Category Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Category Performance Variance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryAnomalies}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="category" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      `${value}%`, 
                      name === 'baseline' ? 'Baseline' : name === 'current' ? 'Current' : 'Variance'
                    ]} 
                  />
                  <Bar dataKey="baseline" fill="#94a3b8" name="baseline" />
                  <Bar dataKey="current" fill="#3b82f6" name="current" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inspectors" className="space-y-6">
          {/* Inspector Consistency */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Inspector Performance Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inspectorConsistency.map((inspector) => (
                  <div key={inspector.inspector} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{inspector.inspector}</h4>
                          <Badge className={getStatusColor(inspector.status)}>
                            {inspector.status}
                          </Badge>
                        </div>
                        {inspector.flaggedItems > 0 && (
                          <p className="text-sm text-orange-600">
                            {inspector.flaggedItems} flagged pattern{inspector.flaggedItems !== 1 ? 's' : ''}
                          </p>
                        )}
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        Consistency Score: <span className="font-medium">{inspector.consistencyScore}%</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="flex justify-between">
                          <span>Pass Rate:</span>
                          <span className={inspector.passRate > 90 || inspector.passRate < 60 ? 'text-orange-600 font-medium' : ''}>
                            {inspector.passRate}%
                          </span>
                        </div>
                        <Progress value={inspector.passRate} className="h-2 mt-1" />
                      </div>
                      <div>
                        <div className="flex justify-between">
                          <span>Avg Time:</span>
                          <span className={inspector.avgInspectionTime > 60 ? 'text-orange-600 font-medium' : ''}>
                            {inspector.avgInspectionTime}m
                          </span>
                        </div>
                        <Progress value={Math.min(100, (inspector.avgInspectionTime / 90) * 100)} className="h-2 mt-1" />
                      </div>
                      <div>
                        <div className="flex justify-between">
                          <span>Consistency:</span>
                          <span>{inspector.consistencyScore}%</span>
                        </div>
                        <Progress value={inspector.consistencyScore} className="h-2 mt-1" />
                      </div>
                    </div>

                    {inspector.status === "concerning" && (
                      <Alert className="mt-3 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription className="text-sm">
                          Unusual patterns detected: {inspector.passRate < 60 ? 'Low pass rate, ' : ''}
                          {inspector.avgInspectionTime > 60 ? 'Slow inspection times, ' : ''}
                          requires supervisor review.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          {/* Time Series Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Failure Pattern Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timeSeriesAnomalies}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    formatter={(value, name) => [value, name === 'failures' ? 'Actual Failures' : 'Expected Range']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="expected" 
                    stroke="#94a3b8" 
                    strokeDasharray="5 5"
                    name="expected"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="failures" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    name="failures"
                    dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Inspector Scatter Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Inspector Performance Correlation</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="passRate" 
                    domain={[40, 100]}
                    name="Pass Rate (%)"
                  />
                  <YAxis 
                    dataKey="avgInspectionTime" 
                    domain={[20, 80]}
                    name="Avg Time (min)"
                  />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'passRate' ? `${value}%` : `${value}m`,
                      name === 'passRate' ? 'Pass Rate' : 'Avg Time'
                    ]}
                  />
                  <Scatter 
                    data={inspectorConsistency} 
                    fill="#3b82f6"
                    name="Inspectors"
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}