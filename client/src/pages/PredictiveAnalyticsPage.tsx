import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Target, AlertCircle, Calendar, BarChart3, Map, Zap, RefreshCw } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, ScatterChart, Scatter, PieChart, Pie, Cell } from "recharts";

const trendForecast = [
  { month: "Jan", actual: 245, predicted: null },
  { month: "Feb", actual: 267, predicted: null },
  { month: "Mar", actual: 234, predicted: null },
  { month: "Apr", actual: 289, predicted: null },
  { month: "May", actual: 312, predicted: null },
  { month: "Jun", actual: 298, predicted: null },
  { month: "Jul", actual: null, predicted: 324 },
  { month: "Aug", actual: null, predicted: 341 },
  { month: "Sep", actual: null, predicted: 356 },
  { month: "Oct", actual: null, predicted: 378 },
  { month: "Nov", actual: null, predicted: 392 },
  { month: "Dec", actual: null, predicted: 385 }
];

const riskHeatmapData = [
  { rig: "Rig-001", riskScore: 89, category: "High", failureProbability: 78, nextFailureWeeks: 2 },
  { rig: "Rig-002", riskScore: 34, category: "Low", failureProbability: 23, nextFailureWeeks: 12 },
  { rig: "Rig-003", riskScore: 67, category: "Medium", failureProbability: 52, nextFailureWeeks: 6 },
  { rig: "Rig-004", riskScore: 92, category: "High", failureProbability: 81, nextFailureWeeks: 1 },
  { rig: "Rig-005", riskScore: 45, category: "Low", failureProbability: 31, nextFailureWeeks: 8 },
  { rig: "Rig-006", riskScore: 78, category: "Medium", failureProbability: 64, nextFailureWeeks: 4 }
];

const recurrenceAnalysis = [
  {
    issueType: "Pressure relief valve failure",
    occurrences: 12,
    avgFrequency: 45, // days
    affectedRigs: ["Rig-001", "Rig-003", "Rig-004"],
    severity: "Critical",
    predictedNext: "2024-02-15",
    confidence: 87
  },
  {
    issueType: "Wire rope wear",
    occurrences: 28,
    avgFrequency: 28,
    affectedRigs: ["Rig-002", "Rig-005", "Rig-006"],
    severity: "Major", 
    predictedNext: "2024-01-28",
    confidence: 94
  },
  {
    issueType: "Safety latch malfunction",
    occurrences: 8,
    avgFrequency: 67,
    affectedRigs: ["Rig-001", "Rig-002"],
    severity: "Major",
    predictedNext: "2024-03-05",
    confidence: 76
  },
  {
    issueType: "Hydraulic leak",
    occurrences: 15,
    avgFrequency: 35,
    affectedRigs: ["Rig-003", "Rig-004", "Rig-005"],
    severity: "Minor",
    predictedNext: "2024-02-08",
    confidence: 82
  }
];

const componentLifecycle = [
  { component: "BOP Stack", currentAge: 24, predictedLife: 36, utilizationRate: 87 },
  { component: "Draw Works", currentAge: 18, predictedLife: 48, utilizationRate: 72 },
  { component: "Mud Pumps", currentAge: 32, predictedLife: 42, utilizationRate: 95 },
  { component: "Top Drive", currentAge: 15, predictedLife: 60, utilizationRate: 68 },
  { component: "Rotary Table", currentAge: 41, predictedLife: 60, utilizationRate: 84 }
];

const riskFactors = [
  { factor: "Equipment Age", weight: 0.25, currentValue: 78 },
  { factor: "Utilization Rate", weight: 0.20, currentValue: 85 },
  { factor: "Environment", weight: 0.15, currentValue: 45 },
  { factor: "Maintenance History", weight: 0.20, currentValue: 72 },
  { factor: "Operator Experience", weight: 0.10, currentValue: 88 },
  { factor: "External Factors", weight: 0.10, currentValue: 63 }
];

const getRiskColor = (category: string) => {
  switch (category) {
    case "High": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    case "Medium": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
    case "Low": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "Critical": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    case "Major": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
    case "Minor": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    default: return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
  }
};

