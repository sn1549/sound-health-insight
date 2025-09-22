import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { useEffect, useState } from "react";

interface DataPoint {
  noise: number;
  sleepQuality: number;
  stressLevel: number;
  city: string;
}

export function NoiseHealthScatter() {
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Generate sample data points from the dataset patterns
    const sampleData: DataPoint[] = [
      { noise: 45, sleepQuality: 8.2, stressLevel: 3, city: "Bengaluru" },
      { noise: 52, sleepQuality: 7.8, stressLevel: 4, city: "Bengaluru" },
      { noise: 61, sleepQuality: 6.5, stressLevel: 6, city: "Bengaluru" },
      { noise: 68, sleepQuality: 5.2, stressLevel: 7, city: "Delhi" },
      { noise: 72, sleepQuality: 4.8, stressLevel: 8, city: "Mumbai" },
      { noise: 58, sleepQuality: 7.1, stressLevel: 5, city: "Chennai" },
      { noise: 64, sleepQuality: 6.0, stressLevel: 6, city: "Hyderabad" },
      { noise: 70, sleepQuality: 4.5, stressLevel: 8, city: "Delhi" },
      { noise: 48, sleepQuality: 8.0, stressLevel: 3, city: "Pune" },
      { noise: 66, sleepQuality: 5.8, stressLevel: 7, city: "Mumbai" },
    ];
    
    setData(sampleData);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Card className="shadow-chart">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-muted rounded w-1/3 mb-4"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-chart">
      <CardHeader>
        <CardTitle className="text-xl font-semibold bg-gradient-health bg-clip-text text-transparent">
          Noise vs Sleep Quality
        </CardTitle>
        <CardDescription>
          Relationship between noise levels (dB) and sleep quality scores
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              type="number" 
              dataKey="noise" 
              name="Noise Level (dB)"
              domain={[40, 80]}
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis 
              type="number" 
              dataKey="sleepQuality" 
              name="Sleep Quality"
              domain={[3, 9]}
              stroke="hsl(var(--muted-foreground))"
            />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "var(--shadow-card)"
              }}
              formatter={(value: number, name: string) => [
                name === "noise" ? `${value} dB` : value.toFixed(1),
                name === "noise" ? "Noise Level" : "Sleep Quality"
              ]}
            />
            <ReferenceLine 
              x={60} 
              stroke="hsl(var(--warning))" 
              strokeDasharray="5 5"
              label="WHO Limit"
            />
            <Scatter 
              data={data} 
              fill="hsl(var(--primary))"
              stroke="hsl(var(--primary-foreground))"
              strokeWidth={1}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}