import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Settings, Users, Image, Globe } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your company settings and preferences</p>
      </div>

      <Tabs defaultValue="company" className="space-y-4">
        <TabsList>
          <TabsTrigger value="company" data-testid="tab-company">Company</TabsTrigger>
          <TabsTrigger value="rigs" data-testid="tab-rigs">Rigs</TabsTrigger>
          <TabsTrigger value="users" data-testid="tab-users">Users</TabsTrigger>
          <TabsTrigger value="photos" data-testid="tab-photos">Photos</TabsTrigger>
          <TabsTrigger value="system" data-testid="tab-system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company Name</label>
                  <Input defaultValue="Drops Trac Industries" data-testid="input-company-name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Industry</label>
                  <Input defaultValue="Oil & Gas" data-testid="input-industry" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Address</label>
                <Textarea 
                  defaultValue="123 Offshore Drive, Houston, TX 77001"
                  rows={3}
                  data-testid="textarea-address"
                />
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Contact Email</label>
                  <Input defaultValue="admin@dropstrac.com" data-testid="input-contact-email" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input defaultValue="+1 (555) 123-4567" data-testid="input-phone" />
                </div>
              </div>
              
              <Button data-testid="button-save-company">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rigs">
          <Card>
            <CardHeader>
              <CardTitle>Manage Rigs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-muted-foreground">Configure your offshore rigs and assets</p>
                <Button data-testid="button-add-rig">Add New Rig</Button>
              </div>
              
              <div className="space-y-3">
                {["Deep Water Horizon II", "Ocean Explorer", "North Sea Pioneer"].map((rigName, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{rigName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {idx === 0 ? "Gulf of Mexico" : idx === 1 ? "North Sea" : "Norwegian Sector"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={idx === 0 ? "default" : "secondary"}>
                        {idx === 0 ? "Active" : "Standby"}
                      </Badge>
                      <Button size="sm" variant="outline" data-testid={`button-edit-rig-${idx}`}>
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-muted-foreground">Manage inspectors and administrators</p>
                <Button data-testid="button-add-user">Add New User</Button>
              </div>
              
              <div className="space-y-3">
                {[
                  { name: "John Smith", role: "Lead Inspector", email: "j.smith@dropstrac.com" },
                  { name: "Sarah Jones", role: "Inspector", email: "s.jones@dropstrac.com" },
                  { name: "Mike Wilson", role: "Inspector", email: "m.wilson@dropstrac.com" },
                  { name: "Admin User", role: "Administrator", email: "admin@dropstrac.com" },
                ].map((user, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={user.role === "Administrator" ? "default" : "secondary"}>
                        {user.role}
                      </Badge>
                      <Button size="sm" variant="outline" data-testid={`button-edit-user-${idx}`}>
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="photos">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Photo Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">File Size Limit</h3>
                    <p className="text-sm text-muted-foreground">Maximum size for uploaded photos</p>
                  </div>
                  <Select defaultValue="1mb">
                    <SelectTrigger className="w-32" data-testid="select-file-size-limit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="500kb">500 KB</SelectItem>
                      <SelectItem value="1mb">1 MB</SelectItem>
                      <SelectItem value="2mb">2 MB</SelectItem>
                      <SelectItem value="5mb">5 MB</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Quality Validation</h3>
                    <p className="text-sm text-muted-foreground">Automatically check photo quality</p>
                  </div>
                  <Switch defaultChecked data-testid="switch-quality-validation" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Auto-compression</h3>
                    <p className="text-sm text-muted-foreground">Compress large photos automatically</p>
                  </div>
                  <Switch defaultChecked data-testid="switch-auto-compression" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                System Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time Zone</label>
                  <Select defaultValue="utc">
                    <SelectTrigger data-testid="select-timezone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">Eastern Time</SelectItem>
                      <SelectItem value="cst">Central Time</SelectItem>
                      <SelectItem value="pst">Pacific Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Format</label>
                  <Select defaultValue="mdy">
                    <SelectTrigger data-testid="select-date-format">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-muted-foreground">Receive email updates for critical issues</p>
                  </div>
                  <Switch defaultChecked data-testid="switch-email-notifications" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Auto-sync</h3>
                    <p className="text-sm text-muted-foreground">Automatically sync data with cloud storage</p>
                  </div>
                  <Switch defaultChecked data-testid="switch-auto-sync" />
                </div>
              </div>
              
              <Button data-testid="button-save-system">Save System Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}