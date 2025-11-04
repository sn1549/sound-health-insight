import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface CorrelationData {
  metric: string;
  correlation: number;
  description: string;
}

const correlationData: CorrelationData[] = [
  {
    metric: "Sleep Quality",
    correlation: -0.0035,
    description: "Negative correlation: Higher noise reduces sleep quality"
  },
  {
    metric: "Stress Level",
    correlation: 0.0115,
    description: "Positive correlation: Higher noise increases stress"
  },
  {
    metric: "Heart Rate",
    correlation: -0.0015,
    description: "Slight negative correlation with heart rate"
  }
];

const getBarColor = (value: number) => {
  if (value > 0.005) return "hsl(var(--health-poor))";
  if (value > 0) return "hsl(var(--warning))";
  if (value > -0.005) return "hsl(var(--health-good))";
  return "hsl(var(--health-excellent))";
};

export function CorrelationChart() {
  return (
    <Card className="shadow-chart">
      <CardHeader>
        <CardTitle className="text-xl font-semibold bg-gradient-primary bg-clip-text text-transparent">
          Noise vs Health Correlations
        </CardTitle>
        <CardDescription>
          Correlation coefficients between noise levels and health metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={correlationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="metric" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "var(--shadow-card)"
              }}
              formatter={(value: number, name: string, props: any) => [
                value.toFixed(4),
                "Correlation",
                props.payload.description
              ]}
            />
            <Bar dataKey="correlation" radius={[4, 4, 0, 0]}>
              {correlationData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.correlation)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}