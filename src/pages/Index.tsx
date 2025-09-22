import { Header } from "@/components/dashboard/Header";
import { StatCard } from "@/components/dashboard/StatCard";
import { CorrelationChart } from "@/components/dashboard/CorrelationChart";
import { NoiseHealthScatter } from "@/components/dashboard/NoiseHealthScatter";
import { AIInsights } from "@/components/dashboard/AIInsights";
import { CityComparison } from "@/components/dashboard/CityComparison";
import { Volume2, Heart, TrendingUp, AlertTriangle } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-data">
      <Header />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Key Statistics */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-foreground">
            Health Impact Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Average Noise Level"
              value="63.1 dB"
              description="Above WHO recommended limit"
              variant="warning"
              trend="up"
              icon={<Volume2 className="h-5 w-5" />}
            />
            <StatCard
              title="Sleep Disorders"
              value="42.5%"
              description="of monitored population"
              variant="danger"
              trend="up"
              icon={<AlertTriangle className="h-5 w-5" />}
            />
            <StatCard
              title="Average Stress Level"
              value="5.4/10"
              description="Moderate stress levels"
              variant="warning"
              trend="neutral"
              icon={<TrendingUp className="h-5 w-5" />}
            />
            <StatCard
              title="Heart Rate Impact"
              value="-1.5 BPM"
              description="Slight correlation with noise"
              variant="default"
              trend="down"
              icon={<Heart className="h-5 w-5" />}
            />
          </div>
        </section>

        {/* City Trends */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-foreground">
            Regional Analysis
          </h2>
          <CityComparison />
        </section>

        {/* Charts Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-foreground">
            Data Analysis & Correlations
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CorrelationChart />
            <NoiseHealthScatter />
          </div>
        </section>

        {/* AI Insights */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-foreground">
            Artificial Intelligence Insights
          </h2>
          <AIInsights />
        </section>

        {/* Data Source Info */}
        <section className="mt-12">
          <div className="bg-card/50 border border-border/50 rounded-lg p-6 shadow-card">
            <h3 className="text-lg font-semibold mb-3 text-foreground">Data Sources & Methodology</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">Dataset Information</h4>
                <ul className="space-y-1">
                  <li>• 234,186 data points across multiple cities</li>
                  <li>• Noise measurements from environmental sensors</li>
                  <li>• Health metrics from population studies</li>
                  <li>• Data collected from 2011-2023</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">AI Model Details</h4>
                <ul className="space-y-1">
                  <li>• Machine learning sleep disorder prediction</li>
                  <li>• 94.2% accuracy on validation set</li>
                  <li>• Real-time correlation analysis</li>
                  <li>• AWS cloud infrastructure integration</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;