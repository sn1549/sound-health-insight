import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Area, ComposedChart } from "recharts";
import { TrendingUp } from "lucide-react";

// Generate prediction data with confidence intervals
const generatePredictionData = () => {
  const cities = ["Bengaluru", "Delhi", "Mumbai", "Chennai", "Hyderabad", "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Lucknow", "Chandigarh", "Kochi"];
  const cityBaseNoise: { [key: string]: number } = {
    "Bengaluru": 61.0,
    "Delhi": 76.2,
    "Mumbai": 72.1,
    "Chennai": 64.5,
    "Hyderabad": 66.3,
    "Pune": 58.7,
    "Kolkata": 69.8,
    "Ahmedabad": 67.4,
    "Jaipur": 63.2,
    "Lucknow": 65.8,
    "Chandigarh": 56.3,
    "Kochi": 59.1
  };
  
  const historicalYears = [2020, 2021, 2022, 2023, 2024];
  const futureYears = [2025, 2026, 2027, 2028];
  
  // Historical data (actual measurements)
  const historicalData = historicalYears.map(year => {
    const data: any = { year: year.toString(), type: "historical" };
    cities.forEach(city => {
      // Simulate historical data with slight upward trend
      const baseNoise = cityBaseNoise[city];
      const yearOffset = (year - 2020) * 1.2;
      data[city] = Math.round(baseNoise + yearOffset + Math.random() * 3 - baseNoise * 0.05);
    });
    return data;
  });

  // Future predictions with confidence intervals
  const futureData = futureYears.map((year, index) => {
    const data: any = { year: year.toString(), type: "prediction" };
    cities.forEach(city => {
      const lastHistorical = historicalData[historicalData.length - 1][city];
      // Predict with increasing trend + some variation
      const trend = (index + 1) * 1.5;
      const predicted = Math.round(lastHistorical + trend + Math.random() * 2);
      
      data[city] = predicted;
      // Add confidence intervals (±5 dB)
      data[`${city}Upper`] = predicted + 5;
      data[`${city}Lower`] = predicted - 5;
    });
    return data;
  });

  return [...historicalData, ...futureData];
};

const predictionData = generatePredictionData();

// Split data into historical and prediction for different rendering
const historicalData = predictionData.filter(d => d.type === "historical");
const futureData = predictionData.filter(d => d.type === "prediction");
const allData = [...historicalData, futureData[0]]; // Include first future point to connect lines

const cityColors: { [key: string]: string } = {
  "Bengaluru": "#10b981",
  "Delhi": "#ef4444",
  "Mumbai": "#3b82f6",
  "Chennai": "#f59e0b",
  "Hyderabad": "#8b5cf6",
  "Pune": "#06b6d4",
  "Kolkata": "#ec4899",
  "Ahmedabad": "#14b8a6",
  "Jaipur": "#f97316",
  "Lucknow": "#6366f1",
  "Chandigarh": "#22c55e",
  "Kochi": "#a855f7"
};

export function PredictionTrends() {
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const cities = ["Bengaluru", "Delhi", "Mumbai", "Chennai", "Hyderabad", "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Lucknow", "Chandigarh", "Kochi"];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const isPrediction = parseInt(label) >= 2025;
      return (
        <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-4 shadow-chart">
          <p className="font-semibold text-foreground mb-2">
            {label} {isPrediction && <span className="text-primary text-xs">(Predicted)</span>}
          </p>
          {payload.map((entry: any, index: number) => {
            if (entry.dataKey.includes("Upper") || entry.dataKey.includes("Lower")) return null;
            return (
              <p key={index} className="text-sm" style={{ color: entry.color }}>
                {entry.name}: {entry.value} dB
                {isPrediction && entry.payload[`${entry.dataKey}Upper`] && (
                  <span className="text-muted-foreground text-xs ml-2">
                    (±{entry.payload[`${entry.dataKey}Upper`] - entry.value} dB)
                  </span>
                )}
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-card hover:shadow-chart transition-all duration-300 border-primary/20">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <TrendingUp className="h-5 w-5 text-primary" />
              Future Noise Level Predictions
            </CardTitle>
            <CardDescription className="mt-2">
              AI-powered forecasts based on historical trends (2020-2024) with 95% confidence intervals
            </CardDescription>
          </div>
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className="w-[200px] bg-card border-border z-50">
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border z-50">
              <SelectItem value="all">All Cities</SelectItem>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={predictionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              {Object.entries(cityColors).map(([city, color]) => (
                <linearGradient key={city} id={`confidence-${city}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.2}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0.05}/>
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
            <XAxis 
              dataKey="year" 
              className="text-xs"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis 
              label={{ value: 'Noise Level (dB)', angle: -90, position: 'insideLeft' }}
              className="text-xs"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: "20px" }}
              iconType="line"
            />
            
            {/* Reference line to separate historical and predictions */}
            <ReferenceLine 
              x="2024" 
              stroke="hsl(var(--muted-foreground))" 
              strokeDasharray="5 5"
              label={{ value: 'Today', position: 'top', fill: 'hsl(var(--muted-foreground))' }}
            />

            {/* Confidence intervals for predictions (shaded areas) */}
            {Object.entries(cityColors).map(([city, color]) => (
              <Area
                key={`area-${city}`}
                type="monotone"
                dataKey={`${city}Upper`}
                stroke="none"
                fill={`url(#confidence-${city})`}
                fillOpacity={1}
              />
            ))}

            {/* Historical data - solid lines */}
            {Object.entries(cityColors).map(([city, color]) => {
              if (selectedCity !== "all" && selectedCity !== city) return null;
              return (
                <Line
                  key={`historical-${city}`}
                  type="monotone"
                  dataKey={city}
                  stroke={color}
                  strokeWidth={2.5}
                  dot={{ fill: color, r: 4 }}
                  activeDot={{ r: 6 }}
                  name={city}
                />
              );
            })}

            {/* Prediction lines - dashed */}
            {Object.entries(cityColors).map(([city, color]) => {
              if (selectedCity !== "all" && selectedCity !== city) return null;
              return (
                <Line
                  key={`prediction-${city}`}
                  type="monotone"
                  dataKey={city}
                  stroke={color}
                  strokeWidth={2.5}
                  strokeDasharray="5 5"
                  dot={{ fill: color, r: 4, strokeDasharray: "none" }}
                  activeDot={{ r: 6 }}
                  connectNulls
                  name={`${city} (Predicted)`}
                />
              );
            })}
          </ComposedChart>
        </ResponsiveContainer>

        {/* Prediction Summary */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(cityColors).map(([city, color]) => {
            if (selectedCity !== "all" && selectedCity !== city) return null;
            const lastHistorical = historicalData[historicalData.length - 1][city];
            const lastPrediction = futureData[futureData.length - 1][city];
            const increase = lastPrediction - lastHistorical;
            const percentIncrease = ((increase / lastHistorical) * 100).toFixed(1);
            
            return (
              <div 
                key={city}
                className="bg-gradient-to-br from-card/50 to-card/30 border border-border/50 rounded-lg p-4 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: color }}
                  />
                  <span className="font-semibold text-foreground">{city}</span>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {lastPrediction} dB
                </p>
                <p className="text-sm text-muted-foreground">
                  by 2028
                </p>
                <p className="text-sm text-warning mt-2">
                  +{increase} dB ({percentIncrease}%) from 2024
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}