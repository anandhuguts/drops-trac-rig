import { ChecklistView } from "@/components/ChecklistView";
import { PhotoGallery } from "@/components/PhotoGallery";
import { CARPanel } from "@/components/CARPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/StatusBadge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Save, Share, Download, Edit } from "lucide-react";

export default function InspectionDetailPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold">INS-001</h1>
                <StatusBadge status="in-progress" />
                <StatusBadge severity="medium" variant="severity" />
              </div>
              <h2 className="text-xl text-muted-foreground mb-4">Deep Water Horizon II - Weekly Safety Inspection</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="font-medium">Created</p>
                  <p className="text-muted-foreground">Jan 15, 2024</p>
                </div>
                <div>
                  <p className="font-medium">Due Date</p>
                  <p className="text-muted-foreground">Jan 22, 2024</p>
                </div>
                <div>
                  <p className="font-medium">Completion</p>
                  <p className="text-muted-foreground">65%</p>
                </div>
                <div>
                  <p className="font-medium">Issues Found</p>
                  <p className="text-muted-foreground">3 items</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" data-testid="button-share">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" data-testid="button-download">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm" data-testid="button-save">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Assigned Inspectors</h3>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 bg-muted p-2 rounded-lg">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">John Smith</span>
                  <Badge variant="secondary">Lead</Badge>
                </div>
                <div className="flex items-center gap-2 bg-muted p-2 rounded-lg">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">Sarah Jones</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="checklist" className="space-y-4">
        <TabsList>
          <TabsTrigger value="checklist" data-testid="tab-checklist">Checklist</TabsTrigger>
          <TabsTrigger value="photos" data-testid="tab-photos">Photos</TabsTrigger>
          <TabsTrigger value="cars" data-testid="tab-cars">CARs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="checklist" className="space-y-4">
          <ChecklistView />
        </TabsContent>
        
        <TabsContent value="photos" className="space-y-4">
          <PhotoGallery />
        </TabsContent>
        
        <TabsContent value="cars" className="space-y-4">
          <CARPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}