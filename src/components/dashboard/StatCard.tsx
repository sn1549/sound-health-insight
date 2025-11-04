import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: "up" | "down" | "neutral";
  variant?: "default" | "warning" | "success" | "danger";
  icon?: React.ReactNode;
}

export function StatCard({ 
  title, 
  value, 
  description, 
  trend = "neutral", 
  variant = "default",
  icon 
}: StatCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "warning":
        return "border-warning/20 bg-gradient-to-br from-warning/5 to-warning/10";
      case "success":
        return "border-success/20 bg-gradient-to-br from-success/5 to-success/10";
      case "danger":
        return "border-destructive/20 bg-gradient-to-br from-destructive/5 to-destructive/10";
      default:
        return "border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10";
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-success";
      case "down":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className={cn("shadow-card hover:shadow-chart transition-all duration-300", getVariantStyles())}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon && <div className="text-primary">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground mb-1">{value}</div>
        {description && (
          <p className={cn("text-sm", getTrendColor())}>
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}