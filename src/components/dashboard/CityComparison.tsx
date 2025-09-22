import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const cityData = [
  { year: 2018, Bengaluru: 58, Delhi: 72, Mumbai: 69, Chennai: 61, Hyderabad: 63 },
  { year: 2019, Bengaluru: 59, Delhi: 74, Mumbai: 70, Chennai: 62, Hyderabad: 64 },
  { year: 2020, Bengaluru: 52, Delhi: 68, Mumbai: 65, Chennai: 57, Hyderabad: 59 },
  { year: 2021, Bengaluru: 55, Delhi: 70, Mumbai: 67, Chennai: 59, Hyderabad: 61 },
  { year: 2022, Bengaluru: 61, Delhi: 75, Mumbai: 71, Chennai: 63, Hyderabad: 65 },
  { year: 2023, Bengaluru: 63, Delhi: 76, Mumbai: 72, Chennai: 64, Hyderabad: 66 },
];

const cityColors = {
  Bengaluru: "hsl(var(--health-excellent))",
  Delhi: "hsl(var(--health-critical))",
  Mumbai: "hsl(var(--health-poor))",
  Chennai: "hsl(var(--health-moderate))",
  Hyderabad: "hsl(var(--health-good))",
};

export function CityComparison() {
  return (
    <Card className="shadow-chart">
      <CardHeader>
        <CardTitle className="text-xl font-semibold bg-gradient-primary bg-clip-text text-transparent">
          Noise Trends by City
        </CardTitle>
        <CardDescription>
          Average noise levels (dB) across major Indian cities over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={cityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="year" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              domain={[45, 80]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "var(--shadow-card)"
              }}
              formatter={(value: number) => [`${value} dB`, "Noise Level"]}
            />
            <Legend />
            {Object.entries(cityColors).map(([city, color]) => (
              <Line
                key={city}
                type="monotone"
                dataKey={city}
                stroke={color}
                strokeWidth={3}
                dot={{ fill: color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
        
        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(cityColors).map(([city, color]) => {
            const latestData = cityData[cityData.length - 1];
            const noiseLevel = latestData[city as keyof typeof latestData] as number;
            const getHealthStatus = (level: number) => {
              if (level < 55) return "Excellent";
              if (level < 60) return "Good";
              if (level < 65) return "Moderate";
              if (level < 70) return "Poor";
              return "Critical";
            };
            
            return (
              <div key={city} className="text-center p-3 rounded-lg border bg-gradient-to-b from-background to-muted/20">
                <div className="w-4 h-4 rounded-full mx-auto mb-2" style={{ backgroundColor: color }}></div>
                <p className="font-semibold text-sm">{city}</p>
                <p className="text-lg font-bold">{noiseLevel} dB</p>
                <p className="text-xs text-muted-foreground">{getHealthStatus(noiseLevel)}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}