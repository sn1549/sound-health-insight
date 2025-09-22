import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Activity, Heart, Brain } from "lucide-react";
import { StatCard } from "./StatCard";
import { toast } from "sonner";

interface CityData {
  city: string;
  avgNoise: number;
  sleepDisorders: number;
  avgStress: number;
  avgHeartRate: number;
  avgSleepQuality: number;
  population: number;
  healthStatus: "excellent" | "good" | "moderate" | "poor" | "critical";
}

// Mock city data based on your dataset patterns
const cityDatabase: CityData[] = [
  {
    city: "Bengaluru",
    avgNoise: 61.0,
    sleepDisorders: 38.2,
    avgStress: 5.1,
    avgHeartRate: 72,
    avgSleepQuality: 6.8,
    population: 12500000,
    healthStatus: "moderate"
  },
  {
    city: "Delhi",
    avgNoise: 76.2,
    sleepDisorders: 52.8,
    avgStress: 7.2,
    avgHeartRate: 78,
    avgSleepQuality: 4.9,
    population: 32900000,
    healthStatus: "critical"
  },
  {
    city: "Mumbai",
    avgNoise: 72.1,
    sleepDisorders: 48.3,
    avgStress: 6.8,
    avgHeartRate: 76,
    avgSleepQuality: 5.3,
    population: 20400000,
    healthStatus: "poor"
  },
  {
    city: "Chennai",
    avgNoise: 64.5,
    sleepDisorders: 41.7,
    avgStress: 5.9,
    avgHeartRate: 74,
    avgSleepQuality: 6.2,
    population: 11500000,
    healthStatus: "moderate"
  },
  {
    city: "Hyderabad",
    avgNoise: 66.3,
    sleepDisorders: 44.1,
    avgStress: 6.1,
    avgHeartRate: 75,
    avgSleepQuality: 5.9,
    population: 10500000,
    healthStatus: "moderate"
  },
  {
    city: "Pune",
    avgNoise: 58.7,
    sleepDisorders: 35.4,
    avgStress: 4.8,
    avgHeartRate: 71,
    avgSleepQuality: 7.1,
    population: 7400000,
    healthStatus: "good"
  },
  {
    city: "Kolkata",
    avgNoise: 69.8,
    sleepDisorders: 46.9,
    avgStress: 6.5,
    avgHeartRate: 77,
    avgSleepQuality: 5.6,
    population: 14900000,
    healthStatus: "poor"
  }
];

