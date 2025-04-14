
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { SystemMemoryInfo } from '@/services/mockData';
import { Activity, Zap, Layers } from 'lucide-react';

interface MemoryAdvancedTabProps {
  systemInfo: SystemMemoryInfo;
  showDetails: boolean;
  memoryAnalysisScore: number | null;
  memoryEfficiency: number | null;
  bottlenecks: {
    name: string;
    impact: string;
    suggestion: string;
  }[];
}

const MemoryAdvancedTab: React.FC<MemoryAdvancedTabProps> = ({
  systemInfo,
  showDetails,
  memoryAnalysisScore,
  memoryEfficiency,
  bottlenecks
}) => {
  // Calculate memory access speed (theoretical)
  const calculateMemoryAccessSpeed = () => {
    // Lower score means better performance (less fragmentation)
    if (memoryAnalysisScore === null) return "Analyzing...";
    const baseSpeed = 85; // Base memory speed score
    const adjustedSpeed = baseSpeed - (memoryAnalysisScore * 0.3);
    return `${Math.round(adjustedSpeed)}%`;
  };

  if (memoryAnalysisScore === null) return null;
  
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 transition-all duration-300 ${
      showDetails ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
    }`}>
      <div className="bg-cyber-darker p-3 rounded-md border border-cyber-blue/20 hover:border-cyber-blue/50 transition-all hover:-translate-y-1">
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <Activity size={12} className="text-cyber-blue animate-pulse" />
          Memory Access Speed
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-xl font-medium cyber-text-shadow text-cyber-blue">
            {calculateMemoryAccessSpeed()}
          </div>
          <div className="text-xs text-muted-foreground">
            {memoryAnalysisScore < 30 ? "Optimal" : 
              memoryAnalysisScore < 60 ? "Normal" : "Degraded"}
          </div>
        </div>
        <div className="mt-2">
          <Progress 
            value={100 - (memoryAnalysisScore * 0.3)} 
            className="h-1.5 bg-cyber-darker/50" 
            indicatorClassName="bg-gradient-to-r from-purple-400 to-cyan-400" 
          />
        </div>
      </div>
      
      <div className="bg-cyber-darker p-3 rounded-md border border-cyber-blue/20 hover:border-cyber-blue/50 transition-all hover:-translate-y-1">
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <Zap size={12} className="text-yellow-400" />
          Memory Performance Index
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-xl font-medium cyber-text-shadow text-yellow-400">
            {memoryEfficiency}%
          </div>
          <div className="text-xs text-muted-foreground">
            {memoryEfficiency > 75 ? "Excellent" : 
              memoryEfficiency > 50 ? "Good" : 
              memoryEfficiency > 25 ? "Fair" : "Poor"}
          </div>
        </div>
        <div className="mt-2">
          <Progress 
            value={memoryEfficiency} 
            className="h-1.5 bg-cyber-darker/50" 
            indicatorClassName="bg-yellow-400" 
          />
        </div>
      </div>
      
      <div className="bg-cyber-darker p-3 rounded-md border border-cyber-blue/20 col-span-full hover:border-cyber-blue/50 transition-all hover:-translate-y-1">
        <div className="text-xs text-muted-foreground flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Layers size={12} className="text-cyber-blue" />
            Memory Bottlenecks
          </div>
          <span className="text-xs bg-cyber-blue/20 px-2 py-0.5 rounded-full">{bottlenecks.length} detected</span>
        </div>
        
        {bottlenecks.length > 0 ? (
          <div className="mt-2 space-y-2">
            {bottlenecks.map((bottleneck, index) => (
              <div key={index} className="flex items-start justify-between bg-cyber-darker/50 p-2 rounded-md">
                <div>
                  <div className="text-sm font-medium">{bottleneck.name}</div>
                  <div className="text-xs text-muted-foreground">{bottleneck.suggestion}</div>
                </div>
                <div className={`text-xs px-2 py-0.5 rounded-full ${
                  bottleneck.impact === "Severe" ? "bg-red-500/20 text-red-400" :
                  bottleneck.impact === "High" ? "bg-orange-500/20 text-orange-400" :
                  "bg-yellow-500/20 text-yellow-400"
                }`}>
                  {bottleneck.impact}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-2 text-sm text-center py-2">
            No significant bottlenecks detected
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryAdvancedTab;
