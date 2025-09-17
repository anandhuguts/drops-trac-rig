import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Status = "pass" | "fail" | "pending" | "in-progress" | "completed";
type Severity = "low" | "medium" | "high" | "critical";

interface StatusBadgeProps {
  status?: Status;
  severity?: Severity;
  variant?: "status" | "severity";
  children?: React.ReactNode;
  className?: string;
}

export function StatusBadge({ 
  status, 
  severity, 
  variant = "status", 
  children, 
  className 
}: StatusBadgeProps) {
  const getStatusVariant = (status: Status) => {
    switch (status) {
      case "pass":
      case "completed":
        return "default";
      case "fail":
        return "destructive";
      case "pending":
      case "in-progress":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getSeverityColor = (severity: Severity) => {
    switch (severity) {
      case "low":
        return "bg-chart-2 text-white";
      case "medium":
        return "bg-chart-3 text-white";
      case "high":
        return "bg-chart-4 text-white";
      case "critical":
        return "bg-destructive text-destructive-foreground";
      default:
        return "";
    }
  };

  if (variant === "severity" && severity) {
    return (
      <Badge 
        className={cn(getSeverityColor(severity), className)}
        data-testid={`badge-severity-${severity}`}
      >
        {children || severity.toUpperCase()}
      </Badge>
    );
  }

  if (status) {
    return (
      <Badge 
        variant={getStatusVariant(status)}
        className={className}
        data-testid={`badge-status-${status}`}
      >
        {children || status.replace("-", " ").toUpperCase()}
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className={className}>
      {children || "Unknown"}
    </Badge>
  );
}