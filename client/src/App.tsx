import { Switch, Route, Redirect } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/Header";

import { AuthProvider, useAuth } from "./context/AuthContext";

import LoginPage from "./pages/Loginpage";
import DashboardPage from "./pages/DashboardPage";
import InspectionsPage from "./pages/InspectionsPage";
import NewInspectionPage from "./pages/NewInspectionPage";
import SettingsPage from "./pages/SettingsPage";
import SmartSeverityPage from "./pages/SmartSeverityPage";
import AnomalyDetectionPage from "./pages/AnomalyDetectionPage";
import PredictiveAnalyticsPage from "./pages/PredictiveAnalyticsPage";
import AISummariesPage from "./pages/AISummariesPage";
import ReportsPage from "./pages/ReportsPage";
import AddInspector from "./pages/AddInspector";
import AddRigs from "./pages/AddRigs";
import InspectionDetailPage from "./pages/InspectionDetailPage";
import NotFound from "./pages/not-found";
import ProtectedRoute from "./pages/Protectedroute";

function Router() {
    const { token } = useAuth();
  return (
    <Switch>
            <Route path="/">
        {token ? <Redirect to="/dashboard" /> : <LoginPage />}
      </Route>

      <Route path="/dashboard">
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      </Route>
      <Route path="/inspections">
        <ProtectedRoute>
          <InspectionsPage />
        </ProtectedRoute>
      </Route>
      <Route path="/inspections/new">
        <ProtectedRoute>
          <NewInspectionPage />
        </ProtectedRoute>
      </Route>
      <Route path="/inspections/:id">
        <ProtectedRoute>
          <InspectionDetailPage />
        </ProtectedRoute>
      </Route>
      <Route path="/settings">
        <ProtectedRoute>
          <SettingsPage />
        </ProtectedRoute>
      </Route>
      <Route path="/reports">
        <ProtectedRoute>
          <ReportsPage />
        </ProtectedRoute>
      </Route>
      <Route path="/add-inspectors">
        <ProtectedRoute>
          <AddInspector />
        </ProtectedRoute>
      </Route>
      <Route path="/add-rigs">
        <ProtectedRoute>
          <AddRigs />
        </ProtectedRoute>
      </Route>
      <Route path="/ai/smart-severity">
        <ProtectedRoute>
          <SmartSeverityPage />
        </ProtectedRoute>
      </Route>
      <Route path="/ai/anomaly-detection">
        <ProtectedRoute>
          <AnomalyDetectionPage />
        </ProtectedRoute>
      </Route>
      <Route path="/ai/predictive-analytics">
        <ProtectedRoute>
          <PredictiveAnalyticsPage />
        </ProtectedRoute>
      </Route>
      <Route path="/ai/summaries">
        <ProtectedRoute>
          <AISummariesPage />
        </ProtectedRoute>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function AppLayout() {
  const { token } = useAuth();

  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        {token && <AppSidebar />}
        <div className="flex flex-col flex-1">
          {token && <Header />}
          <main className="flex-1 overflow-auto p-6">
            <Router />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <AuthProvider>
            <AppLayout />
          </AuthProvider>
        </ThemeProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
