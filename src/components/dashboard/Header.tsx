import { Activity, Volume2, Heart, Brain } from "lucide-react";

export function Header() {
  return (
    <header className="bg-gradient-hero border-b border-border/50">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
            <Activity className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              NoiseHealth Analytics
            </h1>
            <p className="text-lg text-muted-foreground mt-1">
              AI-powered analysis of noise pollution and health correlations
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-card/50 border border-border/50 shadow-card">
            <Volume2 className="h-6 w-6 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Data Points</p>
              <p className="text-xl font-bold">234,186</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 rounded-lg bg-card/50 border border-border/50 shadow-card">
            <Heart className="h-6 w-6 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Cities Monitored</p>
              <p className="text-xl font-bold">12</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 rounded-lg bg-card/50 border border-border/50 shadow-card">
            <Brain className="h-6 w-6 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">AI Model Accuracy</p>
              <p className="text-xl font-bold">94.2%</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}