import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/Header";
import DashboardPage from "@/pages/DashboardPage";
import InspectionsPage from "@/pages/InspectionsPage";

import NewInspectionPage from "@/pages/NewInspectionPage";
import SettingsPage from "@/pages/SettingsPage";
import SmartSeverityPage from "@/pages/SmartSeverityPage";
import AnomalyDetectionPage from "@/pages/AnomalyDetectionPage";
import PredictiveAnalyticsPage from "@/pages/PredictiveAnalyticsPage";
import AISummariesPage from "@/pages/AISummariesPage";
import ReportsPage from "@/pages/ReportsPage";
import NotFound from "@/pages/not-found";
import AddInspector from "./pages/AddInspector";
import AddRigs from "./pages/AddRigs";
import InspectionDetailPage from "./pages/InspectionDetailPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={DashboardPage} />
      <Route path="/inspections" component={InspectionsPage} />
      <Route path="/inspections/new" component={NewInspectionPage} />
      <Route path="/inspections/:id" component={InspectionDetailPage} />
      <Route path="/settings" component={SettingsPage} />
      <Route path="/reports" component={ReportsPage} />
      <Route path="/add-inspectors" component={AddInspector} />
      <Route path="/add-rigs" component={AddRigs} />
      <Route path="/ai/smart-severity" component={SmartSeverityPage} />
      <Route path="/ai/anomaly-detection" component={AnomalyDetectionPage} />
      <Route path="/ai/predictive-analytics" component={PredictiveAnalyticsPage} />
      <Route path="/ai/summaries" component={AISummariesPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <SidebarProvider style={style as React.CSSProperties}>
            <div className="flex h-screen w-full">
              <AppSidebar />
              <div className="flex flex-col flex-1">
                <Header />
                <main className="flex-1 overflow-auto p-6">
                  <Router />
                </main>
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