export default function PredictiveAnalyticsPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("6m");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateForecast = async () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
  };

  const highRiskRigs = riskHeatmapData.filter(r => r.category === "High").length;
  const criticalIssues = recurrenceAnalysis.filter(r => r.severity === "Critical").length;
  const avgConfidence = recurrenceAnalysis.reduce((sum, item) => sum + item.confidence, 0) / recurrenceAnalysis.length;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" data-testid="heading-predictive-analytics">Predictive Analytics</h1>
          <p className="text-muted-foreground">AI-powered trend forecasting and risk analysis</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-24" data-testid="select-timeframe">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3m">3M</SelectItem>
              <SelectItem value="6m">6M</SelectItem>
              <SelectItem value="12m">12M</SelectItem>
              <SelectItem value="24m">24M</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            onClick={handleGenerateForecast}
            disabled={isGenerating}
            data-testid="button-generate-forecast"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Generate Forecast
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              High Risk Rigs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{highRiskRigs}</div>
            <p className="text-sm text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="h-4 w-4" />
              Critical Patterns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{criticalIssues}</div>
            <p className="text-sm text-muted-foreground">Recurring critical issues</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Prediction Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{avgConfidence.toFixed(1)}%</div>
            <p className="text-sm text-muted-foreground">Average confidence</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Next Failure Risk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {Math.min(...riskHeatmapData.map(r => r.nextFailureWeeks))}w
            </div>
            <p className="text-sm text-muted-foreground">Earliest predicted failure</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="forecasts" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="forecasts" data-testid="tab-forecasts">Trend Forecasts</TabsTrigger>
          <TabsTrigger value="heatmaps" data-testid="tab-heatmaps">Risk Heatmaps</TabsTrigger>
          <TabsTrigger value="recurrence" data-testid="tab-recurrence">Failure Recurrence</TabsTrigger>
          <TabsTrigger value="lifecycle" data-testid="tab-lifecycle">Component Lifecycle</TabsTrigger>
        </TabsList>

        <TabsContent value="forecasts" className="space-y-6">
          {/* Trend Forecast Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Failure Trend Forecast (Next 6 Months)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendForecast}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [value, name === 'actual' ? 'Historical' : 'Predicted']} />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                    connectNulls={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
                    connectNulls={false}
                  />
                </LineChart>
              </ResponsiveContainer>
              <Alert className="mt-4 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
                <TrendingUp className="h-4 w-4" />
                <AlertDescription>
                  <strong>Forecast Insight:</strong> Failure rates are predicted to increase by 27% over the next 6 months, 
                  with peak risk expected in October. Consider scheduling preventive maintenance.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Risk Factors Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Factor Contribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={riskFactors}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="factor" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value, name) => [`${value}%`, name === 'currentValue' ? 'Impact Score' : 'Weight']} />
                  <Bar dataKey="currentValue" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="heatmaps" className="space-y-6">
          {/* Risk Heatmap */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-5 w-5" />
                Rig Risk Assessment Heatmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskHeatmapData.map((rig) => (
                  <div key={rig.rig} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{rig.rig}</h4>
                        <Badge className={getRiskColor(rig.category)}>
                          {rig.category} Risk
                        </Badge>
                        <Badge variant="outline">
                          {rig.failureProbability}% failure probability
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Risk Score:</span>
                          <div className="flex items-center gap-2 mt-1">
                            <Progress value={rig.riskScore} className="flex-1" />
                            <span className="font-medium">{rig.riskScore}/100</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Failure Probability:</span>
                          <div className="flex items-center gap-2 mt-1">
                            <Progress value={rig.failureProbability} className="flex-1" />
                            <span className="font-medium">{rig.failureProbability}%</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Next Failure:</span>
                          <p className="font-medium mt-1">
                            {rig.nextFailureWeeks} week{rig.nextFailureWeeks !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Risk Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Level Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={[
                      { name: "High Risk", value: riskHeatmapData.filter(r => r.category === "High").length, fill: "#ef4444" },
                      { name: "Medium Risk", value: riskHeatmapData.filter(r => r.category === "Medium").length, fill: "#f97316" },
                      { name: "Low Risk", value: riskHeatmapData.filter(r => r.category === "Low").length, fill: "#22c55e" }
                    ]}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={(entry) => `${entry.name}: ${entry.value}`}
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recurrence" className="space-y-6">
          {/* Recurrence Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Failure Recurrence Patterns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recurrenceAnalysis.map((issue, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{issue.issueType}</h4>
                          <Badge className={getSeverityColor(issue.severity)}>
                            {issue.severity}
                          </Badge>
                          <Badge variant="outline">
                            {issue.confidence}% confidence
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Affected rigs: {issue.affectedRigs.join(", ")}
                        </p>
                      </div>
                      <div className="text-right text-sm">
                        <p className="font-medium">Next predicted: {new Date(issue.predictedNext).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Total Occurrences:</span>
                        <p className="font-medium">{issue.occurrences}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Avg Frequency:</span>
                        <p className="font-medium">Every {issue.avgFrequency} days</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Prediction Confidence:</span>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={issue.confidence} className="flex-1" />
                          <span className="font-medium">{issue.confidence}%</span>
                        </div>
                      </div>
                    </div>

                    {issue.severity === "Critical" && (
                      <Alert className="mt-3 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="text-sm">
                          <strong>Critical Pattern Alert:</strong> This failure pattern requires immediate attention. 
                          Consider implementing proactive maintenance measures.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lifecycle" className="space-y-6">
          {/* Component Lifecycle */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Component Lifecycle Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {componentLifecycle.map((component, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{component.component}</h4>
                      <Badge variant="outline">
                        {((component.currentAge / component.predictedLife) * 100).toFixed(0)}% lifecycle
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Current Age:</span>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress 
                            value={(component.currentAge / component.predictedLife) * 100} 
                            className="flex-1" 
                          />
                          <span className="font-medium">{component.currentAge}m</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Predicted Lifespan:</span>
                        <p className="font-medium mt-1">{component.predictedLife} months</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Utilization Rate:</span>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={component.utilizationRate} className="flex-1" />
                          <span className="font-medium">{component.utilizationRate}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 text-sm">
                      <span className="text-muted-foreground">Remaining Life:</span>
                      <span className="ml-2 font-medium">
                        {component.predictedLife - component.currentAge} months
                        {component.currentAge / component.predictedLife > 0.8 && (
                          <span className="ml-2 text-orange-600">(Replacement needed soon)</span>
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Lifecycle Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Component Age vs Predicted Life</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="currentAge" 
                    name="Current Age (months)"
                    domain={[0, 50]}
                  />
                  <YAxis 
                    dataKey="predictedLife" 
                    name="Predicted Life (months)"
                    domain={[30, 70]}
                  />
                  <Tooltip 
                    formatter={(value, name) => [
                      `${value} months`,
                      name === 'currentAge' ? 'Current Age' : 'Predicted Life'
                    ]}
                  />
                  <Scatter 
                    data={componentLifecycle} 
                    fill="#3b82f6"
                    name="Components"
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