export function CitySearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null);
  const [suggestions, setSuggestions] = useState<CityData[]>([]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = cityDatabase.filter(city =>
        city.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleCitySelect = (city: CityData) => {
    setSelectedCity(city);
    setSearchTerm(city.city);
    setSuggestions([]);
    toast.success(`Showing data for ${city.city}`);
  };

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "text-health-excellent";
      case "good": return "text-health-good";
      case "moderate": return "text-health-moderate";
      case "poor": return "text-health-poor";
      case "critical": return "text-health-critical";
      default: return "text-muted-foreground";
    }
  };

  const getHealthStatusVariant = (status: string) => {
    switch (status) {
      case "excellent": return "success";
      case "good": return "success";
      case "moderate": return "warning";
      case "poor": return "danger";
      case "critical": return "danger";
      default: return "default";
    }
  };

  const calculateCorrelations = (city: CityData) => {
    // Simulate correlation calculations based on city data
    const noiseStressCorr = ((city.avgNoise - 50) * 0.02).toFixed(3);
    const noiseSleepCorr = (-(city.avgNoise - 50) * 0.015).toFixed(3);
    const noiseHeartCorr = ((city.avgNoise - 50) * 0.008).toFixed(3);
    
    return {
      noiseStress: parseFloat(noiseStressCorr),
      noiseSleep: parseFloat(noiseSleepCorr),
      noiseHeart: parseFloat(noiseHeartCorr)
    };
  };

  return (
    <div className="space-y-6">
      {/* Search Interface */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Search className="h-6 w-6 text-primary" />
            City Health Analytics
          </CardTitle>
          <CardDescription>
            Search for a city to view detailed noise pollution and health correlation data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Input
              type="text"
              placeholder="Enter city name (e.g., Bengaluru, Delhi, Mumbai...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-lg"
            />
            
            {/* Search Suggestions */}
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-chart z-10">
                {suggestions.map((city) => (
                  <button
                    key={city.city}
                    onClick={() => handleCitySelect(city)}
                    className="w-full text-left p-3 hover:bg-muted transition-colors flex items-center gap-3 first:rounded-t-lg last:rounded-b-lg"
                  >
                    <MapPin className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium">{city.city}</p>
                      <p className="text-sm text-muted-foreground">
                        {city.avgNoise} dB • {city.sleepDisorders.toFixed(1)}% sleep disorders
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* City Details */}
      {selectedCity && (
        <div className="space-y-6">
          {/* City Header */}
          <Card className="shadow-hero bg-gradient-hero">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/20 border border-primary/30">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-foreground">{selectedCity.city}</h2>
                    <p className="text-muted-foreground">Population: {selectedCity.population.toLocaleString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Health Status</p>
                  <p className={`text-xl font-bold capitalize ${getHealthStatusColor(selectedCity.healthStatus)}`}>
                    {selectedCity.healthStatus}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* City Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Noise Level"
              value={`${selectedCity.avgNoise} dB`}
              description={selectedCity.avgNoise > 65 ? "Above WHO limit" : "Within safe limits"}
              variant={selectedCity.avgNoise > 65 ? "danger" : "success"}
              icon={<Activity className="h-5 w-5" />}
            />
            <StatCard
              title="Sleep Disorders"
              value={`${selectedCity.sleepDisorders.toFixed(1)}%`}
              description="of population affected"
              variant={getHealthStatusVariant(selectedCity.healthStatus)}
              icon={<Brain className="h-5 w-5" />}
            />
            <StatCard
              title="Average Stress"
              value={`${selectedCity.avgStress}/10`}
              description="Stress level rating"
              variant={selectedCity.avgStress > 6 ? "danger" : selectedCity.avgStress > 4 ? "warning" : "success"}
              icon={<Heart className="h-5 w-5" />}
            />
            <StatCard
              title="Sleep Quality"
              value={`${selectedCity.avgSleepQuality}/10`}
              description="Average quality score"
              variant={selectedCity.avgSleepQuality < 5 ? "danger" : selectedCity.avgSleepQuality < 7 ? "warning" : "success"}
              icon={<Activity className="h-5 w-5" />}
            />
          </div>

          {/* Correlation Analysis */}
          <Card className="shadow-chart">
            <CardHeader>
              <CardTitle className="text-xl font-semibold bg-gradient-health bg-clip-text text-transparent">
                Noise-Health Correlations for {selectedCity.city}
              </CardTitle>
              <CardDescription>
                Statistical relationships between noise pollution and health outcomes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(() => {
                  const correlations = calculateCorrelations(selectedCity);
                  return (
                    <>
                      <div className="text-center p-4 rounded-lg border bg-gradient-to-b from-background to-muted/20">
                        <p className="text-sm text-muted-foreground mb-1">Noise ↔ Stress</p>
                        <p className={`text-2xl font-bold ${correlations.noiseStress > 0.1 ? 'text-health-poor' : 'text-health-moderate'}`}>
                          {correlations.noiseStress > 0 ? '+' : ''}{correlations.noiseStress}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {correlations.noiseStress > 0.1 ? 'Strong positive' : 'Moderate positive'} correlation
                        </p>
                      </div>
                      
                      <div className="text-center p-4 rounded-lg border bg-gradient-to-b from-background to-muted/20">
                        <p className="text-sm text-muted-foreground mb-1">Noise ↔ Sleep</p>
                        <p className={`text-2xl font-bold ${Math.abs(correlations.noiseSleep) > 0.1 ? 'text-health-poor' : 'text-health-moderate'}`}>
                          {correlations.noiseSleep}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Negative correlation (higher noise, worse sleep)
                        </p>
                      </div>
                      
                      <div className="text-center p-4 rounded-lg border bg-gradient-to-b from-background to-muted/20">
                        <p className="text-sm text-muted-foreground mb-1">Noise ↔ Heart Rate</p>
                        <p className={`text-2xl font-bold ${Math.abs(correlations.noiseHeart) > 0.05 ? 'text-health-moderate' : 'text-health-good'}`}>
                          {correlations.noiseHeart > 0 ? '+' : ''}{correlations.noiseHeart}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Slight cardiovascular impact
                        </p>
                      </div>
                    </>
                  );
                })()}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}