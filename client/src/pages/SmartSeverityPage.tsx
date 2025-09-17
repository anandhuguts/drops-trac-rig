import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Camera, CheckCircle, Clock, TrendingUp, Zap, Upload } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { useToast } from "@/hooks/use-toast";

const severityData = [
  { severity: "Critical", count: 12, color: "#ef4444" },
  { severity: "Major", count: 28, color: "#f97316" },
  { severity: "Minor", count: 45, color: "#eab308" },
  { severity: "Info", count: 78, color: "#22c55e" }
];

const predictionAccuracy = [
  { month: "Jan", accuracy: 92 },
  { month: "Feb", accuracy: 89 },
  { month: "Mar", accuracy: 94 },
  { month: "Apr", accuracy: 91 },
  { month: "May", accuracy: 96 },
  { month: "Jun", accuracy: 93 }
];

const recentPredictions = [
  {
    id: "PRED-001",
    checklistItem: "Pressure relief valve operation",
    predictedSeverity: "Critical",
    confidence: 94,
    suggestedActions: ["Replace valve assembly", "Inspect secondary systems", "Update maintenance log"],
    inspector: "John Smith",
    timestamp: new Date("2024-01-15T10:30:00")
  },
  {
    id: "PRED-002", 
    checklistItem: "Wire rope inspection - lifting block",
    predictedSeverity: "Major",
    confidence: 87,
    suggestedActions: ["Replace wire rope", "Lubricate components", "Schedule next inspection in 30 days"],
    inspector: "Sarah Jones",
    timestamp: new Date("2024-01-15T09:15:00")
  },
  {
    id: "PRED-003",
    checklistItem: "Safety latch functionality",
    predictedSeverity: "Minor",
    confidence: 78,
    suggestedActions: ["Clean and lubricate", "Adjust tension", "Monitor closely"],
    inspector: "Mike Wilson",
    timestamp: new Date("2024-01-15T08:45:00")
  }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "Critical": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    case "Major": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
    case "Minor": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    default: return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
  }
};

const getConfidenceColor = (confidence: number) => {
  if (confidence >= 90) return "text-green-600";
  if (confidence >= 75) return "text-yellow-600";
  return "text-red-600";
};

export default function SmartSeverityPage() {
  const { toast } = useToast();
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [checklistText, setChecklistText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedRig, setSelectedRig] = useState("");

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.size <= 1024 * 1024) { // 1MB limit
      setSelectedPhoto(file);
    } else {
      toast({
        title: "File size error",
        description: "Photo must be under 1MB",
        variant: "destructive"
      });
    }
  };

  const handleAnalyze = async () => {
    if (!checklistText.trim() && !selectedPhoto) {
      toast({
        title: "Missing information",
        description: "Please provide checklist text or upload a photo",
        variant: "destructive"
      });
      return;
    }
    
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      // Results would be shown in the recent predictions
    }, 2000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" data-testid="heading-smart-severity">Smart Severity & Recommendation</h1>
          <p className="text-muted-foreground">AI-powered severity prediction and corrective action suggestions</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <Zap className="h-3 w-3" />
            AI Enabled
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Analysis Input */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Analyze New Issue
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Select Rig</label>
              <Select value={selectedRig} onValueChange={setSelectedRig}>
                <SelectTrigger data-testid="select-rig">
                  <SelectValue placeholder="Choose rig..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rig-001">Rig-001 (Thunder Bay)</SelectItem>
                  <SelectItem value="rig-002">Rig-002 (North Sea)</SelectItem>
                  <SelectItem value="rig-003">Rig-003 (Gulf Coast)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Checklist Item Description</label>
              <Textarea
                value={checklistText}
                onChange={(e) => setChecklistText(e.target.value)}
                placeholder="Describe the issue or inspection item..."
                className="min-h-[100px]"
                data-testid="textarea-checklist-description"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Upload Photo (Optional)</label>
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="flex-1"
                  data-testid="input-photo-upload"
                />
                {selectedPhoto && (
                  <Badge variant="secondary" className="gap-1">
                    <Camera className="h-3 w-3" />
                    {selectedPhoto.name}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Max file size: 1MB</p>
            </div>

            <Button 
              onClick={handleAnalyze} 
              disabled={isAnalyzing}
              className="w-full"
              data-testid="button-analyze"
            >
              {isAnalyzing ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Analyze Severity
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Severity Distribution & Accuracy */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Severity Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={severityData}
                      dataKey="count"
                      nameKey="severity"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={(entry) => `${entry.severity}: ${entry.count}`}
                    >
                      {severityData.map((entry, index) => (
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
                <CardTitle>Prediction Accuracy</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={predictionAccuracy}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[80, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Accuracy']} />
                    <Line 
                      type="monotone" 
                      dataKey="accuracy" 
                      stroke="#22c55e" 
                      strokeWidth={2}
                      dot={{ fill: "#22c55e", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Recent Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Recent AI Predictions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPredictions.map((prediction) => (
              <div key={prediction.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{prediction.id}</Badge>
                      <Badge className={getSeverityColor(prediction.predictedSeverity)}>
                        {prediction.predictedSeverity}
                      </Badge>
                      <span className={`text-sm font-medium ${getConfidenceColor(prediction.confidence)}`}>
                        {prediction.confidence}% confidence
                      </span>
                    </div>
                    <h4 className="font-medium">{prediction.checklistItem}</h4>
                    <p className="text-sm text-muted-foreground">
                      Inspected by {prediction.inspector} • {prediction.timestamp.toLocaleString()}
                    </p>
                  </div>
                  <Progress value={prediction.confidence} className="w-20" />
                </div>
                
                <Separator className="my-3" />
                
                <div>
                  <h5 className="text-sm font-medium mb-2">Suggested Corrective Actions:</h5>
                  <div className="space-y-1">
                    {prediction.suggestedActions.map((action, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                        <span>{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Total Predictions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-sm text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Average Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">92.3%</div>
            <p className="text-sm text-muted-foreground">Across all predictions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Time Saved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">45.2 hrs</div>
            <p className="text-sm text-muted-foreground">Inspector time saved</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}