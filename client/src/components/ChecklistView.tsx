import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "./StatusBadge";
import { Check, X, Camera, AlertCircle, Search } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  category: string;
  status: "pass" | "fail" | "pending";
  severity?: "low" | "medium" | "high" | "critical";
  notes?: string;
  photos: string[];
}

//todo: remove mock functionality
const generateMockItems = (count: number): ChecklistItem[] => {
  const categories = ["Safety Systems", "Structural Integrity", "Equipment Status", "Environmental", "Operations"];
  const titles = [
    "Pressure relief valve operation",
    "Emergency shutdown system test",
    "Structural weld inspection",
    "Fire suppression system check",
    "Equipment vibration analysis",
  ];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `ITEM-${String(i + 1).padStart(4, '0')}`,
    title: titles[i % titles.length],
    description: `Detailed inspection of ${titles[i % titles.length].toLowerCase()}`,
    category: categories[i % categories.length],
    status: ["pass", "fail", "pending"][Math.floor(Math.random() * 3)] as "pass" | "fail" | "pending",
    severity: Math.random() > 0.7 ? (["low", "medium", "high", "critical"][Math.floor(Math.random() * 4)] as any) : undefined,
    notes: Math.random() > 0.5 ? "Additional inspection notes..." : undefined,
    photos: Math.random() > 0.6 ? [`photo-${i}-1.jpg`, `photo-${i}-2.jpg`] : [],
  }));
};

export function ChecklistView() {
  const [items] = useState(() => generateMockItems(5000));
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === "all" || item.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [items, searchTerm, selectedStatus]);

  const completedItems = items.filter(item => item.status !== "pending").length;
  const completionRate = Math.round((completedItems / items.length) * 100);

  const updateItemStatus = (id: string, status: "pass" | "fail" | "pending") => {
    console.log(`Update item ${id} status to ${status}`);
  };

  const updateItemNotes = (id: string, notes: string) => {
    console.log(`Update item ${id} notes:`, notes);
  };

  const ItemRow = ({ item }: { item: ChecklistItem }) => {
    return (
      <div className="px-4 border-b border-border">
        <div className="py-4 flex items-start gap-4">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={item.status === "pass" ? "default" : "outline"}
              onClick={() => updateItemStatus(item.id, "pass")}
              data-testid={`button-pass-${item.id}`}
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={item.status === "fail" ? "destructive" : "outline"}
              onClick={() => updateItemStatus(item.id, "fail")}
              data-testid={`button-fail-${item.id}`}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-sm">{item.title}</h4>
                  <StatusBadge status={item.status} />
                  {item.severity && <StatusBadge severity={item.severity} variant="severity" />}
                </div>
                <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
                <p className="text-xs text-muted-foreground">Category: {item.category}</p>
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                {item.photos.length > 0 && (
                  <Button size="icon" variant="outline" className="h-8 w-8">
                    <Camera className="h-4 w-4" />
                    <span className="sr-only">View photos</span>
                  </Button>
                )}
                {item.status === "fail" && (
                  <AlertCircle className="h-4 w-4 text-destructive" />
                )}
              </div>
            </div>
            
            {item.notes && (
              <div className="mt-2">
                <Textarea
                  value={item.notes}
                  onChange={(e) => updateItemNotes(item.id, e.target.value)}
                  placeholder="Add inspection notes..."
                  className="min-h-[60px] text-xs"
                  data-testid={`textarea-notes-${item.id}`}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="h-[800px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Inspection Checklist</span>
          <div className="flex items-center gap-4">
            <Progress value={completionRate} className="w-32" />
            <span className="text-sm text-muted-foreground">{completionRate}% Complete</span>
          </div>
        </CardTitle>
        
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search checklist items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              data-testid="input-search-checklist"
            />
          </div>
          
          <div className="flex gap-2">
            {["all", "pass", "fail", "pending"].map((status) => (
              <Button
                key={status}
                size="sm"
                variant={selectedStatus === status ? "default" : "outline"}
                onClick={() => setSelectedStatus(status)}
                data-testid={`button-filter-${status}`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[600px]">
          <div className="space-y-0">
            {filteredItems.slice(0, 50).map((item) => (
              <ItemRow key={item.id} item={item} />
            ))}
            {filteredItems.length > 50 && (
              <div className="p-4 text-center text-muted-foreground">
                <p>Showing first 50 items of {filteredItems.length} total</p>
                <p className="text-xs">Use search to narrow results</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}