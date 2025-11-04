import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Heart, Moon, TrendingUp, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export function PersonalNoiseAnalyzer() {
  const [noiseLevel, setNoiseLevel] = useState(50);
  const [analyzed, setAnalyzed] = useState(false);

  const getHealthImpact = () => {
    if (noiseLevel < 40) {
      return {
        status: "Excellent",
        color: "health-excellent",
        sleepQuality: "95-100%",
        stressLevel: "Very Low (1-2/10)",
        heartRateImpact: "No Impact",
        sleepDisorderRisk: "5%",
        recommendation: "Your noise environment is excellent! This is ideal for health and well-being.",
        icon: Activity,
      };
    } else if (noiseLevel < 55) {
      return {
        status: "Good",
        color: "health-good",
        sleepQuality: "85-94%",
        stressLevel: "Low (2-4/10)",
        heartRateImpact: "Minimal (+0-2 BPM)",
        sleepDisorderRisk: "15%",
        recommendation: "Your noise levels are manageable. Consider noise reduction for better sleep quality.",
        icon: Heart,
      };
    } else if (noiseLevel < 70) {
      return {
        status: "Moderate Risk",
        color: "health-moderate",
        sleepQuality: "70-84%",
        stressLevel: "Moderate (5-6/10)",
        heartRateImpact: "Noticeable (+3-5 BPM)",
        sleepDisorderRisk: "35%",
        recommendation: "Your noise exposure is concerning. Consider using earplugs or noise-canceling devices.",
        icon: TrendingUp,
      };
    } else if (noiseLevel < 85) {
      return {
        status: "High Risk",
        color: "health-poor",
        sleepQuality: "50-69%",
        stressLevel: "High (7-8/10)",
        heartRateImpact: "Significant (+6-8 BPM)",
        sleepDisorderRisk: "55%",
        recommendation: "This noise level poses significant health risks. Seek quieter environment or professional help.",
        icon: AlertTriangle,
      };
    } else {
      return {
        status: "Critical",
        color: "health-critical",
        sleepQuality: "Below 50%",
        stressLevel: "Very High (9-10/10)",
        heartRateImpact: "Severe (+9+ BPM)",
        sleepDisorderRisk: "75%+",
        recommendation: "URGENT: This noise level is dangerous to your health. Immediate action required!",
        icon: Moon,
      };
    }
  };

  const impact = getHealthImpact();
  const Icon = impact.icon;

  return (
    <Card className="shadow-card hover:shadow-chart transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary" />
          Personal Noise Impact Analyzer
        </CardTitle>
        <CardDescription>
          Enter your surrounding noise level to see personalized health impact predictions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-end gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="noise-input">Noise Level (dB)</Label>
              <Input
                id="noise-input"
                type="number"
                min="0"
                max="120"
                value={noiseLevel}
                onChange={(e) => setNoiseLevel(Number(e.target.value))}
                className="text-lg font-semibold"
              />
            </div>
            <Button 
              onClick={() => setAnalyzed(true)}
              className="bg-primary hover:bg-primary/90"
            >
              Analyze Impact
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Quiet (30 dB)</span>
              <span className="font-medium text-foreground">{noiseLevel} dB</span>
              <span>Harmful (120 dB)</span>
            </div>
            <Slider
              value={[noiseLevel]}
              onValueChange={(value) => setNoiseLevel(value[0])}
              max={120}
              min={30}
              step={1}
              className="w-full"
            />
          </div>

          {/* Reference markers */}
          <div className="grid grid-cols-4 gap-2 text-xs text-muted-foreground">
            <div className="text-center">
              <div className="h-2 bg-health-excellent/30 rounded mb-1"></div>
              <span>Quiet (30-45)</span>
            </div>
            <div className="text-center">
              <div className="h-2 bg-health-good/30 rounded mb-1"></div>
              <span>Normal (45-60)</span>
            </div>
            <div className="text-center">
              <div className="h-2 bg-health-moderate/30 rounded mb-1"></div>
              <span>Loud (60-80)</span>
            </div>
            <div className="text-center">
              <div className="h-2 bg-health-poor/30 rounded mb-1"></div>
              <span>Harmful (80+)</span>
            </div>
          </div>
        </div>

        {analyzed && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Status Banner */}
            <div className={cn(
              "p-4 rounded-lg border-2 flex items-center gap-3",
              `bg-${impact.color}/10 border-${impact.color}/30`
            )}>
              <Icon className={cn("h-8 w-8", `text-${impact.color}`)} />
              <div>
                <h3 className={cn("text-xl font-bold", `text-${impact.color}`)}>
                  {impact.status}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {impact.recommendation}
                </p>
              </div>
            </div>

            {/* Impact Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-card border border-border">
                <p className="text-sm text-muted-foreground mb-1">Sleep Quality</p>
                <p className="text-2xl font-bold text-foreground">{impact.sleepQuality}</p>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <p className="text-sm text-muted-foreground mb-1">Stress Level</p>
                <p className="text-2xl font-bold text-foreground">{impact.stressLevel}</p>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <p className="text-sm text-muted-foreground mb-1">Heart Rate Change</p>
                <p className="text-2xl font-bold text-foreground">{impact.heartRateImpact}</p>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <p className="text-sm text-muted-foreground mb-1">Sleep Disorder Risk</p>
                <p className="text-2xl font-bold text-foreground">{impact.sleepDisorderRisk}</p>
              </div>
            </div>

            {/* WHO Reference */}
            <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
              <p className="text-sm text-muted-foreground">
                <strong>WHO Recommendation:</strong> Noise levels should not exceed 55 dB during the day 
                and 45 dB at night for residential areas.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
