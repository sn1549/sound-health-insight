import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { useState } from "react";

interface Insight {
  id: string;
  type: "warning" | "info" | "success";
  title: string;
  description: string;
  confidence: number;
}

const insights: Insight[] = [
  {
    id: "1",
    type: "warning",
    title: "High Noise-Stress Correlation",
    description: "Areas with noise levels above 65dB show 23% higher stress levels. Consider noise reduction measures.",
    confidence: 87
  },
  {
    id: "2",
    type: "info",
    title: "Sleep Pattern Analysis",
    description: "Night-time noise exposure correlates with decreased sleep quality scores, particularly in urban areas.",
    confidence: 92
  },
  {
    id: "3",
    type: "success",
    title: "Intervention Opportunity",
    description: "Reducing noise by 10dB could improve sleep quality by an average of 1.2 points on our scale.",
    confidence: 78
  }
];

export function AIInsights() {
  const [isLoading, setIsLoading] = useState(false);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-success" />;
      default:
        return <TrendingUp className="h-5 w-5 text-primary" />;
    }
  };

  const getInsightBadgeColor = (type: string) => {
    switch (type) {
      case "warning":
        return "bg-warning/10 text-warning border-warning/20";
      case "success":
        return "bg-success/10 text-success border-success/20";
      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  const generateNewInsights = () => {
    setIsLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Card className="shadow-chart">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              AI Health Insights
            </CardTitle>
            <CardDescription>
              Machine learning analysis of noise-health relationships
            </CardDescription>
          </div>
          <Button 
            onClick={generateNewInsights}
            disabled={isLoading}
            variant="outline"
            size="sm"
          >
            {isLoading ? "Analyzing..." : "Refresh"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className="flex items-start gap-3 p-4 rounded-lg border bg-gradient-to-r from-background to-muted/20 hover:shadow-card transition-all duration-200"
            >
              {getInsightIcon(insight.type)}
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-sm">{insight.title}</h4>
                  <Badge 
                    variant="outline" 
                    className={getInsightBadgeColor(insight.type)}
                  >
                    {insight.confidence}% confidence
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {insight.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}