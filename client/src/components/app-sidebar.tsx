import { BarChart3, Calendar, CheckSquare, Home, Settings, FileText, Upload, Users, Brain, AlertTriangle, TrendingUp, FileBarChart, Axe} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useLocation, Link } from "wouter";
import dropsTracLogo from "@assets/generated_images/e28805cb-6174-4d0d-960b-b4bef57acca3.png";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Inspections",
    url: "/inspections",
    icon: CheckSquare,
  },
  {
    title: "New Inspection",
    url: "/inspections/new",
    icon: Calendar,
  },

  {
    title: "Reports",
    url: "/reports",
    icon: BarChart3,
  },
  {
    title: "Add Inspectors",
    url: "/add-inspectors",
    icon: Users,
  },
  {
    title: "Add Rigs",
    url: "/add-rigs",
    icon: Axe,
  },

  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

const aiItems = [
  {
    title: "Smart Severity & Recommendation",
    url: "/ai/smart-severity",
    icon: Brain,
  },
  {
    title: "Anomaly Detection",
    url: "/ai/anomaly-detection",
    icon: AlertTriangle,
  },
  {
    title: "Predictive Analytics",
    url: "/ai/predictive-analytics",
    icon: TrendingUp,
  },
  {
    title: "AI Summaries",
    url: "/ai/summaries",
    icon: FileBarChart,
  },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <img src={dropsTracLogo} alt="Drops Trac" className="h-20 w-20 object-contain" />
          <div>
            <h1 className="font-semibold text-lg">Drops Trac</h1>
            <p className="text-sm text-muted-foreground">Admin Dashboard</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    data-testid={`link-${item.title.toLowerCase().replace(' ', '-')}`}
                  >
                    <Link href={item.url} className={location === item.url ? 'bg-sidebar-accent' : ''}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>AI Features</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {aiItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    data-testid={`link-${item.title.toLowerCase().replace(/ & | /g, '-')}`}
                  >
                    <Link href={item.url} className={location === item.url ? 'bg-sidebar-accent' : ''}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}